# Badge component notes

- API naming standard for Badge now uses `variant`, `size`, `shape`, and `inverted` as primary props.
- `appearance` is not a public prop. The badge auto-infers its visual form from content:
  - text-like content (`children` or `label`) => text appearance
  - icon-only => icon appearance
  - neither text nor icon => dot appearance
- Storybook now stays minimal and API-first with:
  - `Default (Playground)`
  - `Variants`
  - `Sizes`
  - `Shapes`
  - `Appearances`
- Icon/badge accessibility remains role-aware with an accessible name fallback for non-text appearances.
