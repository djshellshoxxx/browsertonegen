# Gui Spec

Version: 0.1.0-beta.1

Instrument shell uses CDL #0e1116 base, #171b22 panels, #e8532a orange, #4fb6c4 teal, system sans and monospace. Sticky transport includes Start, Stop, Pause, Panic, master mute and level. Simple mode: main tone frequency, logarithmic coarse slider, waveform, amplitude, add/remove/duplicate, built-ins, basic sweep and scope. Advanced: expandable voice routing, timing, phase, modulation and additive controls; related-frequency builder, stereo utilities, sequencer, export, timer, calculators and diagnostics. Every input has label and validation. Editing invalid values reports error and leaves engine last valid configuration. Reorder uses keyboard-accessible up/down buttons, not drag-only interaction. Fine frequency is cents offset via slider, anchored to frequency when dragged; ± buttons change 0.1 Hz. UI shows Hz, kHz and note with cents. Live edits and preset changes update engine; imports never start it. Clear/Reset stop first. Delete last voice allows empty silent bank. Status announces operations without announcing every sample. Preset names rendered as text, never HTML.

Requirements: GUI-MODE-001, GUI-VIS-001, GUI-CALC-001, GUI-HELP-001, GUI-DIAG-001. See REQUIREMENTS_MATRIX.md for verification.
