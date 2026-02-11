# Specification

## Summary
**Goal:** Make the floating Play button reliably start the bundled 90s dance background music and correctly reflect playback state, with clear error handling when playback cannot start.

**Planned changes:**
- Ensure clicking the floating Play button starts looping playback of `/assets/audio/background-dance.mp3` via the existing audio logic and immediately switches the UI from Play to the mute/volume controls on successful start.
- Preserve first-visit behavior (no autoplay; Play button shown) and keep the existing opt-in + reload behavior (autoplay if allowed, otherwise start on next user interaction per existing unblock logic).
- Add user-facing English error messaging when user-initiated playback fails, keeping the Play button available for retry and preventing any rendering-breaking errors.

**User-visible outcome:** On first visit, users see a Play button; pressing it starts the 90s dance track and the UI switches to mute/volume controls. If playback can’t start, an English message explains the issue and the user can retry without the page breaking.
