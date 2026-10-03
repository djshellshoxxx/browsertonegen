# Testing

## Core suite

`npm test`: Node native test runner; 37 tests at initial beta verification, all passing locally. Uses sampled signals and Fourier projections to measure frequency/component amplitudes and channel isolation; RMS and correlation measure phase/polarity, not merely existence of source functions. Covers validation, units, harmonics, sweeps, steps, sequences, global and per-tone timing, presets/migration/URL, routing, noise, modulation, headroom and RIFF samples/headers. 32-sine-voice benchmark generates 1 second of samples in about 170 ms CPU wall time on this environment; not a guarantee on all devices.

## Browser suite

`npm run test:browser`: Playwright Chromium checks under the production subpath. Real context/worklet lifecycle and nonzero generated meters, live frequency/phase/channel/mute changes, pause/resume/panic, tone CRUD/order, local presets/JSON import/download, sweep/additive/modulation, stage editing, automatic timer stop, WAV Worker output, pitch calculator, share restoration, navigation, dialogs and 390 px overflow. Browser executable download failed locally (download endpoints returned invalid archives), and cloud browser rejects localhost. CI is configured to run this suite; unexecuted checks must not be reported as passing.

## Manual physical checks still needed

Listen through chosen audio device, confirm left/right assignment, stop/panic silence and behavior under mobile/OS background suspension. Run Safari/iOS and Firefox and inspect keyboard/screen-reader behavior and 200% text zoom. No hardware has been listened to from this execution environment. No claim of calibrated voltage, SPL, exact device clock or room-frequency-response measurement.

See FINAL_AUDIT.md and BROWSER_RESULTS.json (when produced) for actual run evidence. Test failures block deployment workflow.
