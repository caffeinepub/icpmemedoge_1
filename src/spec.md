# Specification

## Summary
**Goal:** Build a single-page “IcpMemeDoge” ICP presale landing page with a neon meme aesthetic, live presale status (progress + contributors) powered by a Motoko backend that polls the ICP ledger, and clear contribution instructions.

**Planned changes:**
- Create a single-page landing layout with sections: Hero, Presale Status, How to Contribute, Contributors, Tokenomics/FAQ (English copy only).
- Apply a flashy neon/glow theme with subtle blinking animations, including a glowing/blinking “IcpMemeDoge” headline while keeping body text readable.
- Add a per-visitor 24-hour countdown timer that starts immediately on page load and ticks every second.
- Implement presale progress UI (0–100%) based on hard cap 515,000 ICP, showing ICP received, ICP remaining, and a “Presale Ended” state at/above cap.
- Display the presale deposit address directly under the progress indicator with copy-to-clipboard and a visible confirmation state:
  - a37ba6735ce5a8221f7c35105bff9bb8fc497cc7d5adda5f93d9935558e7d368
- Build a single-canister Motoko backend API that queries an ICP ledger/index source to compute totals, status (active/ended), and contributor updates.
- Add frontend polling (e.g., every 10–30 seconds) to refresh presale status and contributors list automatically.
- Show a public, continuously updated contributors list (most recent first) including sender address, contributed ICP (aggregated per address or consistently shown), and last contribution time.
- Implement backend presale accounting that stores contributions and deterministically computes token allocations credited after the presale ends, with endpoints for per-address allocation and global allocation summary.
- Add tokenomics content: max supply 1,000,000,000 IcpMemeDoge and the claim “100% win chances after the presale.” plus presale parameters (Hard cap 515,000 ICP; Currency ICP; Ends at 100%).

**User-visible outcome:** Visitors see a neon-styled IcpMemeDoge presale page with a 24h countdown, a live-updating progress indicator and contributor list sourced from detected ICP transfers to the provided address, and clear tokenomics/presale details; contributors can copy the deposit address and later check allocation info via backend endpoints.
