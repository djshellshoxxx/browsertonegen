# Development

Node 24 and a static local HTTP server suffice. Run `npm test` from repository root. No production install or bundler. Keep relative imports; AudioWorklet and module Workers need same-origin static ES modules over HTTPS/localhost.

To run browser checks, install development-only Playwright 1.62.1 and Chromium headless shell as in README, serve parent folder at port 8000, then `npm run test:browser`. Override `BTG_TEST_URL` for another base. `BTG_PLAYWRIGHT_MODULE` can point at a preinstalled Playwright index.mjs. Browser suite writes JSON evidence, and CI uploads it.

New controls: add schema field/default in model, DSP behavior and tests, labeled UI input and requirement-matrix entry. Keep same DSP for live/export. Avoid restarting context on edits. Keep tone IDs stable except new/duplicated tone. No schema reordering concerns; increment schemaVersion for incompatible changes and supply migration.

Deployment: push main; GitHub Actions tests then publishes static artifact. Pages Source must be GitHub Actions. Workflows require pages/id-token write; repository administration may be required to enable Pages. Static asset package contains HTML/CSS/SVG/src and .nojekyll; documentation/tests remain available through source repository.

No server side features, analytics, external assets or offline caching. PWA caching deferred to avoid stale audio modules across versions. Unverified browser/hardware behavior must remain explicitly labeled in audit.
