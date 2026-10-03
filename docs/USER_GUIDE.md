# User guide

## Quick reference tone

Load 1 kHz reference, press Start, adjust master dB. Per-voice amplitude is a peak scale; both-channel center routing sends equal-power −3.01 dB per channel. Master defaults to −18 dB with automatic headroom. Enable only desired voices. Solo includes only enabled, unmuted solo voices. Mute all affects voice mutes; master Mute affects the complete rendered signal, including export. Clear and Reset stop playback.

## Frequency and pitch

Type precise Hz, use logarithmic coarse slider, ±0.1 Hz buttons or native arrow keys. Advanced fine slider offsets its anchored frequency by ±100 cents. Readout includes kHz and nearest equal-tempered note/cents. Subaudible and ultrasonic frequencies are permitted below Nyquist and labeled outside nominal hearing. Output hardware may remove those frequencies. A4 reference in calculator affects note readouts and conversions. Choose note, octave, cents, reference then Note to Hz. Add calculated tone appends it to the bank.

## Building a bank

Eight initial slots, one enabled; remove unused slots to make space for groups. Add, duplicate and use up/down buttons for accessible ordering. Related-frequency groups append; stereo-test/reference presets replace and stop the bank. Intervals use spread as semitones; detune/cluster/pairs use Hz. Major/minor chords fix their own three tones. Binaural routes left/right separately; monaural mixes frequencies. No clinical effects are claimed.

## Waveforms and additive

Square/pulse/saw use PolyBLEP smoothing; triangle is a truncated odd harmonic series. Pulse duty controls fraction high with DC removed. Additive editor generates harmonic coefficients from all/odd/even/square/triangle patterns and rolloff; signed per-harmonic inputs remain editable. Apply pattern switches the waveform to additive. Coefficients normalize by absolute amplitude sum; components above Nyquist are omitted. Noise colors are approximate; pink and brown emphasize lows while blue/violet emphasize highs. Phase controls periodic signals; stochastic noise has no meaningful phase offset.

## Routing, phase and modulation

Per-voice routing left/right overrides pan; both uses equal-power pan. Invert reverses sign. Phase is degrees relative to the carrier's sine zero crossing; native waveform conventions differ for saw/square. Phase-coherent starts use a shared DSP clock. Duplicate frequencies with opposite polarity cancel when summed at equal gain. 90° is quadrature for sine waves. Stereo alternation switches hard channels each motion period; pan motion cycles through positions with that period.

Sine LFO source: AM/tremolo vary level, ring crosses polarity at full amount, FM depth is Hz, vibrato is cents. FM/vibrato instantaneous frequency is clamped below Nyquist. Advanced modulation near Nyquist may alias. Live waveform/phase changes may click; use Stop for abrupt structural changes in precision tests.

## Timing, sweeps and steps

Delay postpones a voice. Duration 0 is continuous, positive stops at that time. Fades multiply if overlapping. Sweep starts at voice frequency and ends at End Hz; reverse swaps trajectory, log uses exponential Hz versus time. Ping-pong is a full outward/return pair. Steps visit inclusive endpoints; ping-pong avoids repeating endpoint dwell. Transition glides during the final fraction of each dwell. Repeat count controls complete patterns, Loop makes continuous.

Sequence mode reads shared stages: tone, silence, sweep or noise, each with a duration. Stage sweep is logarithmic. Stage transitions preserve oscillator phase. The sequence repeat/loop setting is independent of the global timer. Duration/fades on a voice envelope the full sequence. A finite pattern becomes silent while transport remains running unless the global timer also stops it.

Global timer: start delay, duration, repetitions and rest. Duration 0 ignores repetition/rest and runs continuously. Each cycle restarts voice timing with phase preserved. Pause suspends the AudioContext clock; Resume continues. Stop applies global stop fade. Panic/Escape zeros output immediately and cancels pending starts and fading nodes. Space starts/stops outside input/select/button/link focus.

## Monitor

L teal/R orange scope and stereo peak/RMS readouts inspect generated output. FFT control changes spectrum resolution; smoothing changes decay. Scope time window is bounded by available FFT buffer; amplitude scale affects drawing only. Freeze holds the display. Display off stops canvas/meter updates to reduce work, while audio continues. Auto headroom reports compensation in dB. LIMITING means pre-ceiling samples reached 0.98; it is not calibrated or true-peak metering.

## Presets and sharing

Name then Save stores configuration locally. Choose saved item to Load, Rename, Duplicate or Delete. Save under an existing name overwrites that local preset. Export JSON creates a versioned backup. Import validates size, all settings and schema before changing playback. Invalid files leave current state intact. Share URL includes the configuration in its fragment; copying can fall back to selecting the displayed URL. Neither URL nor file restoration starts audio. LocalStorage errors show a message; retain exported backups when clearing browser data.

## WAV rendering

Set duration, rate, depth and channels then Render WAV. Rendering runs in a Worker; progress and Cancel remain available. Starts at time zero and uses master/timer/voice settings. Mute renders silence. Stop fade finishes the exported file. Stereo routing remains intact; mono averages channels and can cancel opposite-polarity signals. Normalize adjusts post-ceiling peak to 0.95, approximately −0.45 dBFS, and cannot restore clipped peaks. Frequencies invalid at export rate produce an error. Up to 120 seconds; use short exports on memory-constrained devices.

## Diagnostics and privacy

Advanced troubleshooting checkbox or `?debug=1` enables a bounded local event log. Copy diagnostics includes app/browser/context/rate/latencies where exposed, active voices, node count and errors. Download logs saves JSON. No network transmission. Browser/system audio device settings remain external. This application generates test stimuli; room or speaker measurements require separate recording/analysis and calibration.
