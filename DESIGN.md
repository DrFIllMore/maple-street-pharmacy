# Design bible

## Pillars
1. You manage by building. You never touch a patient or move a worker by hand.
2. The floor shows the work. Every prescription is a basket you can see pile up.
3. Cash flow is the puzzle. Insurers pay late; drugs and payroll are paid now.

## Player
Adults 25–44 who like management and strategy sims. Landscape phone first, laptop second.

## Loop
Build and hire any time while the week runs on its own (about 2 minutes at 1×). Weekly review: results page, then decide page (insurance plans, one event card), run the next week. Goal: $30,000 cash with trust ≥ 60 → open a second store.

## Decisions so far
- 2026-10-23: Oversight, not micromanagement. Rejected tap-the-patient (v6) and dashboard-only (v3, v7).
- 2026-10-23: Real pharmacy logic underneath, plain-language on top. No DIR/PBM vocabulary in the UI.
- 2026-10-23: HUD is one bar + one chat box. Sizes tuned by the designer in preview: bar 87→760 × 41px at y=3, 11px text; chat 362×108 at x=85, 10px text; floor box 58,39 670×383 on 799×430.
- 2026-10-23: Phone layout rotates via CSS when the device is portrait-locked.

## Open questions
- One-handed vs two-handed landscape play (decides where sheets and the chat sit).
- Named regulars with stories: in or out for tier 1?
- Tier 2+ (second store, hospital, biotech) scope.

## Decisions 2026-10-24 (approved: patches A, B, C)
- Empty start. The player opens with a bare unit and a bank loan, builds the minimum a pharmacy needs, hires, then opens the doors. No patients before opening.
- Tile-based building anywhere on a 20×14 floor. Walls, counters, and stations are real obstacles; people route around them (A*). The door is the only entrance; blocking it is a real failure with visible consequences.
- Zones are derived from what the player builds: tiles customers can reach from the door are the shop floor; the rest is staff-only.
- Patients carry a mood (happy, content, annoyed, angry, sad, sick, confused) shown as a face, driving trust and the chat.
- The office is the management layer: schedule, insurance contracts, claims queue, inventory, metrics, pricing. The week still runs on its own; the office can be opened any time.
- The weekly review stays as the summary; the insurance lever moves into the office.
