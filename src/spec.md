# Specification

## Summary
**Goal:** Make background music user-initiated by default and less intrusive, while preserving existing mute/volume behavior and asset path.

**Planned changes:**
- Stop attempting to autoplay background music on first-time visits; only allow autoplay on subsequent visits after a stored user opt-in.
- Add a persistent, unobtrusive “Play music” control that starts playback only after explicit user interaction and is keyboard-accessible (Enter/Space).
- Persist the user’s explicit playback opt-in in localStorage, while keeping existing mute/unmute and volume persistence with conservative default volume.
- When autoplay is blocked by browser policy, keep the page usable and clearly offer the “Play music” action.

**User-visible outcome:** First-time visitors won’t hear music automatically; they can start music via a visible “Play music” control (mouse, touch, or keyboard). After opting in once, the site remembers the preference for future visits, while mute/unmute and volume continue to persist safely.
