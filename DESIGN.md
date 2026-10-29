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

## 2026-10-24 — Economy model (v13.1)
Per script: insurer pays $52 (BlueLeaf, 2 wks, 6% rejected) / $44 (SilverPlan, 3 wks, 10%) / $38 (QuickPay, 1 wk, 4%) plus $12 copay; cash payers $48 (36–60 settable). Drug cost $11. Consult $40, OTC $9.
Weekly fixed: wages (tech 800, clerk 650, pharmacist 1800), rent 500, loan minimum 400 + 1% interest on balance. Extra loan payments any time from Manage → Money.
Win: cash ≥ $25,000, loan 0, trust ≥ 60. Lose: cash < −$3,000 at week end.
Tuning target (verified by `scratchpad/econ.js` WebKit sims): optimized store wins in 16–22 weeks with a cash trough of a few hundred dollars around week 3; mediocre play stalls; neglect declines. The slow-pay insurer tempo (2–3 weeks) is the main source of cash tension.

## 2026-10-24 — v14.1 balance note
Rival chain (from week 3) takes 12% of walk-ins, drifting +1%/week to a 25% cap unless a paper ad or price-match week is running (−4%/week). Sim with ads + loyalty + vaccine contract + early loan paydown: win at week 16 (trust 100 by week 8, 140–150 served/week). Without any promotion the same build stalls around 105 served/week and a loan of ~$11k at week 10 — advertising is now part of the required strategy.

## 2026-10-24 — Balance check after v15.3 (test/econ-sim.js, 24 weeks)
| strategy | wk4 cash | wk12 cash / loan | outcome |
|---|---|---|---|
| lean: tech + 1 clerk, no phone/problem desk, no promos, minimum loan payment | $10.7k | $17.1k / $17.5k | never wins — trust flat at ~52, chain erodes walk-ins to ~67/wk |
| base: + 2nd clerk, phone, problem desk, paper ads, loyalty, early loan paydown | −$535 | $2.8k / $11.1k | survives, loan gone ~wk 24, cash never reaches $25k |
| full: + consult + vaccines + OTC + specialty/fridge + verify upgrade + ads | $8.6k | $8.3k / $1.9k | **wins week 18**, net ≈ $3–4k/week from week 8 |
Takeaways: profitability comes from the add-on revenue (consults/shots, OTC, specialty) and from keeping the chain's share down with ads; wages alone eat a plain prescription-only store. Cash trough for every strategy is weeks 2–4 while insurers haven't paid yet.

## 2026-10-24 — Inventory (v19)
Lines: generics $11 (step 25), specialty $55 (step 5, 10%/wk spoilage, fridge), vaccine doses $12 (step 10), OTC $4 cost / $9 sale (step 20; shelf capacity 40). Delivery Monday, paid on delivery, must be carried from the bin to its home by staff (receive job, priority above fill for techs). OTC buyers (~30% of walk-ins, +15% with loyalty) detour to the shelf; restock job triggers at ≤30% shelf stock from back-stock. Order suggestions: generics = 1.1×weekly demand minus surplus over 2 days; specialty = 1.3×last week's use + 3; vaccines = 30 when under 25; OTC = 1.2×use + 10 minus on hand.

## Security (v20)
- Exposed = a back-room station's staff tile is in the customer-reachable set (`reach`). Recomputed with the grid.
- Sneak chance per tick per queued/waiting customer: 1% × (1 + exposed/6). Noticed after 3 ticks or on arrival; free clerk/RPh escorts (tech only if nobody else is free). In the back: all staff work at 1/(1+0.5n). Theft from tick 2: 20%/tick unescorted, 8%/tick with an escort on the way; 4–8 generics at unit cost, +1 specialty 30% of the time; −0.5 trust (plus −0.3 per intrusion).
- Open 3-staff week-1 layout measured: ~7 intrusions, ~10 interceptions, ~1 theft. With a counter line: 0.

## Promises & credibility (v21)
- Reply to a complaint → promise {kind, snapshot of counts, made=week}. Graded at the end of that week: kept if the build/hire/upgrade count rose or the outcome metric met its target (walk-outs at the spot ≤ half, missed calls ≤1, backorders 0, intrusions 0, room enclosed, nobody exhausted, tray peak <5).
- Kept: +1.5 trust, cred +10, green follow-up post. Broken: −1.5 trust, cred −15, red follow-up. Reply: +0.3 × (cred/50). Cred decays 2/wk toward 50; <20 disables Promise; ≥75 doubles thank-buzz (8%).
- Trust ledger: S.wk.tw[reason] via dTrust(). Gazette shows top 3.

## Staff energy, morale and the press (v24, 2026-10-26)
- Energy 0–100 per worker incl. owner. Per 5-min tick on shift: .07 base, +.20 on a job (walking), +.35 hands-on at a station. Night +22, day off +45, Sunday +20. Calibration: ≈55% busy breaks even; flat-out loses ≈7/day → empty in 4–5 weeks. Bands: <50 ×.85, <25 ×.70, <10 ×.60, 0 ×.40.
- Sickness decided at closing: <10% → 50% chance, 2 days, paid, one person at a time. Owner included. No pharmacist on a morning → prompt: floater $400 or close (−1 trust).
- Floater pharmacist: part-time, gray coat, booked per day ($400 / $220 half), never tires, counts as cover.
- Morale 0–100 (hired staff): −10 empty day, −10 sick, −10 declined request, −5 co-worker complaint/quit/bad press; +10 good week, +10 approved, +15 bonus ($150), +20 raise (+10% wage), +5 good press. <50 slower & own-role only; <30 complaint post (−1 trust); <15 three days' notice → quit. Hire fee $300, next-day start; tenure +2%/wk speed up to +20%.
- Gazette headlines: 3 trading days, bad −15% customers/−2 trust/−5 morale, good +10%/+1/+5; one at a time, topic cooldown 7 days. Reporter email honest/spin/decline graded next week against walk-outs.
- Robot harness targets added: careNoSick, naiveSick (wk 3–7), noEarlyQuit, cautious15.

## Bank rules (v24.30)
- Win (checked at Saturday close): business value ≥ $20,000, cash ≥ $5,000, loan 0, trust ≥ 70.
- Lose: 4 consecutive Saturdays with cash < $0; 4 consecutive missed loan payments (payment taken only when cash ≥ amount due; miss = +$50 late fee); trust ≤ 0 at any day's close.
- Strikes reset as soon as a Saturday closes clean. Notices appear in the Gazette and chat each week a strike is counted.

## Rx cash price and the bank (v24.31)
- fair = 48 + 0.2·(trust − 50). gap d = price − fair.
- Cash-customer multiplier: d ≤ −6 → 1 + 1.5%·(−d−6) (max +30%); −6..0 → 1; 0..12 → 1 − 0.8%·d; > 12 → 0.904 − 5%·(d−12) (floor 0).
- Walk-ins overall: d > 12 → × (1 − 1.2%·(d−12)), floor 0.6. Trust per week: d > 8 → −0.15·(d−8); d ≤ −8 → +0.3. Press story at d ≥ 20.
- Loan: Saturday bill = min($250, balance) + 1% interest, paid in cash. Missed → interest + $50 added to the balance, strike counted.
- Borrow: $2k/$5k draws, $100 fee, limit $30k total. Blocked while any strike is active or trust < 40.
- Check notice from the 2nd consecutive missed payment; foreclosure on the 4th.

## Customers and staffing (v24.33)
- walk-ins/day = 17 · hood · plan share · (0.4 + trust/100) · price · promos · (1 − chain) · press; hood grows 1%/wk (max 1.35) plus events (+4–8%).
- regulars/day = regulars / 24. Start 140. New patient served: +0.45 regular if line < 6 ticks and wait < 14, else +0.12. Regular slow visit −0.15, walk-out −0.5, missed call −0.3. Weekly drift 1.5% (+ chain·10% when ≥ 8% of customers were lost).
- Will-call: bags older than 5 trading days return to stock.
- Day cover: floater/temps per role (rph 400, tech 170, clerk 140 a day). Part-time: F O F O F O.
- Keep everyone rested: at day end, energy < 60 (after night) → tomorrow off if a same-role teammate works, else book cover if cash ≥ cost + $1,500.
- Mat: work drain ×0.75 on that tile. Break room: +8 night recovery, +2 morale/wk.

## Pace, patience and debt relief (v24.56)
- One tick = 5 game minutes at every speed. Walking is per tick (`WALK_K`=2 × speed), so faster play never makes service slower.
- Patience: line 30 ticks (2.5 h), standing 36 (3 h), seated 51 (~4 h). Come-back-later starts at a 24-tick (2 h) expected wait.
- Target: a quiet store serves a walk-in in about 1 hour, so patience is roughly 2.5–4× the base service time.
- Service trust per week: +3 / +1.5 / 0, down to −4 at worst (was −8).
- Bank: a short Saturday pays interest only (no fee, no strike). A miss means not even the interest is paid. The first red Saturday is a warning; red strikes count from the second in a row. Insurer advance pays out all receivables now at 3% on top of the 6% fee.

## Breaks and comfort items (v24.57)
- With a break room, every staff member takes one lunch break per shift (from tick 36, about noon), one at a time: 4 ticks, +12 energy, +1 morale, ×1.06 speed for the rest of the day. Urgent breaks under 35%; idle breaks under 65%.
- Comfort item cards (chair, restroom, snack, break room) show Holds / Now / Used (today, week, total) plus one line on what the item does.

## Next expansion: outside lot, drive-thru, land, career levels (proposal, 2026-10-28)
Prototype: `prototypes/lot-and-levels.html` (standalone, simplified numbers).

### 1. Career level and achievements (lowest risk, ship first)
- XP from play: +1 per Rx served, +2 per happy customer, +25 per net-positive week, +50 per trust milestone (60/70/80/90), plus each achievement's bonus.
- Levels 1–10, XP needed = 150 · L^1.4. A title per level ("New Owner" → "Regional Name").
- Levels replace the current week-based unlocks (`UNLOCKS`): restroom/snack (L2), break room (L3), driveway + drive-thru (L4), land (L5), expansion (L6), second store (L8+).
- ~30 achievements in groups (service, money, staff, building, drive-thru), each with a progress bar. Toast on unlock; a Career page in the office drawer.
- The career level is kept in its own localStorage key (`msp-career`), separate from the store save. A new store after a win or a loss starts at your career level, so winning feeds the next run.
- Engine work: an `xp(n,why)` hook called from serve, endWeek and build; an `ACH` table checked at end of day; no change to the sim.

### 2. Outside view and drive-thru (medium)
- The world grid grows around the store: the store stays W×D; a lot ring of 4–6 tiles; the street on the east (the existing entrance side, `OUT` already sits at x≈21).
- A camera toggle, Inside/Outside: outside draws the roof and the lot; inside is today's view.
- New build items (outside only):
  - **Driveway** ($40 a tile), on your own lot.
  - **Drive-thru window** ($3,500), placed in an outside wall: a register variant whose customer tile is outside.
  - **Menu board / canopy** (cosmetic, +trust).
- **Lane rule:** a paved path from a curb tile → the tile outside the window → a second curb tile. The status chip says what's missing. The red tile shows where.
- **Cars:** a new agent type that moves along the lane. Line capacity is the lane length. When the line reaches the curb, the car drives past (lost, like a walk-out but −0.05 trust). Patience is 1.3× a seated customer.
- **Demand:** the drive-thru adds a new 10–15% of customers (parents, elderly, sick), and moves ~20% of pick-ups from the counter to the window.
- **Staffing:** a clerk walks to the window. One clerk covering both shows the trade-off; a second clerk can be assigned to the window.
- Engine work:
  - second grid layer (`lot[y][x]`), car agents, lane path cache;
  - outside camera; the window uses the existing register job with a different customer source;
  - save migration (lot is empty for old saves).

### 3. More land and floor expansion (highest risk)
- North and south parcels for sale ($15–18k, from L5). Rent goes up per parcel.
- An owned parcel can be paved (longer lane, parking: +walk-ins), or expanded into floor (L6, $9k). The wall moves out and the new floor starts empty.
- **Engine work:**
  - `W`/`D` become save-state (`S.W`, `S.D`); everything that reads them already uses the globals;
  - expanding north or west shifts every object, person, script location, door, `OUT` and saved layout by (dx,dy) in one `shiftWorld()`;
  - grid, reach and path caches are rebuilt;
  - walls on the old edge are removed.
- Test with the existing layout replays (user-layout-w9, wall-cutoff) plus a shift test that checks every script's `at` still points to a real object.

### Order and size
| Phase | Patches | Risk |
|---|---|---|
| 1 Career and achievements | 1–2 | low: no sim change |
| 2 Outside view and drive-thru | 3 | medium: new agent and grid layer, balance |
| 3 Land and expansion | 2 | high: coordinate shift, save migration |

## Outside, drive-thru, career and land (v25.0, built)
- World coordinates are shared: store x 0..W-1, y 0..D-1. East of the store, in order: front sidewalk (x=W), parking row A (W+1..W+2), aisle (W+3), row B (W+4..W+5), planter strip, public sidewalk (W+7), two-lane street (W+8..W+9). The north connector row (y=-1) is the exit; the south one (y=D) is the entrance.
- Customers: `planArrival` picks car (60%, older customers 80%) when a space is free, otherwise the sidewalk. The patient object exists from the start; its outside walk runs before the normal indoor logic, and patience timers only run indoors. Leaving customers become runtime walkers (not saved). Cars, walkers and street traffic are cleared every week.
- Drive-thru: `dtwin` is a station whose customer tile is outside. `computeLane` finds paved gates next to the lot's road (aisle and connector rows), picks the in/out pair with the longest queue, and needs two distinct gates. Pick-ups (not walk-ins waiting inside) use it 45% of the time. Lane patience is 1.3× the line patience. Demand ×1.10 while it's open.
- Career: kept in `msp-career` in localStorage, separate from the store save. Level L needs 100·(L−1)^1.6 XP. `LV_ITEMS` opens Build items early; normal unlock rules still apply too.
- Land: `S.lot.own` / `S.lot.exp`. Store size and door row are saved as `S.W`, `S.D`, `S.doorY`; `syncDims()` runs in `rebuildGrid()`. Expanding north or west shifts every position (items, staff, people, mess, parking rows, driveway) so the store keeps its corner at 0,0. Driveway that ends up inside comes up for half back. A drive-thru window on the wall being moved blocks the expansion.

## Major levels (v25.6)
- `MAJOR[1]`: trust ≥ 90 and `S.netTot` ≥ $30,000 (the sum of weekly net since opening). `MAJOR[2]`: trust ≥ 90, `S.netTot` ≥ $100,000, and `dtOpen()`. Checked at the end of the week, after the bank rules.
- Finishing Level 1 sets `S.major=2` (the game continues), shows a page in the week review, and opens `MAJOR2_ITEMS` (stall, drive, dtwin), land and expansion, and the promotions marked `m2`. Finishing Level 2 sets `S.done='win'`.
- Career XP levels are shown as "Rank" in the interface (the code still says level). Ranks open store items and the classic promotions only.

## Cutscenes (v25.7)
- Engine: `playCine(kind, done)` sets a `CINE` state. While it is set, `frame()` calls `drawCine()` instead of the normal draw. That function eases the camera between keyframes, forces the outside view (rotation 0, or 2 for the back of the store), draws the normal scene, then layers on the extras: crowd, ribbon, balloons, confetti, fireworks, the planned lane and crane. `endCine()` puts back the view, see-through mode, camera and speed.
- The game is paused with `setSpeed(0)` and resumed at the saved speed. The HUD is hidden with `.app.cining`. The DOM overlay `#cine` holds the news or social frame and the Skip button.
- Triggers:
  - `startWeek` in week 1 → `open`, once per store (`S.openCine`).
  - `showReview` with `w.majorUp` → `lvl1`, then the Level 1 page (`w.cine1`).
  - The Level 1 page's button → `lvl2`, then the rest of the review.
- Scenes seen are kept in `CAREER.scenes` for the replay buttons.
- `navigator.webdriver` skips scenes unless `window.__cineTest` is set. Test API: `playCine`, `endCine`, `cine()`, `cineAt(ms)`.

## Income mix (v25.12)
- Before: prescriptions brought in about 97% of the money (week-15 report: OTC $720, shots/consults ~$1.4k, Rx ~$22k).
- Front-store shoppers: `shopPerDay()` = min(3, stocked reachable OTC shelves) × 9 × (0.5 + trust/200), ×1.3 in flu season. Each takes 1–3 items ($9, cost $4) and pays at a register with `jobCheckout` (half a ring-up). Giving up counts in `wk.shopLost`, not `wk.lost`.
- Flu shots: $45 (dose $12). Pick-up customers ask with chance 10% (older customers 30%), ×1.8 in flu season, and become consult visitors with `wantShot`, which shows a 💉 bubble. Shot seekers wait 14 ticks at the room (others 10). Misses are tracked as `shotMissDose` and `shotMissWait`.
- `S.wk.inc` holds rx / otc / shots / reviews / snacks. Shown on the Money page bar and in the weekly money message.
- Sim of the report's store (1 week): Rx 77%, OTC 12%, shots 11%; net about +$2k.
