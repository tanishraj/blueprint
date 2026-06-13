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

## 8) Badge component lessons learned
- Keep API minimal and industry-standard: prefer `variant`, `size`, `shape` and avoid redundant aliases like `status`/`kind`.
- Derive badge content mode from provided props (`children` and `icon`) instead of a separate `appearance` prop unless explicitly needed.
- Prioritize readability: avoid helper-heavy branching logic when simple prop composition with `cva` and small mapping logic can express behavior.
- Remove legacy/bwd-compat notes and alias props when starting from scratch.
- In Storybook, expose only required controls and keep prop labels aligned with actual public API (`Playground`, `Variants`, `Sizes`, `Shapes`, etc.).
- Use canonical utility classes (`h-180` instead of `h-[720px]`, `size-2` instead of `min-h-2`/`min-w-2` when equivalent).
- Accessibility is part of component structure, not a post-pass: icon-only affordances and labels should be considered in component + story design.
- Prefer concise, readable mocks in tests; avoid `Record<string, any>` and `Function` types; keep lint/type-check green continuously.

## 9) Unit tests and coverage hygiene
- For each new/changed component, add/extend tests so all new behavior branches are exercised.
- Keep unit tests and component tests close to source under each component folder.
- Use realistic test inputs and avoid over-mocking; prefer stable typed mocks over `any`.
- Run coverage as a required gate; track regressions by branch/line/function thresholds.
- Prefer a threshold that matches the repository policy (example used: `80%` during this phase) and fail CI when below threshold.
- Make test quality checks explicit in CI (`unit test + coverage`) so both are visible and enforced.
