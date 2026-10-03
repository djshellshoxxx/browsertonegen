# 0.2 audit

The original DSP was reproduced with a 1 kHz voice at amplitude 0.2, then an identical voice added at frame 4824 at 48 kHz. The initial voice is halfway through its cycle and the new voice starts at phase zero, cancelling the output: measured 1 kHz component ~1.97e-12 rather than 0.4. The corrected engine inherits an existing matching oscillator's phase while preserving requested phase/polarity offsets. Distinct-frequency voices mix independently; intentional polarity cancellation remains valid.

A second failing regression adds a 0.2 s sweep after 2 s playback: the previous shared clock treats it as expired. Added/re-enabled voices now get fresh scheduling origins; timer cycle wrap resets the origin. Configuration edits preserve live phase. Timer completion now stops engine state before notifying the UI.

Core tests: 43 passed locally, with both bug tests verified to fail against the original DSP. JavaScript syntax and whitespace checks passed. The local Playwright browser download is unavailable in this environment; GitHub Actions runs the browser suite before publishing. Browser tests additionally cover automation editing, recipes, MIDI mappings with simulated messages, and a recorded audio download. No physical MIDI controller or hardware listening verification was performed.

New features and their limits are specified in ../spec/AUTOMATION_MIDI_SPEC.md and documented in AUTOMATION_RECIPES.md. Previous FINAL_AUDIT.md and BROWSER_RESULTS.json describe the prior release until replaced by CI evidence.
