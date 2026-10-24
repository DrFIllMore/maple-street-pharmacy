# Changelog

## v16 — 2026-10-24 — Three advisors
- After every week, three advisors each send one email: **Dana Whitfield** (financial advisor: cash, budget, loan, investment), **Marcus Hale** (district pharmacy manager: volume, walk-outs, trust, upgrades and selling idle stations, pricing), **Priya Raman** (Pharmacy Benefit Manager: write-offs, missed calls, bottlenecks, insurer contracts). Each takes a stance — 👍 In favor · 😐 Neutral · 👎 Against — from your pharmacy's actual state, writes two or three sentences with the key facts in bold, and ends with "What I'd do". They routinely disagree with each other; none is right by default.
- New **Inbox** slip in the week flow (Results → Feed → Inbox → Decide) and an **Inbox** taskbar button with a badge until read.

## v15.3 — 2026-10-24
- Staff lists (Workers, Schedule, Performance) are sorted pharmacists → technicians → clerks, owner first, then by name.

## v15.2 — 2026-10-24
- Week and clock moved to the top-left of the top bar.
- Speed buttons (⏸ ▶ ▶▶) sit together with the view-rotate button (now a circular-arrow 360° icon) in one cluster under the bar at top-right. The bottom clock pill is gone.
- The icon strip is now a taskbar along the bottom edge, stretching from the chat box's right edge to the right gutter (Windows-style), one row with labels.
- Staff panel split into three tabs: **Workers** (roster by role, energy, mood, wage, hire), **Schedule** (shifts grid), **Performance** (jobs done and busy % per worker this week, plus where people wait).

## v15.1 — 2026-10-24
- Fix: game rotated itself even though the screen was already landscape. Rotation is now decided purely from the viewport's real shape (taller than wide → rotate), never from the phone's reported orientation, which can be stale after an orientation-lock request. Also re-checks on orientationchange and screen.orientation change events.

## v15 — 2026-10-24 — Floor detail & polish pass
- **Prescriptions look like prescriptions:** wire baskets carry an amber pill vial, a blue liquid bottle or a cream tube; finished bags are white paper with an ℞ label; the fill station shows a counting tray with pills and vials. Each script has a form (pills / liquid / cream).
- **Tap people:** tapping a customer shows their mood face, what they're doing and how long ("in line to drop off · 25 min"), and a line of what they're thinking. Tapping a worker shows energy, mood, wage and current task, with **Day off tomorrow**, **Shifts** and **Let go**.
- **Energy on the floor:** a small green→red bar under every worker's name chip.
- **Taps at high speed:** the speed buttons and open panels are no longer rebuilt while a finger is down (they were being replaced mid-tap, which ate the click); panels refresh every 8 ticks instead of 3.
- **Strip** is a two-row grid, half as wide.
- **Weekly results are a newspaper:** *The Maple Street Gazette* — masthead, dateline, an auto-written headline and lead, and three columns (By the numbers · Money · Around town) plus a classified-style tip.
- **Build palette shows a picture** of each item, rendered from the game's own art.
- **Staff** panel: roster grouped by Pharmacists / Technicians / Clerks with energy bar, mood and wage; hire buttons; then shifts; then where people wait. The old pop-up staff list is gone.
- **Item card** shows use (BUSY 44% / OVERUSED · build another / IDLE), load (4 / 4) and money earned this week; the close button no longer overlaps the header.
- **Landscape always:** the forced-landscape toggle is removed; the game also asks the browser to lock landscape when it can.

## v14.1 — 2026-10-24 — Promote, Flow, contracts
- **Feed** posts open with a bold takeaway in red or green ("5 walked out at drop-off", "17 calls missed", "Five-star visit") and a **Fix:** / **Keep it up:** line, so a week's feed scans in seconds.
- **Promote** panel: Flyers ($300, +10% a week), Local paper ad ($900, +15% for two weeks, +1 trust), Social push ($500, +8% and easier to go viral), Price-match week ($700, takes the chain's customers back), Loyalty cards ($400 once: people wait longer, buy more OTC). From week 3 a chain pharmacy opens across the street and takes 12% of walk-ins, creeping up each week unless you advertise; the panel shows its current bite.
- **Flow** panel: live view of where every script is — drop-off line, phones, bin, filling, waiting for your check, shelf, pick-up line, seated — each with capacity bar (green/amber/red), the stations and staff covering it, and a one-line "backed up: … try …" verdict. This is the build-more-or-not screen.
- **Supplies** panel (replaces Stock + Prices): stock and order, cash price, **Vaccines** contract (sign $600 with 50 doses; 50 more for $600; shots pay $40, without doses the consult desk only does $20 med reviews; flu season requires it), **Specialty meds** contract ($2,000; needs a new **Fridge** item; ~8% of scripts pay $90 more and cost $55 in drugs), and a list of available station upgrades. New upgrades: Verify terminal → Barcode scanner ($1,500, checks a third faster); Register → Card reader ($800, rings up 40% faster).
- Strip reorganised to nine buttons: Build · Flow · Money · Insurers · Claims · Staff · Supplies · Promote · Feed.

## v14 — 2026-10-24 — Neighborhood feed
- New third slip in the week flow (Results → **Feed** → Decide) and a **Feed** button in the strip (badge when there's a new one).
- Patient posts come from real events that week: the station where most people gave up (with a named patient and a fix), missed phone-ins, stockouts, a fast happy visit, a consult (private or not). Staff posts come from their state: tired (≥5), idle most of the week, or a tech whose baskets sat waiting on verify — each with what they want.
- A weekly IG-style photo: an actual snapshot of your floor, a caption chosen from the week, hashtags, likes, and comments drawn from the posts.
- One **Reply** per week: replying to a complaint recovers a little trust; thanking praise brings a few extra patients next week. A very good week (2+ praise, no complaints, 100+ served) or a very bad one (3+ complaints) goes viral: ±15% demand next week, noted on the week card.

## v13.3 — 2026-10-24
- Handwriting font removed; everything is back to Nunito for legibility.
- Panels, week cards and the item card use a prescription-pad template: ℞ header with the pharmacy name and week/day, a green pad edge, and a "Pharmacist · You · RPh" signature line at the foot.

## v13.2 — 2026-10-24
- Manage is gone as a single screen. Each section is its own icon button in a strip above the clock: Build · Money · Insurers · Claims (badge) · Shifts · Stock · Prices. Tapping one opens a small panel; tapping it again closes it.
- Money is three lines: cash now, coming in by Saturday, Saturday bills → Saturday night, with the verdict and the loan buttons. What insurers owe moved to Insurers; "where people wait" moved to Shifts.
- Item card is compact: one status line and a row of buttons (Move · Rotate · Upgrade · Sell), docked above the chat log so it doesn't cover the floor.
- Taps: all HUD buttons use touch-action: manipulation (no double-tap delay), and the hit area for tapping an item on the floor has a 26px minimum regardless of zoom.
- Attire: pharmacist white coat, technician blue, clerk green; ring and name chip match. Customers never wear blue, green, grey or white.

## v13.1 — 2026-10-24 — Economy check & notebook look
- **Fixed a game-breaking bug:** the "chain pharmacy" event's demand factor was treated as a countdown and deleted a week later, turning demand, orders and cash into NaN (the floor emptied, cash showed blank). Found by running 12-week simulations.
- **Economy rebalanced so the loan can actually be repaid with good play.** Before: $400/week fixed repayment = 50 weeks minimum, and a well-run store netted ≈ $0/week. Now: insurer rates $52 / $44 / $38 per script (copay $12, cash price $48, drugs $11), loan carries 1% weekly interest and can be paid down early from Manage → Money (keeps $1,000 back). Win = $25,000 cash + loan repaid + trust 60; lose = past a $3,000 overdraft. Write-offs cost 0.5 trust (was 1).
  Simulated results: full build with phone + problem desk + consult + OTC and early loan paydown wins around week 16–22 after dipping to ≈$400 cash in week 3; a no-frills store pays the loan off by week 23 but never reaches the cash goal; one clerk and no phone desk bleeds trust and stalls.
- **Manage and week cards look like the pharmacist's clipboard,** not a dashboard: paper panel, handwritten headings and notes. Money is now a payday forecast — cash now, counter sales to come, insurers paying Saturday, Saturday bills, and a plain verdict ("Saturday you'd have about $11,018. Room to invest or pay down the loan."), then what insurers still owe and when, the loan box, and "where people wait" with a fix suggested for any station over 85%.

## v13 — 2026-10-24 — HUD & Manage pass
- **Goal first.** Intro and every week card open with three progress bars (Cash / $30k, Loan left, Trust / 60) and one line on how you win or lose; the week's facts are four labelled items instead of prose. A thin goal strip sits in the top bar.
- **Top bar** stats carry small labels (Cash, Insurers owe, This week, Runway, Trust); clock and speed moved to a pill at bottom-right with three large ⏸ ▶ ▶▶ buttons. "This week"/"Runway" hide on narrow screens.
- **Staff vs customers.** Workers get a role-coloured ring at their feet and a role chip above the head (PHARMACIST · You, TECH · Nia, CLERK · Rosa), drawn at screen size so they stay readable at any zoom. Customers keep their mood faces. Hires get unused names.
- **Facing made visible.** Placing, moving or selecting a station shows a blue STAFF tile and an orange CUSTOMERS tile; the labels linger two seconds after placing.
- **Office → Manage.** A drawer over the right side of the live floor (no pause) with an icon rail: Money, Insurers, Claims (badge), Shifts, Stock, Prices. Insurers are toggle cards with four numbers; claims are one row each with Appeal / Cash / Drop; Money uses number tiles with sparklines and colour-coded station load. The camera nudges left while it's open.
- Chat names idle staff instead of counting them. Build mode gives the floor a bit more height.

## v12.7 — 2026-10-24
- Version label on the title screen now changes with every release (was stuck at "v12").
- Title screen checks the server for a newer build and shows **Update to … · tap to reload** when the phone is running a stale copy. The save is written before reloading.

## v12.6 — 2026-10-24
- Fix: **Continue** showed a blank beige screen (or mirrored items). The "pop-in" animation timestamp on each item was saved and compared against the new page's clock, producing a negative scale that blew one box up over the whole view. Timestamps are reset on load and the scale is clamped.

## v12.5 — 2026-10-24
- Items now visibly rotate: the customer-facing strip, trays, terminals, chair backs and shelf runs follow the facing, and a selected item shows an arrow for its front.
- Item card order is Move · Rotate · Upgrade · Sell ("Sell" replaces "Remove" everywhere).

## v12.4 — 2026-10-24
- Wording: the facing button is now **Rotate · south/east/north/west**; the item card's action is **Rotate**; the camera button reads **⟳ View**.
- Camera no longer jumps while placing: the view only re-fits on an explicit action (rotate view, opening/closing Build when you haven't panned). Safari's toolbar show/hide and other small viewport changes keep your pan and zoom. Tap-vs-drag threshold raised to 12px so a tap with a slightly moving finger doesn't pan.

## v12.3 — 2026-10-24
- Layout: top bar, palette, chat, menu and camera button all share the same left/right gutters, so they line up edge to edge. In native landscape the gutters are 12px (the phone's safe area handles the notch); the wide left gutter is kept only in forced-landscape mode.
- The floor now fits the space that's actually free: below the top bar, above the palette while building, full height otherwise. It re-fits when Build opens or closes and when the view rotates.
- Built items can be turned in place: tap the item → **Turn ↻** (free). It cycles through the facings that fit where it stands.

## v12.2 — 2026-10-24
- Every palette tile now carries a one-line "what it does" under its name.
- Moving shows the picked-up item as a translucent ghost with a facing arrow; tap a spot to preview, tap again (or **Place here**) to set it down. ↻ turns it while held.
- Items face any of four directions (south / east / north / west); the ↻ button cycles through them. Staff and customer sides follow the facing.
- Camera: a ⟳ button under the top bar turns the whole view in 90° steps (four angles). The entrance gap shows in the back wall when it's behind you.

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
