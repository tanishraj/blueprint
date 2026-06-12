import { defaultPatternPromptSamples } from './collect-patterns.mjs';

const fileHeader = (name, content) =>
  `${name}\n${'-'.repeat(name.length)}\n${content}`;

const buildCodeGuidelines = () =>
  `
Use the same architecture as existing components in this repository:
- one component file at <Name>/<Name>.tsx
- one style file at <Name>/<Name>.styles.ts using class-variance-authority
- one optional types file at <Name>/types.ts for exported variant types
- one index file at <Name>/index.ts exporting component and types
- no markdown fences, no comments outside generated code

Coding style:
- TypeScript + React function components with named export matching file name
- prefer concise props interfaces and helper constants if needed
- import helpers from '@/utils' when shared helpers are used
- keep classes in style files; avoid inline style props
`.trim();

export function buildGenerationPrompt({
  componentName,
  figmaSpec,
  patternSamples,
}) {
  const filesPrompt = defaultPatternPromptSamples(patternSamples);

  const userPrompt = `
You are generating UI components for an existing TypeScript + React + Tailwind component library.

TASK
Generate files for component "${componentName}" from the Figma specification below.

Figma normalized spec:
${JSON.stringify(figmaSpec, null, 2)}

${buildCodeGuidelines()}

Existing component examples (use to mirror patterns):
${filesPrompt || 'No local examples available.'}

Return exactly one JSON object (no markdown):
{
  "files": {
    "component": "<content for ${componentName}/${componentName}.tsx>",
    "styles": "<content for ${componentName}/${componentName}.styles.ts>",
    "types": "<content for ${componentName}/types.ts>",
    "index": "<content for ${componentName}/index.ts>",
    "stories": "<content for ${componentName}/${componentName}.stories.tsx or empty string>",
    "test": "<content for ${componentName}/${componentName}.test.tsx or empty string>"
  }
}

Behavior requirements:
- keep all prop names derived from variant names where possible (size/variant/appearance/...).
- include ReactNode children when the Figma spec suggests content.
- include loading/disabled behavior if spec includes an interaction-related variant.
- prefer className from the style function output + cn utility.
- if you add icons, use lucide-react and keep optional icon props.

File names must match exactly as requested.
`.trim();

  return [
    {
      role: 'system',
      content:
        'You are a senior frontend architect writing production-ready TypeScript React components.',
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ];
}

export function parseOpenAIJSON(payloadText) {
  const cleaned = payloadText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
  const parsed = JSON.parse(cleaned);
  if (!parsed?.files) {
    throw new Error('OpenAI response missing files payload.');
  }
  return parsed.files;
}
