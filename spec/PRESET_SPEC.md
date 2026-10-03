# Preset Spec

Version: 0.1.0-beta.1

JSON schemaVersion=1, version, master, timer, tones, sequence. Validate finite numeric ranges, string enums, limits, IDs uniqueness and lengths; reconstruct using allowed properties (no arbitrary prototype merges). Legacy schemaVersion=0 migration renames tone gain to amplitude. Unknown future schema rejected. Preset import maximum 256 KB; URL fragment maximum 64000 characters, encoded UTF-8 JSON base64url. No autoplay or URL external fetch. Built-ins: 100 Hz, 440 Hz, 1 kHz, 10 kHz, full sweep, subwoofer sweep, speaker/tweeter, noise, octave stack, harmonic series, binaural 200/206, monaural beat, stereo left/right, polarity, phase and independent channels, CCIF 19/20 kHz. Custom configurations localStorage key btg.presets.v1. Save, rename, duplicate, delete; storage errors are visible. Load updates state; session intentionally not auto-persisted, selected saved presets remain local. Share includes no audio or local preset database.

Requirements: PRESET-001, PRESET-002, PRESET-003, PRESET-004. See REQUIREMENTS_MATRIX.md for verification.
