# Requirements matrix

Written before implementation; updated from measured core tests, Chromium interaction evidence, source review and verified live deployment.

| ID | Behavior | Implementation | Evidence | Status |
|---|---|---|---|---|
| ENG-TONE-001 | Independent 32-slot tone bank, enabled/mute/solo, CRUD/reorder | src/app.js, src/dsp.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-TONE-002 | Frequency numeric/log/fine/keyboard, note and kHz readout | src/app.js, src/model.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-TONE-003 | Amplitude/dB, phase/pan/routing/invert and timing controls | src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-WAVE-001 | Periodic waveforms and adjustable pulse width | src/dsp.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-NOISE-001 | White/pink/brown/blue/violet noise | src/dsp.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-ADD-001 | Additive coefficients and harmonic patterns | src/model.js, src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-GROUP-001 | Harmonic/subharmonic/interval/chord/temperament/detune/cluster/beat groups | src/model.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-SWEEP-001 | Linear/log/direction/loop/repeat sweep | src/model.js, src/dsp.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-STEP-001 | Step spacing/direction/dwell/transition/loop/repeat | src/model.js, src/dsp.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-STEREO-001 | Stereo utility presets, alternating/pan sweep and routing | src/dsp.js, src/model.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-SEQ-001 | Editable tone/silence/sweep/noise stage sequence | src/model.js, src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-MOD-001 | Sine-source AM/FM/tremolo/vibrato/ring modulation | src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-TRANSPORT-001 | Explicit start/stop/pause/master/mute/panic lifecycle | src/engine.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-TIMER-001 | Global delay/duration/repetition/rest/loop | src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ENG-LEVEL-001 | Conservative default, visible headroom, hard ceiling and overload meter | src/dsp.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| GUI-VIS-001 | Stereo scope/spectrum/peak/RMS, disable/freeze/FFT/time/amplitude/smoothing | src/app.js, src/engine.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| PRESET-001 | Built-in test and reference presets | src/model.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| PRESET-002 | Custom save/rename/load/duplicate/delete and robust local storage | src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| PRESET-003 | Validated versioned JSON import/export/migration | src/model.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| PRESET-004 | Share URL Unicode encode/decode, never autoplay | src/model.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| EXPORT-WAV-001 | Worker render mono/stereo rate/depth/duration/normalization/progress/cancel | src/export-worker.js, src/wav.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| GUI-CALC-001 | Notes/octaves/cents/reference tuning and frequency relationships | src/model.js, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| GUI-MODE-001 | Simple/advanced preserve state and accessible responsive layout | styles.css, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| GUI-HELP-001 | Help and About cover signal tools and limits | index.html, docs/USER_GUIDE.md | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| GUI-DIAG-001 | Optional diagnostics, copy/download logs, no network telemetry | src/app.js, src/engine.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| ERR-001 | Invalid state/storage/worklet/export/browser errors preserve predictable state | src/model.js, src/app.js, src/engine.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| A11Y-001 | Semantic labels/focus/keyboard/shortcuts/reduced motion | index.html, styles.css, src/app.js | tests/core.test.js; tests/browser.test.js; docs/BROWSER_RESULTS.json | PASS |
| PAGES-001 | Relative static assets, tested subpath and deployment workflow | index.html, .github/workflows/pages.yml | Successful Actions run 37148417156; live HTTPS page inspection | PASS |
| CDL-001 | CDL styling, favicon and two-way navigation | styles.css, favicon.svg, circuitdriftlabs/index.html | Live app and lab inspection; lab commit 545059d2 | PASS |
| DOC-001 | Research, specifications, guides and evidence-based final audit | research/, spec/, docs/ | Research/spec/docs file review; FINAL_AUDIT.md | PASS |
