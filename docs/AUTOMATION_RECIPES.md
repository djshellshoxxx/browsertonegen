# Automation and sound recipes

Load a recipe in the Automation recipes panel, then Start. Stop and Start restart the sound. Loading replaces the current bank. Each tone exposes Automation in simple mode. Add a lane, choose its control, curve, From, To, seconds, delay and loop. Linear ramps move in equal units; exponential ramps move by equal ratios (positive endpoints), falling back to linear if either endpoint is zero/negative. Sine and triangle describe a full out-and-back cycle. Non-looping ramps hold their endpoint; cyclic curves hold the starting value after one cycle.

| Recipe | Wave / control | From → To | Curve | Seconds | Loop | Voice duration |
|---|---|---|---|---|---|---|
| Bass drop | Sine / frequency | 160 → 40 Hz | Exponential | 3 | Off | 4 s |
| Sweep | Sine / frequency | 40 → 1000 Hz | Exponential | 10 | Off | 10 s |
| Sub test | Sine / frequency | 20 → 100 Hz | Exponential | 15 | Off | 15 s |
| Sub drop | Sine / frequency | 80 → 25 Hz | Exponential | 4 | Off | 4 s |
| Wobble | 60 Hz sine / amplitude | 0.08 → 0.65 | Sine | 0.5 | On | Continuous |

The presets use a 0.2 s voice fade out. Pitch ramps and fades can run independently: add an amplitude lane from 0.6 to 0 over 4 s for a fading drop. For a sharper bass sound select triangle or additive. Add a pan lane from -1 to 1 with a sine curve and Loop on for stereo movement. Wobbles here are amplitude modulation, rather than filter wobble; there is no low-pass filter in this engine.

Tempo: cycle seconds = 60 / BPM / cycles per beat. At 120 BPM use 0.5 s for quarter-note cycles, 0.25 s for eighth notes, 0.125 s for sixteenth notes. This is manual tempo conversion; no MIDI clock sync is implemented.

Automation follows the audio sample clock, freezes with Pause, and restarts with Stop/Start. Voice delay precedes lane delay. Timer repetitions restart each voice's schedule. Manual/MIDI values become the underlying settings; an automation lane overrides its control. Remove the lane to regain manual control. Modulation depth units are Hz for FM, cents for vibrato, and 0–1 for amplitude/ring modes. Automated depth is clamped to the selected mode's limits.

## MIDI knobs and faders

Connect your controller, press Connect MIDI, and allow the browser MIDI request. Select an input (or all inputs), select Master or a tone and a control. Press Learn CC, move a knob, choose its minimum and maximum, and Add mapping. Learn captures channel and CC but does not add a mapping until you press Add mapping. One CC may control multiple targets; mappings apply in list order. Swap minimum and maximum for inverted motion. Channel is 1–16, CC is 0–127. Selective input filtering and hotplug are supported. Disconnect removes handlers. MIDI is optional and never connects automatically on preset load. These are CC controls, not a MIDI note instrument or MIDI output.

Web MIDI requires a supporting browser and HTTPS/localhost. Chrome and Edge are practical choices. See the [Web MIDI specification](https://webaudio.github.io/web-midi-api/). The app requests no SysEx access. Physical controller testing remains device dependent.

## Save the sounds

Save in Presets stores an editable configuration on this browser. Export JSON creates a portable backup including lanes and CC mappings; import it later. Share URL also includes these settings and never auto-plays.

Render WAV is available in simple mode. Choose duration, sample rate, depth and mono/stereo; it renders from time zero including automation, envelopes and modulation. Use 4 s for a drop, 10/15 s for sweep/sub test, or a multiple of the wobble cycle for looping material. WAV does not capture live knob movement.

Record live output captures manual and MIDI movement from the moment recording starts. Stop recording & save downloads WebM/Opus, Ogg/Opus or M4A depending on browser support. Playback Pause pauses the recorder; Stop, Panic, timer completion and the 120 s limit finish the recording. Recording uses the generated signal, with no microphone request. Use WAV for uncompressed exports.
