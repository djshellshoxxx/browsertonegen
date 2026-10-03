# Github Pages Spec

Version: 0.1.0-beta.1

Production target https://djshellshoxxx.github.io/browsertonegen/. Relative module/worklet/worker/icon URLs via import.meta.url. .nojekyll. GitHub Actions workflow checks Node tests and deploys static root using configure-pages, upload-pages-artifact, deploy-pages; permissions contents:read,pages:write,id-token:write, concurrency pages. Repository Pages source must be GitHub Actions; connector may lack Pages administration operation. Record deployment configured vs deployed honestly. Local python -m http.server from parent supports /browsertonegen/ same as production. No SPA history routing. No service worker beta to prevent stale DSP/export mismatch. manifest alone would not make installable PWA; no install control shown.

Requirements: PAGES-001. See REQUIREMENTS_MATRIX.md for verification.
