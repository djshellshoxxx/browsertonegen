# Developer Guide

```sh
npm test                 # node --test tests/core.test.js: 46 pass on this snapshot
npm run test:browser     # node tests/browser.test.js (Playwright suite; not run here)
python -m http.server 8000
```

No application dependencies or build step. Node 24 runs the core tests (README). CI: `.github/workflows/test.yml`
runs the tests; `.github/workflows/pages.yml` runs the Node and browser suites before deploying the static site.

Working notes: `docs/DEVELOPMENT.md`, `docs/TESTING.md`. Requirements matrix: `spec/REQUIREMENTS_MATRIX.md`.
