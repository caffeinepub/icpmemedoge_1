# Specification

## Summary
**Goal:** Add a subtle, continuous “movable” animation to the existing hero meme-dog image without changing its asset path or layout.

**Planned changes:**
- Apply a gentle looping animation (e.g., slow bobbing/float with slight rotation) to the hero image while preserving its current responsive sizing, rounded corners, and shadow styling.
- Respect `prefers-reduced-motion` by disabling or significantly reducing the animation when enabled.

**User-visible outcome:** On the landing page, the hero image at `/assets/generated/icp-meme-doge-hero.dim_1600x900.png` gently animates to feel “movable,” and the motion is minimized or removed for users who prefer reduced motion.
