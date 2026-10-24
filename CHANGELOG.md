# Changelog

## v12.1 — 2026-10-24
- Move tool: pick up any placed item (palette **Move**, or tap it → Move) and put it down elsewhere, free; rotate while holding. Pieces in use can't be moved.
- Starter palette: before opening, only the essentials show (drop-off, register, counter, bin, fill, verify, will-call shelf, chair, wall, door) and the hint names the next thing the checklist needs. Phone/problem/consult desks, OTC and stock shelves and plants unlock when you open.
- Removed the "MAPLE STREET PHARMACY" label painted on the back wall.

## v12 — 2026-10-24 — Build your own pharmacy
- **A. Empty start.** New game opens on a bare 20×14 room with a $20,000 loan (repaid $400/week). Place walls, counters, door-facing windows, stations, chairs and shelves anywhere; rotate before placing; refund on removal. Walls/counters block movement; the street door is the only entrance; a blocked door leaves patients confused outside and costs trust. Shop floor vs. back room is derived from what customers can reach. A "Ready to open?" checklist gates the first week.
- **A. Pathfinding.** A* on the tile grid (8-neighbour, no corner cutting) for staff and patients; paths invalidate when the layout changes.
- **B. Moods.** RollerCoaster-Tycoon-style faces: happy, content, annoyed, angry, sad, sick, confused. Mood drives whether a patient waits, leaves, and how trust and the chat log react.
- **C. Office.** Schedule (shifts, fatigue), Insurance contracts (BlueLeaf / SilverPlan / QuickPay — pay speed vs. rate), Claims queue (appeal / ask cash / write off; claims expire after three days), Inventory (weekly order, stockouts/backorders), Metrics (cash vs. owed, served/lost, station utilization), Pricing.
- Build palette docked to the bottom; chat hidden while building.
- Verified in WebKit: readiness checklist, 2-day and 3-week runs (~105–113 served/week with 2 clerks), no console errors.

## v10 — 2026-10-23
- HUD rebuilt to designer-tuned sizes from the drag preview. One status bar aligned with the floor; MMORPG-style chat box (tabs, collapse, drag, resize). Layout sliders and ticker removed.
- Floor fitted from exact world bounds into the tuned box; no more clipping.

## v9
- Activity log, live week P&L and runway in the bar, two-page review, loss reasons, cash sparkline.

## v8
- Builder-manager core: build slots, ten station types with upgrades, job system, batched baskets, overnight bag carry-over, queue ordering fix, headless economy tests.

## v1–v7
- Prototypes exploring dashboard, floor, tap-to-help, and oversight loops. Superseded.

## v11 — 2026-10-23
- Floor redesign: three zones with their own materials (cool tile back pharmacy, warm plank customer floor, green consult room), a continuous counter with glass panels between windows, queue mats, floor labels. Every station type has a distinct silhouette and color; empty slots are marked in their zone's color with a label.
- Fixed: `[hidden]` rule missing outside the artifact viewer (v10.3). Save/resume, debug page escape, orientation from the device (v10.2). Viewport sizing in Safari (v10.1).
