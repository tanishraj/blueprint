# Component creation guidelines

Use this as a default playbook for creating new UI components in this library.

## 1) Start from the API first
- Define the component’s semantic props (what does it represent), then map those to UI variants.
- Prefer standard prop names (`variant`, `size`, `shape`, `disabled`, `inverted`, etc.) before adding component-specific names.
- Avoid ambiguous duplicates (for example, `status` and `kind` if both map to `variant`).

## 2) Keep a clear shape of responsibilities
- Let props describe intent, not rendering side effects.
- Infer presentation when possible (for example, badge appearance from provided content/icon), and keep extra override props only when they are necessary.
- Default props should be explicit in component defaults, not inferred only by downstream behavior.

## 3) Build styling with layered variants
- Use `cva` for variant composition and defaults.
- Separate style dimensions into orthogonal axes:
  - `variant` for color semantics.
  - `size` for scale.
  - `shape` for geometry.
  - `appearance`/sub-modes for content layout (internal-only unless required).
- Keep compound variants minimal and purposeful.

## 4) Accessibility is part of the component contract
- Set sensible defaults for semantic roles.
- Ensure non-text affordances have accessible names (for example, `aria-label` fallback logic).
- Validate icon-only states and non-interactive states in implementation and tests.

## 5) Storybook should reflect the real API surface
- Default/Playground story for free prop experimentation.
- Grouped stories for the core axes (for example: `Variants`, `Sizes`, `Shapes`, content modes).
- Keep controls minimal: expose only props users should configure, not internal implementation toggles.

## 6) Validate with checks before finishing
- Run lint and type-check every time.
- Keep class naming consistent with the project’s design tokens and naming conventions.

## 7) Keep diffs intentional and reviewable
- Avoid legacy/compatibility artifacts in a new implementation unless explicitly required.
- Remove comment-only compatibility notes when backward support is not needed.
