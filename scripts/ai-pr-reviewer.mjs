#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const githubRepo = process.env.GITHUB_REPOSITORY || '';
const [owner, repo] = githubRepo.split('/');
const prNumber = Number(process.env.GITHUB_PR_NUMBER);
const githubToken = process.env.GITHUB_TOKEN;
const openAIKey = process.env.OPENAI_API_KEY;

if (!prNumber || !owner || !repo) {
  console.error('Missing PR context.');
  process.exit(1);
}

if (!githubToken) {
  console.error('Missing GITHUB_TOKEN.');
  process.exit(1);
}

if (!openAIKey) {
  console.log('OPENAI_API_KEY is not configured. Skipping AI review.');
  process.exit(0);
}

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error('Missing GITHUB_EVENT_PATH.');
  process.exit(1);
}

const eventPayload = JSON.parse(readFileSync(eventPath, 'utf8'));
const baseSha = eventPayload.pull_request?.base?.sha;
const headSha = eventPayload.pull_request?.head?.sha;
const changedFilesUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`;
const checkRunName = 'AI PR Review (inline)';

const openAIModel = process.env.OPENAI_REVIEW_MODEL || 'gpt-4o-mini';
const openAIUrl =
  process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1/chat/completions';

const reviewableExtensions = new Set([
  'ts',
  'tsx',
  'js',
  'jsx',
  'mjs',
  'cjs',
  'css',
  'scss',
  'html',
  'json',
  'md',
  'mdx',
]);

const annotationChunkSize = 50;
const maxAnnotations = 12;

const truncate = (value, limit = 3500) => {
  if (!value) return '';
  return value.length <= limit ? value : `${value.slice(0, limit)}\n... [truncated]`;
};

async function githubRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ai-pr-reviewer',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${message}`);
  }

  return response.json();
}

async function getPullFiles() {
  const allFiles = [];
  let page = 1;

  while (true) {
    const files = await githubRequest(
      `${changedFilesUrl}?per_page=100&page=${page}&state=all`
    );
    if (!Array.isArray(files) || files.length === 0) {
      break;
    }
    allFiles.push(...files);
    if (files.length < 100) {
      break;
    }
    page += 1;
  }

  return allFiles;
}

function isReviewableFile(file) {
  if (!file || file.status === 'removed' || !file.filename) return false;
  const extension = file.filename.split('.').pop()?.toLowerCase();
  if (!extension || !reviewableExtensions.has(extension)) return false;
  return Boolean(file.patch);
}

function toJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  const jsonText = text.slice(start, end + 1);
  return JSON.parse(jsonText);
}

async function getOpenAIReview(payload) {
  const response = await fetch(openAIUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: openAIModel,
      temperature: 0.1,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a senior frontend code reviewer for a TypeScript/React UI codebase. Review only the provided PR diff and return strict JSON.',
        },
        {
          role: 'user',
          content: `Review PR diff and return JSON:

{
  "summary": "short summary",
  "findings": [
    {
      "path": "src/example.tsx",
      "line": 42,
      "severity": "high|medium|low",
      "title": "Short issue title",
      "message": "What is wrong and why",
      "suggestion": "Suggested fix (short)"
    }
  ]
}

Rules:
- Focus on correctness, UI behavior, accessibility, React patterns, and type-safety.
- Include only actionable findings in changed lines (max 12 findings total).
- Ignore pure formatting/style comments unless they can cause problems.
- Use line numbers from the PR diff's + side/new file lines.
- If no issues, return empty findings array.

Repository: ${githubRepo}
PR head/base: ${headSha} -> ${baseSha}

PR diff:
${payload}
`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${message}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || '';
}

function mapAnnotationLevel(severity) {
  switch ((severity || '').toLowerCase()) {
    case 'high':
      return 'failure';
    case 'medium':
      return 'warning';
    case 'low':
    default:
      return 'notice';
  }
}

function buildAnnotations(findings) {
  return findings
    .filter(
      issue =>
        typeof issue?.path === 'string' &&
        Number.isInteger(issue?.line) &&
        issue.line > 0 &&
        issue.title &&
        issue.message
    )
    .slice(0, maxAnnotations)
    .map(issue => ({
      path: issue.path,
      start_line: issue.line,
      end_line: issue.line,
      annotation_level: mapAnnotationLevel(issue.severity),
      title: issue.title,
      message: issue.suggestion
        ? `${issue.message}\n\nSuggestion: ${issue.suggestion}`
        : issue.message,
    }));
}

function buildSummary(checks, findings) {
  if (!findings.length) {
    return 'No blocking issues found.';
  }
  const grouped = checks.reduce(
    (acc, issue) => {
      const severity = (issue.severity || 'low').toLowerCase();
      if (!acc[severity]) acc[severity] = 0;
      acc[severity] += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );
  return `Findings: ${findings.length} (${grouped.high} high, ${grouped.medium} medium, ${grouped.low} low). Review these inline annotations in Files changed.`;
}

function chunk(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function createCheckRun(summary, annotations) {
  if (!headSha) {
    throw new Error('Missing head sha for check run.');
  }

  const conclusionsChunks = chunk(annotations, annotationChunkSize);
  const checkRuns = conclusionsChunks.length || 1;
  const completedText = chunk(annotations, annotationChunkSize).length
    ? `AI review completed with ${annotations.length} finding(s).`
    : 'AI review completed with no findings.';
  const chunks = conclusionsChunks.length
    ? conclusionsChunks
    : [ [] ];

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, annotationChunk] of chunks.entries()) {
    const suffix = chunks.length > 1 ? ` (${index + 1}/${chunks.length})` : '';
    await githubRequest(
      `https://api.github.com/repos/${owner}/${repo}/check-runs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${checkRunName}${suffix}`,
          head_sha: headSha,
          status: 'completed',
          conclusion: annotationChunk.length > 0 ? 'neutral' : 'success',
          output: {
            title: 'AI PR Review (inline)',
            summary: summary,
            text: completedText,
            annotations: annotationChunk,
          },
          details_url: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
        }),
      }
    );
  }

  return checkRuns;
}

function formatFilesSummary(files) {
  return files
    .map(file => {
      const header = `### ${file.filename} (${file.status})`;
      return `${header}\n\`\`\`diff\n${truncate(file.patch, 2400)}\n\`\`\``;
    })
    .join('\n\n');
}

try {
  const files = await getPullFiles();
  const reviewableFiles = files.filter(isReviewableFile);

  if (reviewableFiles.length === 0) {
    await createCheckRun('No reviewable file changes found in this PR.', []);
    process.exit(0);
  }

  const payload = formatFilesSummary(reviewableFiles);
  const rawReview = await getOpenAIReview(truncate(payload, 14000));
  const reviewJson = toJson(rawReview);
  const findings = Array.isArray(reviewJson?.findings) ? reviewJson.findings : [];
  const summary = typeof reviewJson?.summary === 'string'
    ? reviewJson.summary
    : '';

  const annotations = buildAnnotations(findings);
  const checkSummary = buildSummary(annotations, annotations);
  await createCheckRun(summary || checkSummary, annotations);
  process.stdout.write(`AI review run(s) posted with ${annotations.length} finding(s).\n`);
  process.exit(0);
} catch (error) {
  const message = error?.message || error;
  await createCheckRun(
    `AI review failed. ${message}`,
    [
      {
        path: '.github/workflows/ai-pr-reviewer.yml',
        start_line: 1,
        end_line: 1,
        annotation_level: 'notice',
        title: 'AI reviewer failed',
        message: String(message),
      },
    ]
  ).catch(() => {});
  console.error(message);
  process.exit(0);
}
