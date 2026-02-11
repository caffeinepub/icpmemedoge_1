# Specification

## Summary
**Goal:** Remove the floating background-music Play UI so the site never shows a Play button when background music is not playing.

**Planned changes:**
- Remove/hide the floating background-music Play button and its associated “starting/loading” indicator so no Play-related UI can render.
- Keep mute and volume controls available only while background music is already playing; render nothing for the background-music controller when music is not playing.
- Preserve the existing audio asset path ("/assets/audio/background-dance.mp3") and make UI-only changes without introducing new user-facing text.

**User-visible outcome:** Visitors will no longer see any floating Play button (or Play loading indicator). If background music is already playing, mute and volume controls still appear and work; otherwise, no music controls are shown.
