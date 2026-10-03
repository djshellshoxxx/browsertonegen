# Project Spec

Version: 0.1.0-beta.1

BrowserToneGen 0.1.0-beta.1 is a static browser signal workbench. No framework, CDN, analytics, account, microphone or server. ES modules run over HTTPS or localhost. Desktop shows tone bank and monitor together; phone stacks panels. Maximum 32 voices, eight initial slots with one enabled. Defaults: 440 Hz sine, amplitude 0.5, master -18 dB, explicit headroom compensation on. No audio on load, preset import or URL restore. Mode changes preserve state. Session edits reach the running worklet without replacing AudioContext. All optional implemented features are described below; grey noise, arbitrary wavetable import, speech announcements and PWA are outside beta scope for reasons in final audit.

Requirements: DOC-001, ENG-TONE-001, GUI-MODE-001. See REQUIREMENTS_MATRIX.md for verification.
