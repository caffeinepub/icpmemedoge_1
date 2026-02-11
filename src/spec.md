# Specification

## Summary
**Goal:** Make background music start faster and more reliably after the user presses the floating Play button, while preserving opt-in behavior and the existing audio URL.

**Planned changes:**
- Refine background music initialization and start flow to improve reliability and reduce time-to-audio after the user clicks Play (keeping the audio path exactly `/assets/audio/background-dance.mp3`).
- Add a “Starting music…” / loading UI state that disables the Play button while a start attempt is in progress to prevent overlapping `play()` requests.
- Improve error handling and retry behavior so failures show clear English messages, allow retry without reloading, and keep existing mute/volume persistence intact.

**User-visible outcome:** Pressing Play starts music audibly (or shows a clear English error) without needing multiple clicks; during startup the Play button shows a loading state and can’t be spam-clicked; if startup fails the user can retry and the page remains usable.
