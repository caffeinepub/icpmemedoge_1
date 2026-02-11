# Specification

## Summary
**Goal:** Add a new landing-page section (“Listings After the Presale”) that explains planned post-presale token listings in English and matches the existing neon/glow style.

**Planned changes:**
- Create a new landing-page section with an English heading (e.g., “Listings After the Presale”) and neon/glow styling consistent with existing sections.
- Render the section conditionally based on presale status: show an English “not yet/announced after presale ends” message when presale is active, and show the listings cards when presale has ended.
- Add a small, typed, centralized data structure for listing items and render them as cards with title + status label (e.g., Planned / In Progress / Announced), without naming real exchanges by default.
- Insert the new section in `App.tsx` below the current Tokenomics/FAQ section and above the Footer, without changing existing section behavior; include a safe fallback message if presale status is unavailable.

**User-visible outcome:** Users see a new “Listings After the Presale” section in the landing page flow that updates its message/content based on whether the presale is still active, and shows editable listing cards once the presale has ended.
