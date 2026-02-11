# Specification

## Summary
**Goal:** Update the floating Play button’s bundled background music to use “Binary Finary 1999” while keeping the existing audio URL/path unchanged.

**Planned changes:**
- Replace the static audio asset file served at `/assets/audio/background-dance.mp3` with the requested “Binary Finary 1999” track, without changing the path string used in code.
- Ensure the existing Play-button playback flow and error handling remain unchanged (no autoplay changes, same English error behavior, Play-to-controls behavior preserved).

**User-visible outcome:** Clicking the floating Play button plays the updated “Binary Finary 1999” track using the same Play/mute/volume behavior as before, and failures still show the existing English error with the Play button available to retry.
