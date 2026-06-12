import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const DEFAULT_SAMPLE_LIMIT = 3;
const DEFAULT_FILE_LIMIT = 4500;

const normalizeName = value =>
  `${value || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean);

const similarityScore = (a, b) => {
  if (!a || !b) return 0;
  const left = normalizeName(a);
  const right = new Set(normalizeName(b));
  let score = 0;

  if (a.toLowerCase() === b.toLowerCase()) {
    score += 100;
  }

  left.forEach(token => {
    if (right.has(token)) {
      score += 8;
    }
    if (b.toLowerCase().includes(token)) {
      score += 2;
    }
  });

  return score;
};

const readIfExists = async (filePath, limit) => {
  if (!existsSync(filePath)) {
    return null;
  }

  const content = await fs.readFile(filePath, 'utf8');
  if (content.length <= limit) {
    return content;
  }

  return `${content.slice(0, limit)}\n// ... truncated by generator ...`;
};

const readComponentSamples = async (componentDir, componentName, fileLimit) => {
  const files = {
    component: `${componentName}.tsx`,
    styles: `${componentName}.styles.ts`,
    types: 'types.ts',
    index: 'index.ts',
    stories: `${componentName}.stories.tsx`,
    test: `${componentName}.test.tsx`,
  };

  const samples = {};

  await Promise.all(
    Object.entries(files).map(async ([key, fileName]) => {
      const content = await readIfExists(
        path.join(componentDir, fileName),
        key === 'stories' || key === 'test' ? 2200 : fileLimit,
      );
      if (content) {
        samples[key] = content;
      }
    }),
  );

  return {
    componentName,
    samples,
  };
};

export async function collectPatternSamples(componentsDir, options = {}) {
  const limit = Number(options.limit || DEFAULT_SAMPLE_LIMIT);
  const fileLimit = Number(options.fileLimit || DEFAULT_FILE_LIMIT);
  const targetName = options.targetName || '';

  const dirEntries = await fs.readdir(componentsDir, { withFileTypes: true });
  const sorted = dirEntries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => ({
      name: entry.name,
      score: similarityScore(targetName, entry.name),
    }))
    .sort((a, b) => b.score - a.score);

  const top = sorted.slice(0, Math.max(1, limit));
  const samples = [];
  for (const item of top) {
    const dir = path.join(componentsDir, item.name);
    const sample = await readComponentSamples(dir, item.name, fileLimit);
    samples.push(sample);
  }

  return samples;
}

export function defaultPatternPromptSamples(samples) {
  return samples
    .map((sample, index) => {
      const blockEntries = Object.entries(sample.samples)
        .map(
          ([key, value]) => `--- ${sample.componentName}/${key} ---\n${value}`,
        )
        .join('\n\n');
      return `Example ${index + 1}: ${sample.componentName}\n${blockEntries}`;
    })
    .join('\n\n');
}
