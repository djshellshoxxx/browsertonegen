# Architecture

`model.js` creates state, validates bounded types/ranges, transforms notes/ratios/groups, defines built-ins and versioned JSON/URL serialization. Unknown imported properties are discarded. A schema 0 migration maps gain to amplitude; future schemas fail visibly.

`dsp.js` is platform-independent, using integer frame/sample-rate time. Voice runtime is keyed by ID: phase, gain smoothing, seeded random state and color filter/history survive configuration edits. `set` recomputes solo selection and headroom. `process` mixes routed samples, applies global timer, fades, gain, mono and hard ceiling, and returns stereo peak/RMS statistics. Low frequency bounds and instantaneous modulation clamp use actual rate. Saw/pulse PolyBLEP and additive/triangle harmonic caps reduce aliasing, but do not guarantee spectral purity under modulation.

`worklet.js` wraps DSP in AudioWorkletProcessor and exchanges validated configuration/meter messages. One shared clock aligns voices; message-based UI edits apply on the next processing block. `engine.js` owns a persistent context and disposable node graph. Epoch counter prevents late asynchronous Start after Panic. A list of fading retired nodes ensures panic disconnects those too. Pause suspends context. Unsupported AudioWorklet does not fall back to obsolete main-thread audio. Browser output latency is reported when exposed, never treated as timing calibration.

`export-worker.js` renders exactly the same DSP algorithm from t=0 in 4096-frame chunks, reports progress, applies final fade/optional mono/normalization and passes a transferable WAV buffer from `wav.js`. Cancel terminates the Worker. Current master Mute is honored.

`app.js` owns validated state and local preset storage. DOM labels/native controls dispatch config edits. All text from names is escaped. Import applies only after validation, and load/clear/reset stop audio. Optional log is bounded to 300 entries. Canvas updates at at most 20 Hz; disabling visualizations skips canvas/meter work. Mode only toggles CSS visibility. No CDN dependencies and no telemetry.

Limits: 32 voices, 32 additive coefficients per voice, 64 sequence stages, 100 custom presets, 256 KB JSON, 64K URL encoding, 120-second WAV. Source is intentionally separated into pure math, DSP, browser lifecycle, export and UI rather than a framework tree.
