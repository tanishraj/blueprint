import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectPatternSamples } from './collect-patterns.mjs';
import { buildGenerationPrompt, parseOpenAIJSON } from './prompt-builder.mjs';
import { generateWithOpenAI } from './openai-client.mjs';
import { resolveFigmaSpec } from './figma-client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'src', 'components');
const COMPONENT_INDEX_PATH = path.join(COMPONENTS_DIR, 'index.ts');
const DEFAULT_OPENAI_MODEL = 'gpt-4.1-mini';

const usage = () =>
  `Usage:
node ./scripts/ui-generator/generate.mjs \\
  --name MyComponent \\
  --figma-file-key <figma-file-key> \\
  --node-id <node-id> \\
  --openai-key <api-key> \\
  --figma-token <figma-api-token>

Options:
  --name             Component name (required, PascalCase or snake/kebab accepted)
  --figma-url        Optional Figma URL with file and node id
  --figma-file-key   Figma file key
  --node-id          Figma node id (0:1 or 0-1)
  --figma-token      Figma API token (or FIGMA_API_TOKEN env)
  --openai-key       OpenAI key (or OPENAI_API_KEY env)
  --model            OpenAI model (default: ${DEFAULT_OPENAI_MODEL})
  --pattern-limit    Number of local examples to include (default: 3)
  --overwrite        Replace existing files
  --stories          Also generate story file
  --tests            Also generate test file
  --skip-ai          Generate local fallback without calling OpenAI
  --help             Show usage`;

const normalizeArgKey = (value) =>
  value
    .replace(/^--/, '')
    .replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());

const parseArgs = (argv) => {
  const options = {
    overwrite: false,
    stories: false,
    tests: false,
    skipAi: false,
    patternLimit: 3,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const rawArg = argv[index];
    if (!rawArg?.startsWith('--')) {
      continue;
    }

    const isInline = rawArg.includes('=');
    const [rawKey, inlineValue] = isInline ? rawArg.split('=', 2) : [rawArg];
    const key = normalizeArgKey(rawKey);
    const booleanKeys = ['overwrite', 'stories', 'tests', 'skipAi', 'help'];

    if (booleanKeys.includes(key)) {
      options[key] = true;
      continue;
    }

    const value = inlineValue ?? argv[index + 1];
    if (!value) {
      throw new Error(`Missing value for ${rawArg}`);
    }

    if (inlineValue === undefined) {
      index += 1;
    }

    options[key] = value;
  }

  return options;
};

const toPascalCase = (value) =>
  `${value}`
    .replace(/[-_]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const normalizeNodeId = (value) => {
  const raw = `${value || ''}`.trim();
  return raw.includes(':') ? raw : raw.replace('-', ':');
};

const parseFigmaSource = (options) => {
  if (options.figmaUrl) {
    const figmaUrl = new URL(options.figmaUrl);
    const segments = figmaUrl.pathname.split('/').filter(Boolean);
    return {
      fileKey: segments[1],
      nodeId: normalizeNodeId(figmaUrl.searchParams.get('node-id') || ''),
    };
  }

  return {
    fileKey: options.figmaFileKey || options.figmaFile,
    nodeId: normalizeNodeId(options.nodeId || options.figmaNodeId),
  };
};

const fileExists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const writeGeneratedFile = async (targetPath, content, overwrite) => {
  if (!overwrite && (await fileExists(targetPath))) {
    throw new Error(`File exists: ${targetPath}. Use --overwrite.`);
  }
  await fs.writeFile(targetPath, `${content.trim()}\n`);
};

const updateComponentBarrel = async (componentName, overwrite) => {
  const line = `export * from './${componentName}';`;
  const current = await fs.readFile(COMPONENT_INDEX_PATH, 'utf8');
  if (current.includes(line)) {
    return;
  }

  const next = `${current.trim()}\n${line}\n`;
  await writeGeneratedFile(COMPONENT_INDEX_PATH, next, overwrite);
};

const fallbackFiles = (name) => ({
  component: `import { FC, ReactNode } from 'react';\nimport { type VariantProps } from 'class-variance-authority';\n\nimport { cn, RemoveNull } from '@/utils';\nimport { ${name}Styles } from './${name}.styles';\n\nexport interface ${name}Props extends RemoveNull<VariantProps<typeof ${name}Styles>> {\n  children?: ReactNode;\n}\n\nexport const ${name}: FC<${name}Props> = ({ children, ...restProps }) => {\n  return (\n    <div {...restProps} className={cn(${name}Styles(restProps))}>\n      {children}\n    </div>\n  );\n};\n`,
  styles: `import { cva } from 'class-variance-authority';\n\nexport const ${name}Styles = cva('rounded', {\n  variants: {\n    variant: {\n      default: '',\n      primary: '',\n      info: '',\n      success: '',\n      warning: '',\n      danger: '',\n    },\n    size: {\n      sm: 'text-sm',\n      md: 'text-base',\n      lg: 'text-lg',\n    },\n    appearance: {\n      filled: '',\n      outline: '',\n      dashed: '',\n      ghost: '',\n    },\n  },\n  defaultVariants: {\n    variant: 'default',\n    size: 'md',\n    appearance: 'filled',\n  },\n});\n`,
  types: `export type ${name}Variant =\n  | 'default'\n  | 'primary'\n  | 'info'\n  | 'success'\n  | 'warning'\n  | 'danger';\n\nexport type ${name}Size = 'sm' | 'md' | 'lg';\nexport type ${name}Appearance = 'filled' | 'outline' | 'dashed' | 'ghost';\n`,
  index: `export * from './${name}';\nexport * from './types';\n`,
  stories: `import type { Meta, StoryObj } from '@storybook/react';\nimport { ${name} } from './${name}';\n\nconst meta = {\n  title: '${name}',\n  component: ${name},\n} satisfies Meta<typeof ${name}>;\n\nexport default meta;\n\ntype Story = StoryObj<typeof meta>;\n\nexport const Default: Story = {\n  render: () => <${name}>${name}</${name}>,\n};\n`,
  test: `import { render, screen } from '@testing-library/react';\nimport { describe, expect, it } from 'vitest';\n\nimport { ${name} } from './${name}';\n\ndescribe('${name}', () => {\n  it('renders without crashing', () => {\n    render(<${name}>${name}</${name}>);\n    expect(screen.getByText('${name}')).toBeTruthy();\n  });\n});\n`,
});

const writeFiles = async ({
  componentName,
  targetDir,
  generated,
  includeStories,
  includeTests,
  overwrite,
}) => {
  const requiredFiles = {
    component: `${componentName}.tsx`,
    styles: `${componentName}.styles.ts`,
    types: 'types.ts',
    index: 'index.ts',
  };

  const optionalFiles = {
    stories: `${componentName}.stories.tsx`,
    test: `${componentName}.test.tsx`,
  };

  await Promise.all(
    Object.entries(requiredFiles).map(async ([key, fileName]) => {
      const content = generated[key];
      if (!content || !content.trim()) {
        return;
      }

      await writeGeneratedFile(
        path.join(targetDir, fileName),
        content,
        overwrite,
      );
      console.log(`Wrote ${path.join(targetDir, fileName)}`);
    }),
  );

  if (includeStories && generated.stories && generated.stories.trim()) {
    await writeGeneratedFile(
      path.join(targetDir, optionalFiles.stories),
      generated.stories,
      overwrite,
    );
    console.log(`Wrote ${path.join(targetDir, optionalFiles.stories)}`);
  }

  if (includeTests && generated.test && generated.test.trim()) {
    await writeGeneratedFile(
      path.join(targetDir, optionalFiles.test),
      generated.test,
      overwrite,
    );
    console.log(`Wrote ${path.join(targetDir, optionalFiles.test)}`);
  }
};

const main = async () => {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(usage());
    return;
  }

  const rawName = options.name || options.componentName;
  if (!rawName) {
    throw new Error('Missing --name.');
  }

  const componentName = toPascalCase(rawName);
  const skipAi = Boolean(options.skipAi);
  const includeStories = Boolean(options.stories);
  const includeTests = Boolean(options.tests);
  const overwrite = Boolean(options.overwrite);
  const { fileKey, nodeId } = parseFigmaSource(options);

  if (!skipAi && !fileKey) {
    throw new Error('Missing Figma file key. Use --figma-file-key or --figma-url.');
  }
  if (!skipAi && !nodeId) {
    throw new Error('Missing Figma node id. Use --node-id or --figma-url.');
  }

  const figmaApiToken =
    options.figmaToken || process.env.FIGMA_API_TOKEN || process.env.FIGMA_TOKEN;
  const openAIApiKey =
    options.openaiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;

  if (!skipAi && !openAIApiKey) {
    throw new Error('Missing OPENAI_API_KEY or --openai-key.');
  }
  if (!skipAi && !figmaApiToken) {
    throw new Error('Missing FIGMA_API_TOKEN or --figma-token.');
  }

  const targetDir = path.join(COMPONENTS_DIR, componentName);
  await fs.mkdir(targetDir, { recursive: true });

  const patternSamples = await collectPatternSamples(COMPONENTS_DIR, {
    targetName: componentName,
    limit: Number(options.patternLimit) || 3,
  });

  const spec = skipAi
    ? { componentName, figmaNodeName: componentName }
    : await resolveFigmaSpec({
        fileKey,
        nodeId,
        token: figmaApiToken,
        componentName,
      });

  const generated = skipAi
    ? fallbackFiles(componentName)
    : (() => {
        return generateWithOpenAI({
          componentName,
          figmaSpec: spec,
          patternSamples,
          openAIApiKey,
          model: options.model || DEFAULT_OPENAI_MODEL,
          buildGenerationPrompt,
        }).then((response) => {
          const content = response?.choices?.[0]?.message?.content || '';
          return parseOpenAIJSON(content);
        });
      })();

  const resolved = await generated;

  if (!resolved || !resolved.component || !resolved.styles || !resolved.types) {
    throw new Error('Invalid generator output. Expected component, styles, and types.');
  }

  await writeFiles({
    componentName,
    targetDir,
    generated: resolved,
    includeStories,
    includeTests,
    overwrite,
  });

  await updateComponentBarrel(componentName, overwrite);

  console.log(`Generated ${componentName} in src/components/${componentName}`);
  if (patternSamples.length > 0) {
    console.log(`Used ${patternSamples.length} local pattern references.`);
  }
};

main().catch((error) => {
  console.error(error?.message || error);
  process.exitCode = 1;
});
