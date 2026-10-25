# Changelog

## v21.5 — 2026-10-25 — The week figure includes the insurers
- Audited the money: a 4-week reconciliation test (now in `test/cash-reconcile.js`) confirms cash moves by exactly counter cash + insurer payout − wages/rent/loan/drugs every week, and insurers pay on their dated Saturdays. Nothing was lost.
- What made it *feel* unpaid: the top bar's "This week" was counter cash minus pro-rated bills minus the whole drug order, and ignored the insurer payout that lands Saturday — so it sat deep in the red all week. It is now **Week est.**: counter cash on the current pace, plus what insurers pay this Saturday, minus the week's wages, rent, loan payment, interest and drugs. The Gazette keeps the exact figures.

## v21.4 — 2026-10-25 — Rooms built before v21.3 get a way in
- Saves carry the room as it was built. A room placed under v21.1/21.2 (or any hand-built room where the tile behind the desk is walled off) left the pharmacist with no path to the desk, so consult visitors waited and left. On load, any consult desk the pharmacist cannot reach has the wall directly behind it turned into a staff door, with a log line saying so.
- The consult desk card now states plainly when "the pharmacist can't reach the spot behind the desk — put a staff door in the wall behind it", and the chat log says the same the first time a visitor waits at such a desk.

## v21.3 — 2026-10-25 — Staff door
- New Build item **Staff door** ($150): a door only staff can use; customers treat it as wall. Grey-green leaf with a STAFF plaque. It closes a room for privacy like any door and joins wall lines.
- The **Consult room** is 4×5 again ($2,500) with two doors: a customer door at the front and a staff door directly behind the pharmacist's spot, so the pharmacist comes in from the pharmacy side and never crosses the customer's half. Verified in all four rotations: private, pharmacist can path to the desk, customers can reach the front and cannot get through the staff door, and the staff door does not expose the pharmacy area.

## v21.2 — 2026-10-25 — The pharmacist can get in
- Fix: the v21.1 room was 4 wide, so the 2-tile desk sealed off the row behind it and the pharmacist could never reach the desk. The room is now 5×5 ($2,500) with a free column beside the desk: door → customer row → around the desk → behind it. Verified by pathing the pharmacist from the entrance to the desk in every rotation and running live consults.
- Fix: with two or more consult desks, the pharmacist only ever looked at the nearest desk for a waiting patient; visitors at any other desk were never served. Any free desk with someone waiting is served now.

## v21.1 — 2026-10-25 — Consult room, ready-made
- New Build item **Consult room** ($2,400): a consult desk already walled in with a door, placed in one tap and rotatable like any other item (4×5 footprint: pharmacist row behind the desk, customer row in front, door on the customer side). It is private from the moment it lands, so the +0.4-trust consults start immediately with no wall/door assembly. The ghost preview shows the whole room joined up.
- The plain consult desk, walls and doors remain for custom rooms and for sectioning off the pharmacy; the on-floor room guide still applies to those. The parts of a placed room are ordinary objects afterwards (movable and sellable one by one).

## v21 — 2026-10-25 — Replies are promises
- **Promise system.** Replying to a complaint on the feed now makes a specific public promise tied to that complaint's fix (shorter drop-off line, faster fills, more seating, answered phones, no more backorders, closing the pharmacy off, a private consult room, a day off for the team, quicker checks). The button says what you are promising. Next Saturday the game checks whether you delivered — by building/hiring/upgrading *or* by the outcome (e.g. walk-outs at that spot halved): **kept** = +1.5 trust and a green "Promise kept 👍" follow-up post from the same person; **broken** = −1.5 trust and a red "Promise broken" post. Both count toward going viral. The reply itself is now only +0.3 trust.
- **Credibility** (hidden, starts 50): +10 per kept promise, −15 per broken one, drifts back toward 50 by 2 a week. It scales what a reply is worth; below 20 the Promise buttons are replaced by "Nobody believes replies any more — keep a promise first"; at 75+ a thanked post brings +8% walk-ins instead of +4%.
- **Thank** on a positive post only brings walk-ins if trust didn't fall that week.
- **Case Manager** now grades your promise ("You promised shorter drop-off line and delivered…") and gives an ROI call before you promise: "Worth promising — about $600, pays back in ~5 weeks" or "Don't promise this yet — you can't carry it", or a caution when the complaint is tiny.
- **Trust ledger.** Every trust change is attributed (served, walk-outs, missed calls, claims written off, consults, security, replies, promises, perks, decisions, staff let go). The Gazette's Trust line shows the week's change to one decimal with the top three causes under it. Consults float "+$60 · +0.4 trust" on the floor.

## v20.11 — 2026-10-25 — Item lifespan and lifetime earnings
- Every item card ends with one grey line: **Built wk 2 · 9 days in service · earned $1,240 total** (registers say "billed"). Days count trading days since the item went in; items built before opening count from day one. Existing saves get stamped on load.
- Card layout tightened so the extra line never pushes it off-screen: compact one-line ℞ header, Move/Rotate as icon buttons so all four actions sit on one row, smaller row gaps, and the card is capped to the free space between the top bar and the chat (scrolls inside only if it must). Checked at 932×430 and iPhone 15 Pro size.

## v20.10 — 2026-10-25 — Item cards audited
- Went through every item's card after two simulated days. Fixes: basket bin and will-call shelf were "IDLE 0%" forever (use was only counted while staff touched them) — they now report **Fill level** as the average share of capacity over the day ("HOLDING 25%", "NEAR FULL · build another"); chairs report **Occupied** time; passive items (counter, wall, door, plant, stock shelf, fridge) no longer say "idle" and instead state what they do or hold ("Holds generics · 255 on hand", "+0.3 trust a week from 1 plant"); the register's money row is labelled **Billed · copays + insurer share** since most of it arrives later; "You is working here" → "You are".

## v20.9 — 2026-10-25 — OTC shelf card tells the truth
- The OTC shelf is self-service, so "use" was only counted while staff restocked it — it read IDLE even while customers were buying. Its card now shows **Sales** ("SOLD 5 today · 7 yesterday · stock 33 / 40"), the status line says who is browsing or "self-service", and shoppers at the shelf count toward its utilisation.

## v20.8 — 2026-10-25 — Promote tab restored
- Fix: like Flow, the Promote tab lost its contents in the taskbar split (v15.2) and had opened empty ever since. It is back: current walk-in boost, the chain's share, and the five levers (Flyers $300, Local paper ad $900, Social push $500, Price-match week $700, Loyalty cards $400). A new test opens every taskbar tab and checks it renders.

## v20.7 — 2026-10-25 — Insurer money made visible, staff tabs tidied
- Insurers do pay — on a delay (BlueLeaf 2 weeks, SilverPlan 3, QuickPay 1), every Saturday, minus 6%. Checked with a 4-week trace. What hid it: the first two Gazettes say "Insurers paid +$0", and the "insurer paying late" event's *Wait* option pushes every outstanding payment back a week. Now the top bar reads "Insurers owe · $1,955 Sat" (what lands this Saturday), the Gazette has a "Due next Saturday" line, and the first insured sale logs a one-time explanation of copay vs. the insurer's share.
- Schedule tab: fixed column tracks so a long name can no longer push the Mo–Sa cells out of line; names truncate, roles shortened (Tech / Clerk / RPh).
- Performance tab fits one screen on both phone layouts: compact single-line worker rows (jobs · busy bar · verdict) and a one-line station-load strip (Drop-off · Fill · Verify · Registers). The drawer drops its slip footer and tightens spacing automatically before it would ever need to scroll.
- Fix: the per-worker weekly stats were being zeroed while the week's feed was generated, so the Performance tab between weeks showed "0 jobs · busy 100%" for everyone but the owner (and the "idle worker" memo could never fire). Stats now reset when the next week starts.

## v20.6 — 2026-10-25 — Energy %, home spots, bigger tap targets, faster frames
- Worker energy is a percentage everywhere (card, staff list, day-off memo) instead of "4/6".
- Idle workers no longer wander to random back-room tiles (which read as "everyone went to the far wall" after a reload). Each worker keeps a home spot next to their own station — techs by the fill bench, clerks behind the windows, the pharmacist by the verify terminal — and returns to it between tasks, one spot per person.
- Tapping a person: the hit area is now the whole figure plus its name tag, and a person always wins over the station they are standing at.
- The pharmacist also leaves the fill bench to an idle tech (same rule as the windows), which stops two techs showing "waiting" while the owner counts pills.
- Performance: the static floor (tiles, outer walls, entrance) is drawn once per camera position into an offscreen canvas and blitted each frame (floor cost −80%, full frame about −35%); text widths for tags and chips are cached; A* uses a binary heap instead of re-sorting its open list; nothing is drawn under the title screen or while the tab is hidden; when the store is paused or closed the canvas redraws at ~15 fps unless you are touching it or building.

## v20.5 — 2026-10-24 — Cues on the floor
- **Overloaded station**: a pulsing red outline around the footprint and a red "!" badge above its sign when its load is at 85% or more of capacity (4 in line at a window or register, 3 baskets at a fill station, 4 trays at verify, 8 in the bin, 16 bags on the shelf).
- **Idle station**: a faint grey "idle" chip over a station that has been used less than 15% of the day so far and has nobody at it.
- **Idle worker**: a "z z" thought bubble after 30 minutes with nothing to do; an orange "⏳ waiting" bubble when the reason is that every station of their kind is taken.
- Fix: the Load count on window and register cards (and the new jam cue) counted people who had already been served and were sitting down; it now counts only people in line.

## v20.4 — 2026-10-24 — One worker per station, said out loud
- Item cards for every station show a **Staff** row ("Rosa · 1 / 1 · one at a time") and, when a worker of that role is idle because every station of that kind is taken, a red note: "Luis is waiting for a free fill station · build another or upgrade this one".
- Flow rows say the same: "1 station · one tech each · 1 tech waiting for a free one", "1 window · 2 clerks · 2 clerks waiting for a free one".
- Station descriptions state "One tech works it at a time" (and the same for the window, register and verify terminal).
- Fix: the Flow panel had been opening empty since the taskbar split — its tab was never wired to the live flow view. It renders again.
- The pharmacist no longer takes the drop-off window, register or phone while a clerk stands idle.

## v20.3 — 2026-10-24 — Why is he standing there?
- Tapping an idle worker now says why: "idle · waiting — the only fill station is taken · a second one would keep this tech busy", "nothing in the bin to fill right now", "can't reach the fill station — something blocks the staff side", "no one in line right now", and so on. After two idle hours the chat log says the same once a day.

## v20.2 — 2026-10-24 — Chairs are solid
- Nobody walks through a chair any more. A chair tile blocks customers and staff alike; only the person who has claimed that seat may step onto it, so a row of chairs is a wall for everyone else and paths go around it. A chair counts as reachable when a walkable tile next to it is. Build changes no longer nudge someone off the chair they are sitting in.

## v20.1 — 2026-10-24 — Learn it the hard way
- Removed every on-floor hint about the open pharmacy: no red tiles, no banner, no checklist item, no palette hint, no Flow warning, and the counter description no longer explains the consequence. The chat log still reports what happened ("X wandered into the pharmacy area", "someone walked out with stock worth $Y") without telling you the fix. The District Manager, the Gazette and the neighborhood feed are where the advice lives.

## v20 — 2026-10-24 — Counters mean something
- **Counter redesigned.** It is a thin, half-height counter line with a wooden top that runs through its tile and joins neighbouring counters. It has two orientations (↔ / ↕), not four; Rotate flips between them, in the palette and on a placed piece. Walls work the same way.
- **The pharmacy can be left open.** Back-room stations (bin, fill, verify, will-call, phone, problem desk, stock shelf, fridge) whose staff side customers can walk to are *exposed*. Build mode and the closed store mark them with red tiles and a banner; once a counter or wall line separates them, a green "PHARMACY CLOSED OFF ✓" banner shows. The checklist lists it as an optional item, and Flow warns when it is open.
- **Customers wander in.** When the pharmacy is exposed, people in line or waiting occasionally slip into the back. While anyone is in there, every worker's task runs slower (distraction). A free clerk or pharmacist (a tech only if nobody else is free) goes to send them back to the front, which costs that worker's time. A customer left alone in the back for a few minutes may walk out with stock — generics, sometimes a specialty pack — charged at cost, with a trust hit. Each intrusion also costs a little trust.
- Results count "Walked into the back" and "Stock stolen"; the Gazette headlines repeat theft; the District Manager's one-liner turns to security and his stance goes to disfavour; the feed gets an "anyone can walk behind the counter" post. Tapping a wandering customer explains what they are doing.
- **Week review never traps you.** Every slip (Results, Feed, Call, Stock order, Proposals) has a Floor ↗ button. Leaving puts a pulsing "Continue week review · Call 3 of 5" pill under the HUD; it, the ▶ button and Continue on the title screen all resume at the same slip. Pages are numbered 1–5 of 5.
- **Empty floor between weeks.** At closing time the remaining customers are gone and staff go home (anything they were carrying returns to the bin), so the closed store shows only what you built.

## v19.3 — 2026-10-24 — Thin walls
- Walls were full-tile blocks, so a consult room looked like a cell. A wall is now a thin partition (about a fifth of a tile) running through the centre of its tile and joining up with neighbouring wall and door tiles into one continuous run, with a small post at corners. End faces that butt against another wall are not drawn, so runs have no seams. A lone wall tile shows as a single panel in the direction it was rotated.
- Walls standing between the camera and a nearby consult desk are drawn see-through (45%), so the inside of the room stays visible from any of the four views.
- Door frame and leaf slimmed to match the new wall thickness.

## v19.2 — 2026-10-24 — Door art
- The door used to look like a lighter wall block. It is now drawn as a door: two jambs and a lintel framing the opening, a wooden leaf swung ~60° into the room on the side it faces, two raised panels and a brass knob. The leaf swings toward the facing side, so rotating the door before placing it shows which way it opens. The palette icon uses the same art.
- Door description now reads "Walk-through in a wall — goes in a wall line, swings toward the side you face it; one door makes a walled consult room private."

## v19.1 — 2026-10-24 — Consult room guide
- Fix: a consult room with a door could never count as private, because the privacy check walked straight through the door into the shop. Doors now close the room for privacy while staying open for walking, so "walls + one door" works as described.
- The floor shows you what to build: when a consult desk is placed, selected, or while you hold the Wall/Door tool with an unenclosed desk, the tiles that need walls are tinted grey-blue, the one that needs a door is orange and labelled DOOR, and a banner reads "WALLS + ONE DOOR = PRIVATE" until it flips to "PRIVATE ROOM ✓". The palette hint and the item card say the same in words.

## v19 — 2026-10-24 — Inventory
- **Four stock lines:** Generics (prescriptions), Specialty cold-chain (needs contract + fridge, spoils 10%/week), Vaccine doses, OTC goods. Each has on-hand, used-this-week, days left, an order quantity and unit cost. Specialty drug cost is now paid when ordered, not per sale.
- **OTC shelf holds 40.** Customers who want OTC walk to the shelf, pick an item up (visible in hand) and pay for it at the register. The shelf's displayed stock drops as it sells and reads EMPTY at zero — no sales until restocked.
- **Deliveries are put away by staff.** Monday's order arrives as boxes by the basket bin; a tech or clerk carries each line to the stock shelf, fridge or OTC shelf before it can be used. Low OTC shelves are restocked from the back by a clerk or tech. Both appear in Flow ("Delivery to put away") and compete for staff time.
- **Stock order slip** added to the week flow (Results → Feed → Call → **Stock order** → Proposals): a supplier order form with the four lines, −/+ per line, line and total cost, and the Saturday cash forecast recalculating as you change it. Quantities pre-fill from last week's use. The old hidden auto-order and the Supplies −/+ lever are gone; Supplies shows the lines read-only.
- Also: phones are only skipped when three or more customers are queued (was one); Supplies explains that consult traffic halves without the vaccine contract; the wholesaler's weekly proposal is now a one-off 10% bulk discount for $300.
- Balance re-run (full strategy): still winning trajectory — 150 served/week by week 10, loan $11.5k, trust 100; week 2–3 cash trough unchanged.

## v18 — 2026-10-24 — Advisor cast
- Pharmacy Benefit Manager is now **Benefit Manager**.
- Each seat has a pool of four advisors with pun names and their own portraits — Financial Advisor: Penny Pillsworth, Bill Co-Payne, Ira Deductible, Cassandra "Cash" Flowers · District Manager: Phil Script, Doug Sage, Max Dose, Rex Scriptor · Benefit Manager: Claire Denied, Rhea Jected, Wanda Formulary, Pryor Authorization · Case Manager: Anita Refill, Patience Waits, Carrie Moore, Gladys Hepps.
- A New game draws one from each pool at random and stores the cast in the save, so advisors stay the same for the whole run; existing saves get a cast on load. 16 advisor portraits generated (avatars.js 209 KB).

## v17.8 — 2026-10-24
- Fix: saves made before the v13.1 economy rebalance kept the old insurer rates ($38/$30/$26) because rates are stored with the save. Such saves now load with the current rates ($52/$44/$38). Saves whose rates were changed by an in-game event (BlueLeaf cut) are preserved.

## v17.7 — 2026-10-24
- Fix: on phone-sized forced-landscape screens (e.g. 852×393) the proposal cards grew wider than their columns and overlapped each other — the line-clamped text blocks were forcing the card's minimum width. Cards now clip to their column; From lines wrap to two lines instead of truncating; "To" drops the redundant week. Feed photo trimmed so the feed slip also fits that screen. Added the iPhone 15 Pro viewport to the layout test.

## v17.6 — 2026-10-24
- Proposal cards share one template and one height: header with icon, From/To and a Required/Optional tag; Re: line (two lines reserved); body (two lines reserved); three-line terms area; equal-width buttons on a dashed signature line. The event card lists its options as terms so no card is shorter than the others.

## v17.4 — 2026-10-24
- Meeting chat is four lines: first name, then the single recommendation. Titles live on the tiles only; the explanatory paragraph is gone from the call (it remains in the Inbox emails).

## v17.3 — 2026-10-24 — Fourth advisor
- **Jordan Okafor, case manager (patient care)** joins the weekly call in place of your own tile. Reads walk-outs (especially older patients), trust movement, consults and privacy, delivery, loyalty and vaccine stock; recommends the promotions and care actions that lift satisfaction — chairs, loyalty cards, walling in the consult desk, saying yes to delivery, keeping doses stocked, a social push.
- Call layout tightened for four messages; Inbox panel shows four emails.

## v17.2 — 2026-10-24
- Weekly call: stance badge is centred at the bottom of each tile, in normal flow (portrait → name → title → badge), so nothing overlaps; mic icon removed.

## v17.1 — 2026-10-24
- Weekly call: stance badge sits top-right of each tile; chat text is one size, larger.
- Feed simplified to one large floor photo with caption and likes, and three comments in a bigger font with name, takeaway, one line of quote, fix and Reply. Two posts no longer share a customer name.

## v17 — 2026-10-24 — Weekly call & proposals
- Advisors now appear in a **Weekly call**: a video-conference layout with four tiles (three advisors and you), each advisor's tile outlined in their stance colour with a status dot and stance badge, and a meeting-chat panel on the right carrying their message and "what I'd do". One screen.
- The decide slip shows **three proposals as contract forms**, each addressed from a sender with an icon — "From: SilverPlan · accounts payable", "From: MedVax Supply · contracts", "From: Ines · Technician · internal" — with Re:, body, terms and signature buttons. The week's event is the required one; the second is a standing offer that fits your store (vaccines, QuickPay network, specialty supply, loyalty cards, a newspaper ad, or the wholesaler's standing order); the third is an internal memo from the team (day-off request, half-days proposal, relieve-a-bottleneck request, or a quiet note). Signing acts immediately; declining is free.
- A one-line strip under the proposals shows cash vs goal, loan, trust and the Saturday forecast.

## v16.5 — 2026-10-24
- Decide slip (3 of 3) rebuilt as two columns: the week's event card and one forecast sentence on the left; goal bars and four "this week" numbers on the right. Manage button removed (the taskbar is a tap away from Floor). Fits one screen.
- Advisor email text a size larger.
- Review slips can't be pinch-zoomed or resized: touch gestures on the overlay are blocked, double-tap zoom disabled.

## v16.4 — 2026-10-24
- Inbox and Feed slips fit one screen with no scrolling: the three advisor emails sit side by side; the feed shows its three strongest posts beside the photo card. Verified to fit at 932×430 and in forced-landscape 430×932.

## v16.3 — 2026-10-24
- "Ready to open?" is a centred ℞ slip with a two-column checklist (was a cramped side sheet overlapping the palette).
- Top bar: "Week N" label with the clock/Closed/Building beneath it, proper left padding; new **Rx today** and **In store** counts.
- The floor empties when the week ends — no customers wandering a closed store during the review.

## v16.2 — 2026-10-24 — Illustrated portraits
- Portraits are now DiceBear **lorelei** illustrations (by Lisa Wischofsky, CC0 1.0) — hand-drawn line art, generated offline by `tools/gen-avatars.js` into `avatars.js` (122 KB). Advisors are hand-specified (Dana: auburn bob, glasses, earrings · Marcus: short grey hair, beard · Priya: long black hair, earrings); every staff name has a fixed portrait, and the floor figure's skin tone now matches it. Role shows as the card tint and a coloured bar under the portrait.
- The earlier hand-coded SVG faces are gone.

## v16.1 — 2026-10-24 — Portraits
- Designed SVG portraits replace emoji avatars. Three fixed advisor portraits (Dana: auburn bob, glasses, navy blazer · Marcus: grey buzz cut and beard, shirt and tie · Priya: long dark hair, maroon blouse, gold necklace). Every staff member gets a deterministic portrait from their name: face shape, one of nine hairstyles, hair and eye colour, glasses, beard/moustache, earrings, expression — dressed by role (white coat with purple shirt, blue scrubs, green polo) on a matching tinted card.
- Portraits appear in the Inbox emails, the Staff panel (Workers, Schedule, Performance), the worker card, and staff posts in the Feed.

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
