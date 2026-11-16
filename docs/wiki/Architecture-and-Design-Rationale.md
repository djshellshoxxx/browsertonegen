# Architecture and Design Rationale

Sources: README "Architecture", `docs/ARCHITECTURE.md`, `spec/`.

- **One persistent AudioContext, one stereo AudioWorklet.** A GainNode controls stop and panic. Two AnalyserNodes inspect the channels (README).
- **Shared DSP.** The worklet and the export Worker use the same DSP module (`src/dsp.js`), so offline renders match live output (README).
- **Validated, versioned state.** Presets, JSON and share links are rebuilt as bounded, versioned state on load (README).
- **Testable without a browser.** Node tests cover generated samples and state; the Playwright suite covers the browser (`tests/`).
- **Automation as data.** Per-tone lanes and MIDI mappings are saved with presets, so they survive reloads and sharing (README, "New in 0.2").
- **Stop vs. panic.** Stop fades out; panic silences immediately. Both are part of the audio spec (README "Use").
