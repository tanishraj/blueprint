# UI Generator

A CLI that generates React component scaffolds from Figma component metadata and your existing component coding patterns.

## Setup

- `FIGMA_API_TOKEN`: Personal access token for Figma API.
- `OPENAI_API_KEY`: API key for component generation.

## Example

```bash
node ./scripts/ui-generator/generate.mjs \
  --name Modal \
  --figma-url "https://www.figma.com/file/FILE_KEY/Component-Name?node-id=123%3A456" \
  --openai-key "$OPENAI_API_KEY" \
  --figma-token "$FIGMA_API_TOKEN"
```

Optional flags:

- `--stories` to generate Storybook story.
- `--tests` to generate a basic Vitest smoke test.
- `--pattern-limit 5` to use more local components for prompt context.
- `--overwrite` to replace generated files if already present.
- `--skip-ai` to generate a local fallback scaffold without OpenAI.

## Output

The generator writes files to:

- `src/components/<ComponentName>/<ComponentName>.tsx`
- `src/components/<ComponentName>/<ComponentName>.styles.ts`
- `src/components/<ComponentName>/types.ts`
- `src/components/<ComponentName>/index.ts`
- optional `<ComponentName>.stories.tsx`
- optional `<ComponentName>.test.tsx`

It also appends export in `src/components/index.ts`.
