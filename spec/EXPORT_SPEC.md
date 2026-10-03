# Export Spec

Version: 0.1.0-beta.1

Export shared DSP from t=0 with current master, mute, mono, timer, headroom, routing, per-voice timing/modulation and sequence. WAV RIFF PCM 16-bit, PCM 24-bit, IEEE float32. 44100/48000/96000 Hz, mono/stereo, duration .01..120 s, normalize optional to peak .95. Validate frequencies against export Nyquist; reject rather than silently change them. Render Worker reports percentage each 4096-frame block throttled to useful updates. Cancel terminates Worker and revokes busy state. Render finishes with master fade-out over min(fadeStop,duration). Mono is mean of L/R before optional normalization. Encode little endian interleaved with correct headers. Limit memory to two Float32 arrays plus WAV up to approximately 185 MB at largest render; document mobile limit and report allocation failure. Filename BrowserToneGen-{sampleRate}Hz-{duration}s.wav. No unsupported formats shown.

Requirements: EXPORT-WAV-001. See REQUIREMENTS_MATRIX.md for verification.
