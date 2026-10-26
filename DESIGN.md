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
