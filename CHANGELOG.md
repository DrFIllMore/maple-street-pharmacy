# Changelog

## v24.34 · 2026-10-27 — Gazette: build news strip
- "New in Build" moved out of the cramped box under Around town to a full-width strip under the three columns. It lists each new item with its two-to-five-word tag (e.g. **Phone desk** Takes phone-in Rx · **Plant** People like plants) instead of a paragraph. The full explanation stays in the chat and on the item in Build.
- The same strip carries the week's one-liner when nothing unlocked: neighborhood news, claims written off, lines, or the classifieds.

## v24.33 · 2026-10-27 — A store that grows, and staff tools to keep up
**Customers grow week to week (regular patients)**
- Customers a day = new walk-ins + regulars due for a refill. You start with 140 regulars, and each comes back about every 4 weeks.
- A good first visit (short line, short wait) turns 45% of new patients into regulars; a slow one 12%. Regulars who walk out or get a missed call may leave; 1.5% drift away each week, more to the chain when service is poor.
- The chain now takes walk-ins only. The neighborhood grows 1% a week, and every few weeks there's an event (new apartments, a clinic, a bus stop).
- Gazette shows **Regular patients 179 +18** and **Customers a day**. The District Manager notes growth and tells you when to hire.
- Playtests: good play grows from 21 to 31–38 customers a day by weeks 10–15 (was flat or falling).

**Staffing**
- **Hire preview** under the Hire buttons, per role: how busy that role was, how many people gave up there, the likely extra scripts and $ vs the wage. It also says when there's no free station for another worker, or when the role is missing entirely.
- **Part-time** tech or clerk: Mon/Wed/Fri at half the weekly wage (days editable in the grid).
- **Day cover for every role**: floater RPh $400/day, temp tech $170/day, temp clerk $140/day. Paid only for booked days.
- **Keep everyone rested** switch: each evening, anyone under 60% after the night's rest gets tomorrow off if a teammate covers, or a day-cover is booked. The regular schedule comes back after.
- New items: **Anti-fatigue mat** ($120, unlocks wk 2): 25% less drain working on it. **Break room** ($1,400, unlocks wk 3 with 3+ staff): +8 energy every night, +2 morale a week.

**Bug fixed: will-call deadlock.** Bags whose customer never came back stayed on the shelf forever. Once every shelf was full, the pharmacist couldn't finish checks and the store served 0 a day. Now bags uncollected for 5 trading days go back to stock, any bag without a customer on the way gets one each morning, and the chat warns if customers can't reach the register.

**Advisors**: the patient-care advisor warns when trust is under 25 (the bank closes the store at 0).

**Playtest** (20 weeks): a new "plays like a person" player (hires when the preview says so or after a bad week, turns on rest, fixes some complaints, ads when the chain bites) wins 13 of 14 games (weeks 11–16). Cautious, builder and optimal win. Naive and marketer lose (trust collapses after their tech quits and nobody is rehired). 47/47 test scripts pass; cash reconciles every week.

## v24.32 · 2026-10-27 — Bug sweep after the bank and pricing patch
- **Cards could still slide sideways on the phone.** The landscape touch-scroll moved content along a hidden axis. It now scrolls only along an axis that really scrolls, and ignores drag handles (chat grip, tabs). Cards stay put; panels still scroll.
- **Trust 0 shutdown** is decided at that day's close. Week-end perks (delivery, plants, …) can no longer lift trust back above 0 after the "closing tonight" message.
- **Saturday forecast** now predicts a missed loan payment (and says which bank notice it would be) instead of assuming it gets paid. Forecasts use the real cash-customer share at your price instead of a fixed 20% at the cash price.
- Chat line for the loan reads "loan $410 (incl. $160 interest)" or "loan missed" (was double-counting interest).
- Pricing trust loss capped at −5 a week. $120 for one week no longer wipes 12 trust at once; it's still the fastest way to lose the store.
- Borrow buttons disable when the full amount (plus fee) isn't available, instead of quietly lending less.
- Loan goal bar no longer breaks when the loan is above $16,000 after borrowing. Old saves that lost under the old rule get a generic game-over line.
- Removed the unused overdraft constant and stale comments. The money footer reads the loan minimum from the game.
- Tests: fixed 3 tests broken by earlier UI changes (unlock gating, merged Staff tab) and removed the obsolete smoke test. Added touch-scroll and bank-soak tests. The playtest counts a trust warning as naming the cause. 46/46 scripts pass, cash reconciles every week, tick ≈0.6 ms, draw ≈1.4 ms.

## v24.31 · 2026-10-27 — Rx pricing, borrowing, the foreclosure check
- **Cash price is open: $30–$120** (was $36–$60), in $4 steps (Supplies). The **fair price** is $48 at trust 50 and moves $2 per 10 trust.
  - Up to fair +$8: a few cash customers leave (−0.8% per $), and you earn more on each one (+9% at fair +$8).
  - Fair +$9 to +$12: still a little more money, but trust slips each week (−0.6 at +$12). Lower trust lowers the fair price.
  - Past fair +$12: cash customers leave fast (−5% per $), walk-ins drift to the chain, and trust drops hard. At fair +$20 the Gazette runs a "prices hiked" story.
  - Below fair −$6: more cash customers. A deliberate discount (fair −$8) earns +0.3 trust a week.
  - Insured patients still pay their $15 copay. Patients asked to pay cash on a rejected claim say yes less often at high prices.
  - The lever shows the live effect: share of cash customers, walk-ins lost, trust per week.
- **Loan bill = $250 minimum + that week's interest, paid in cash every Saturday.** Interest is no longer added to the loan. Week-one bill is $410, about the same as before.
- **Borrow from the bank** (Money tab): $2,000 or $5,000, $100 fee each, 1% a week, total limit $30,000. The bank won't lend after a missed payment, after a week closed in the red, or with trust under 40. You can't win while you owe.
- **Foreclosure notice as a bank check**: from the 2nd missed payment in a row, the week review opens with your returned loan check, stamped "Unpaid · 2 of 4", and a *Notice of possible foreclosure*. It shows what you owe, what's due next Saturday, and how many misses are left.
- Playtest: naive wins 1 of 8 seeds, same as before. Cash still reconciles to $0 every week.

## v24.30 · 2026-10-27 — The bank, and a clear goal
- **Win needs four things at Saturday close**: business value $20,000, **cash in hand $5,000**, loan paid off, trust 70. The cash requirement was hidden before; it is now its own goal bar (Proposals strip and goal panel) and counts toward the top-bar goal meter.
- **The bank can close the store** (replaces the instant loss at −$3,000):
  - 4 Saturdays in a row closing below $0 → the bank shuts the pharmacy.
  - Loan payment is due Saturday and is only paid if cash covers it. A missed payment adds a $50 late fee; 4 misses in a row → foreclosure.
  - Trust reaches 0 → the store closes at the end of that day.
- Each strike posts a **First Maple Bank notice** in the Saturday Gazette and the chat ("2 of 4", then a final notice). Trust under 15 also gets a warning. The Saturday forecast says which notice you'd get.
- Game-over screen names the reason. Playtest: 12 of 12 balance targets pass.

## v24.29 · 2026-10-27 — Staff card polish
- **Now** stays on one line with a short status (for example "idle · no verify terminal"). The longer advice moves to a small note under the details. Chat messages still use the full sentence.
- Labels (Energy … Experience, Now) share one fixed-width column, so values line up and no longer touch the label.

## v24.28 · 2026-10-27 — Cards stay still
- Cards (staff, items, patients) no longer slide when you drag inside them. They now have room to show everything at once: a card can cover the chat log while it is open, but not the toolbar. Sideways scrolling is off, and when a very long card does scroll, the scroll stops at the card's edge.
- Test: every item and staff card fits without scrolling on phone (430×873) and desktop (932×430).

## v24.27 · 2026-10-27 — Staff card and item card layout
- Opening a person from Staff (⋯) now closes the Staff panel so their card is no longer hidden behind it. A **‹ Staff** link at the top of the card takes you back to the same tab.
- Item cards: the upgrade gets its own full-width row ("⬆ Upgrade to … $cost") with a one-line note under it. Move, Rotate and Sell sit on the row below, so nothing is pushed off the card.

## v24.26 · 2026-10-27 — Flu shots: clear requirements
- When the consult room unlocks, the Gazette and chat say flu shots need **the consult room and the vaccine contract** (Supplies, $600 with 50 doses), that the pharmacist gives every shot ($40), and that without the contract it's $20 reviews only.
- Placing a consult room/desk without the contract repeats that once in chat. Signing confirms what happens next (doses in stock, who gives shots, reorder in Supplies).
- The vaccine contract can't be signed before there's a consult room (it said nothing and the doses sat unused); Supplies says "Needs a consult room first".
- The consult desk card shows a **Flu shots** row: doses left (red under 10) or "no vaccine contract".
- Flu season card wording matches the math ("nearly twice as many" = ×1.8) and reminds you to keep a pharmacist free for the room.

## v24.25 · 2026-10-27 — Busy stations can be opened (and upgraded)
- Tapping a station a worker is standing at opened the worker instead (people were always checked first, and a worker's tap area covers the station), so the fill station, verify terminal and register — the three upgradable items — were nearly impossible to open during the week. Now whichever is closer to your finger wins: tap the station top for the station card (with ⬆ upgrade), tap the person for the worker.
- The worker card shows **At: Fill station · Counting tray ›** — one tap to the station they're working.
- Item card buttons wrap instead of running off the card on phones (Sell was cut off next to a long upgrade name).
- Reminder: all upgrades are also listed under Supplies › Upgrades.

## v24.24 · 2026-10-27 — Two pharmacists, one fill station
Measured with test/rph2.js and test/rph3.js (a week each: 2 pharmacists + tech, 2 pharmacists no tech, 2 pharmacists + tech + 2 fill stations, floater no tech).
- Pharmacists could still take the fill station from the tech: a tech carrying a finished batch to the verify tray releases the station, and a pharmacist slipped in (tech then idle ~50% of the week). Now every on-shift tech keeps a station reserved until they're back on it; a pharmacist fills only on a station no tech needs, or takes one batch when the tech is away on deliveries/phones and 4+ baskets are waiting. Result: the tech is never idle while baskets wait.
- A pharmacist is held back from filling only by work they could actually do right now (a free verify terminal with checks waiting, a free consult desk with a patient, a free window with a line). Before, checks waiting for the *other* pharmacist's terminal kept the second pharmacist idle.
- When a pharmacist stands idle the reason now says what's missing: "every fill station is taken · another station lets the pharmacist help fill" or "the verify terminal is taken · a second one lets two pharmacists check".

## v24.23 · 2026-10-27 — This week's money
- Tap **Saturday** in the top bar for the week's money: Cash now → Saturday night, then a table with **So far / To come / Week** for Money in (counter sales, insurer checks), Money out (drugs paid Monday, hiring & bonuses, Saturday bills: wages, rent, loan payment) and Net. The Money › Cash tab shows the same table (one shared calculation, `weekMoney()`).
- Checked: the Saturday figure on Thursday afternoon lands within about $100–300 of the real Saturday-night cash (the gap is sales running faster or slower than the pace so far).

## v24.22 · 2026-10-27
- Saturday value shown without the ≈ sign.

## v24.21 · 2026-10-27 — Steady top bar, clearer money
- The top bar has fixed slots that never appear, disappear or resize: Week/time · Rx day · In store · Rx week · Cash · Insurers · Saturday · Trust · Staff · News · Goal. Between weeks the live-week slots show "—" instead of last week's numbers; News shows "—" when there's no story; the Staff slot uses short words (ok / tired / 2 low / 1 sick / 1 upset). Measured: one layout through a whole week on 393-, 430-, 932- and 1280-wide screens, nothing cut off.
- **"Week est." (often a scary −$3,900 on Monday) is replaced by "Saturday ≈ $X"**: the cash you'd hold after Saturday's bills — cash now + counter sales still to come at this week's pace + insurer checks due by Saturday − wages, rent and the loan payment (drugs were paid Monday; interest is added to the loan). Amber under $2,000, red below zero. The Money tab's forecast uses the same math (it also wrongly counted interest as cash).
- Runway left the bar (it's on the Money tab).

## v24.20 · 2026-10-26
- A greyed-out hire button now says why, e.g. "needs $3,600 cash (two weeks' pay)" for a pharmacist (tech $1,600, clerk $1,300).

## v24.19 · 2026-10-26 — Goal and balance
Robot playtest, 6 play styles × 3 runs × 20 weeks (test/reports/v24.19.html).
- **Goal is now business value, not cash:** cash + what your equipment would sell for (half of what you put into it) ≥ **$20,000**, with at least $5,000 cash, the loan repaid and trust ≥ **70** (was cash ≥ $15k, trust ≥ 60). Investing is no longer punished by the goal; overbuilding still is (half the money is gone, and wages/idle time stay).
- The district manager now flags overbuilding: a second (third…) station of a kind that sat under 15% busy all week → "sell the extra". Idle checks use the whole week, not yesterday.
- Result: careful play wins in weeks 11–13; complaint-fixing and heavy-investment play win in weeks 12–17; building blindly wins 1 run in 3 and nearly overdrafts in the others; ads without staff and doing nothing never win (they stall on trust). 11 of 12 design targets pass; the miss is robot-only (robots check staff once a week, so careful robots still see 0–1 sick days).

## v24.18 · 2026-10-26 — Pharmacist checks, tech fills, phones get answered
Measured with test/ops.js (one week, owner + 1 tech + 1 clerk, every tick logged while phones ring or baskets wait).
- **Pharmacist priorities:** check and consult first, then problems, then the counter when a clerk can't, and filling last — only when nothing is waiting to be checked or consulted, the lines are short, and a fill station is free that no on-shift tech needs (or the tech is busy elsewhere and 4+ baskets are backing up). Before, the owner spent ~33% of the week filling and the tech stood idle a third of the time baskets were waiting; now the tech is never idle with baskets waiting and the pharmacist's checking time is up ~40%.
- **Phone desk does something:** with a desk anyone free (clerk, tech, pharmacist) can pick up, and calls nobody reaches go to voicemail and get called back instead of being lost (missed calls 2 → 0 in the test). Without a desk, calls are taken at a free drop-off window by a clerk or the pharmacist, and can still be missed.
- Energy drain for station work softened (hands-on +0.27, on a job +0.17): a tech who fills all day no longer burns out in two weeks now that nobody else fills for them.
- Insurer rates back to 58 / 50 / 44 (the +$2 was offsetting energy costs that are now lower). Robot playtest: careful players win in week 12 with 0–1 sick days; naive play wins 2 of 3 only at week 19 by hoarding cash.

## v24.17 · 2026-10-26 — Every item checked
Tested every buildable item over a full week (placed, used, rotated, removed) plus a second copy of each station.
- **Specialty contract** now comes with 10 units in the fridge and a standing order of 10. Before, signing mid-game sent every specialty prescription to backorder for the rest of the week.
- **Second basket bin** is used (new scripts go to the emptiest bin); **second verify terminal** gets its share of fills (techs drop at the emptiest tray). Before, the second bin and the second terminal's tray sat empty.
- **Removing an item** moves its baskets/bags/claims to a twin of the same kind (e.g. bags to the other will-call shelf) instead of stranding them or sending checked bags back to be re-filled. Selling refunds half of everything spent on it, upgrades included (a filling robot returned $600 of $9,700 before); the card's Sell price matches.
- **Stock shelf** description now says what it does: generics are put away there and +3% customers (it said "small trust bonus", which it never gave).
- Verified working as described: walls / doors / staff doors / counters (who can pass), drop-off ×2, register, fill ×2 with upgrades, verify ×2, will-call ×2 (16 each), phone desk, problem desk, consult room (+ vaccines), chairs, restroom, OTC shelf (sales + restock), fridge, plants (+0.3 trust each, max 3).

## v24.16 · 2026-10-26 — Will-call really holds 16
- Each will-call shelf now holds 16 bags. Finished bags go to the shelf with the most room, so a second shelf adds space (before, every bag went to the first shelf and the limit wasn't enforced).
- When every shelf is full, the pharmacist can't start a check: baskets wait in the verify tray, the pharmacist shows "waiting — will-call is full", and the chat says so with the fix (another register, a clerk on pick-up, or another shelf).

## v24.15 · 2026-10-26 — Audit fixes
Found by an independent code review plus a 10-week instrumented run (cash reconciles to $0 every week, invariants on energy/morale/sickness/claims/busy stations, mid-game reload).
- Money: one-day floater cover is now actually paid ($400, in that week's wages). Hiring fees and bonuses appear in the week's costs and net ("Hiring & bonuses" line). A worker hired mid-week is paid only from their start day; someone who quits or is let go is paid for the days worked. The live "Week est." no longer subtracts loan interest (it's added to the loan, not paid).
- Closing the "No pharmacist today" question with × (or opening another card, or pressing play) now counts as closing for the day — no free day without the trust hit.
- Gazette stories last the full 3 trading days, including stories that run at week end (those previously had no effect on customers). The "closed mid-week" story can run again after its cooldown. The reporter's honest/spin verdict comes the week after, as promised.
- Claims expire after 3 trading days (weekends no longer cut that short).
- Quitting or firing frees every script that person had claimed (they were stranded until next week) and removes their schedule row. A worker who calls in sick drops their job. A closed day doesn't count as a worked day for morale. Pharmacist cover must span morning and afternoon (a half shift no longer counts as a full day).
- Raises: once per worker per week, capped at +50%.
- The little energy bar over staff heads now shows real energy (it read the old fatigue field and was always full). "Good week" morale uses the day's real low, not the post-sleep value. Equipment payback uses the average earning rate.
- After a reload the first "Hour:" line no longer reports the whole week.
- Performance: one pass over patients per tick instead of one per object; the in-back count computed once per tick; the top-bar fit only re-measures when its contents change; speed buttons rebound only when rebuilt; closed claims trimmed to the last 30.
- Removed dead code (old staff sheet with a fee-free hire path, an orphaned day-off handler).

## v24.14 · 2026-10-26 — Feed photos follow the story
- The game captures moments during the week (in memory): the longest drop-off and pick-up lines (when 4+ wait), a busy midday at the register, and a new item on Monday. At week end the feed photo is composed from the week's top story:
  - **Line complaint** → a tilted phone photo of that line, red "⏱ N in line at drop-off" tag and a timestamp, posted by the customer who complained ("…Is this the DMV?").
  - **Bad press** → a newspaper clipping (masthead, headline, grainy photo) shared by a neighbour; **good press** → the pharmacy shares it.
  - **Staff complaint** → a text post (quote card) by that staff member.
  - **Viral** → photo with a "🔥 Trending on Maple Street · 212 shares" bar.
  - **Promise kept / happy customer** → warm-toned counter photo with a heart, posted by that customer.
  - **New equipment** → photo with a NEW starburst. **Quiet week** → plain text post. Otherwise the floor overview.
- Each photo post shows its author (avatar, handle, Customer/Staff tag) and likes/shares; captions vary, and the same kind won't usually repeat two weeks running. A line photo is only used when it shows the line people complained about.

## v24.13 · 2026-10-26 — Feed posts, one layout
- Every post (customer, staff, Gazette) uses the same card: round avatar, name + tag (Customer / Staff / Press), likes on the right, one-line headline, two lines of text, an optional "→ fix" line, and a fixed action column so Promise / Reply / Thank buttons line up. Same component on the review page and in the Feed tab.
- Gazette posts are a link card (masthead + headline) with a round "G" avatar — no filler text.
- One post per customer per week (no more Mr. Patel thanking you and complaining in the same week); posts are ordered by what the week was about, so "a complaint went viral" shows the complaints first.

## v24.12 · 2026-10-26 — Money › Equipment
- Money has two tabs: **Cash** (the existing forecast) and **Equipment**. Equipment lists every item for the week so far:
  - **Earners** (register, OTC shelf, consult desk): jobs, busy %, $ this week, $ lifetime, payback ("paid off" / "pays back ~N wk" / "not earning").
  - **Stations** (drop-off, fill, verify, phone, problem desk; bin, will-call shelf, fridge as storage): busy %, jobs, verdict fine / idle / jammed (storage: storage / full), cost.
  - **Support**: chairs occupied %, restroom trips, plants' trust, walls & counters count.
  - A summary line: best earner, jammed station, idle station.
- New weekly counters per item (busy ticks, jobs, restroom trips). The drawer widens for this tab.

## v24.11 · 2026-10-26
- Top bar: **Rx week** next to In store — the week's running total of prescriptions filled (Rx today shows — between weeks). The bar now fits itself to one line, dropping Runway, then Goal, then Week est. only when there isn't room; the News chip reads just +10% / −15%.
- Gazette and every cream "paper" panel keep dark inks in dark mode (green, red and amber were light pastels on cream and hard to read).
- Gazette lead is one short line: "98 prescriptions filled, 3 walked out, 2 calls missed. Trust up to 52." Trust reasons are listed one per line.
- Fix: a fill job could crash the game when scripts were waiting in a bin that had been removed.

## v24.10 · 2026-10-26
- Energy and morale bars are now the same size and shape (morale is the battery box without the nub); the ♥ moved next to the morale number.

## v24.9 · 2026-10-26
- Energy is drawn as a small battery (outline + nub, fill colour by band); morale is a bar led by a ♥ in the morale colour. Same look on the Team rows and the worker card.

## v24.8 · 2026-10-26 — Staff › Capacity
- New **Capacity** tab beside Team: where each person's on-shift time went this week, filed into seven areas (Counter = drop-off/pick-up/phone · Fill · Stock = deliveries/restock · Check = verify/problems · Consult · Escort · Idle).
- Top: one team bar with a legend (team-wide % per area). Rows: name · title · hours, a stacked bar with the top two areas written under it, **Idle %** (red ≥50, amber <10 = no slack), **Jobs/h**, **Off-role %** (time outside their own area; red ≥25).
- Up to three plain notes on what to act on: pharmacist doing counter work, someone idle half the week (with the half-day saving), someone with no slack (bottleneck), or heavy off-role time.

## v24.7 · 2026-10-26
- Performance tab removed (worker busy time and station load): it repeated the floor cues, the Flow tab and the advisors, and its numbers were a day old. Staff is a single Team view; the Staff chip opens it directly.

## v24.6 · 2026-10-26 — One Staff tab
- Staff is now **Team | Performance**. Team puts everything on one row per person: portrait, name, title, status (fine / tired / at risk / sick / quitting / on call), energy and morale bars with numbers, the six day cells (tap to cycle Full · AM · PM · Off; sick days show "Sick"; today outlined), weekly wage (floater $/day) and ⋯ for bonus / raise / let go. Hire buttons below. The drawer widens for this tab.
- Performance rebuilt as aligned tables: name · jobs · busy bar · % · one-word verdict (busy / slack / idle); stations: name · load bar · % · fine / quiet / jammed (fix hint only when jammed).

## v24.5 · 2026-10-26 — Energy tuned by playtest
- Drain retuned from three robot runs (20 weeks × 6 styles × 3 seeds): on a job +0.19, hands-on +0.33, night +23 (was .20 / .35 / +22). One-day floater bookings from the cover prompt no longer repeat every week (v24.4).
- Measured (pt-v245b): careful players win in weeks 12–14 with 0–1 sick days; the understaffed ad-heavy player gets the first sick day in week 4 and 11–13 bad headlines; nobody quits before week 8; naive play wins 1 of 3 seeds at week 19 (borderline, it hired a second pharmacist).

## v24.3 · 2026-10-26 — The Gazette as news media
- A reporter watches the pharmacy. Headlines run for 3 trading days and change behaviour: **bad** = customers −15%, trust −2, team morale −5; **good** = customers +10%, trust +1, morale +5. One story at a time, no topic repeats within a week.
- Triggers — daily at closing: a mid-week closure; ≥8 walk-outs in a day; 2 sick calls in a week; ≥6 claims written off. Weekly: 2+ staff complaints ("run ragged"); every promise kept; trust up 3+ in a week. Week 1 opens with a positive "New pharmacy opens" piece.
- Top-bar **📰 News** chip while a story is live (tap for the article); the story also appears as a Gazette post in the Feed.
- Reporter email (from week 3, when 8+ gave up or trust < 55): **Honest** (judged next week: a good story if walk-outs fall 30%, −2 trust if not), **Spin** (nothing if it improves, a bad "claims don't match" story if not), **Decline** (−0.5).
- Proposal texts updated for the $60/$46 rates; the team-raise proposal now moves morale.

## v24.2 · 2026-10-26 — Morale, complaints, quitting
- Morale 0–100 per hired worker (blue bar beside energy). Down: finishing a day under 10% energy (−10), a sick day (−10), a declined day-off request (−10), a co-worker's complaint (−5), a co-worker quitting (−5). Up: a week never below 50% energy (+10), an approved request (+10), **Bonus $150** (+15), **Raise +10% wage** (+20, permanent) — both on the worker card.
- Under 50: 10% slower and sticks to their own role's jobs. Under 30: "disgruntled" — a complaint post on the Feed at week end (−1 trust each, team morale −5). Under 15: gives 3 days' notice; recovers if morale gets back above 30, otherwise quits (−1 trust, team −5).
- Hiring costs a $300 agency fee and the hire starts the next day. Workers gain +2% speed per week kept (max +20%); a quitter takes it with them.
- Staff › Workers rows: energy + morale bars, mood, day off, **more** (opens the card with bonus / raise / let go). Chip shows "N upset" when anyone is disgruntled or on notice.

## v24.1 · 2026-10-26 — Sickness, floater, cover
- Sickness is decided at closing: a worker who finished the day under 10% energy has a 50% chance to call in sick for 2 days (wage still paid; one person at a time). Chat warns the evening before when someone under 25% is losing ground. Sick staff show 🤒 and count in the Staff chip.
- **Floater pharmacist** (gray coat): part-time cover booked by the day in Staff › Schedule, $400 per full day / $220 half, no weekly wage, never tires. Hire once from the Staff screen; the owner can only take a day off when a pharmacist covers.
- No pharmacist on a morning (owner sick/off, nobody booked) → the game pauses and asks: **Floater · $400** or **Close today** (no customers, −1 trust, scripts carry to tomorrow). Robots use `S.autoCover` (floater if affordable).
- Insurer rates +$2 (60 / 52 / 46) to offset the new running cost; saves no longer carry old rates.

## v24.0 · 2026-10-26 — Energy
- Every worker, owner included, has a 0–100 energy battery. It drains while on shift (0.07/tick), more on a job (+0.20) and most hands-on at a station (+0.35): a quiet day ≈ −15, flat out ≈ −30. Nights +22, a day off +45, Sunday +20. A flat-out worker runs empty in 4–5 weeks without rest; a 55%-busy one holds.
- Speed by band: Fresh ≥50 normal · Tired 25–49 ×0.85 · Exhausted 10–24 ×0.70 · At risk <10 ×0.60 · 0% ×0.40 (still works; sickness comes in v24.1).
- Alerts: chat lines when someone crosses 50 / 25 / 10; new **Staff** chip in the top bar (ok / tired / N low · lowest %) that opens the Staff screen; floor faces (sad under 25, angry under 10).
- Staff › Workers is a one-screen dashboard: energy bar, today's load, mood, **day off** button per row. The owner now appears in the Schedule and can take a day off only when another pharmacist covers that day (`setShift`).
- Feed/Inbox/promise 'rest' use the new bands. Saves convert fatigue → energy.

## v23.10 · 2026-10-26
- Top bar and the chat/taskbar row now start on the same line and end on the same line in the rotated layout: the old 87px left gutter (a notch allowance) is gone now that the window inset handles the status bar; chat, sheet and taskbar never start left of the bar. Test: test/bar-alignment.js.

## v23.9 · 2026-10-26
- Default window insets from the player's measurement (iPhone 15 Pro Max, Safari): top 72 · left 8 when the phone reports a status-bar safe area; derived as safe-area-top + 13 so other notched phones match. Desktop / no safe area → no insets. Adjust window still overrides; Reset returns to these defaults. Test: test/window-defaults.js.

## v23.8 · 2026-10-25
- Adjust window uses − / + buttons per edge (tap = 4 px, hold to repeat) instead of edge drags, which collided with iOS edge-swipe gestures. The green edge lines remain as indicators only.

## v23.7 · 2026-10-25
- **Adjust window** (⋯ menu): drag the four green edge handles to set how much of the physical screen the game keeps clear on each side; the whole HUD and floor refit live. Copy puts the insets + screen size on the clipboard to report; Reset clears; the setting persists (`msp-window`) and works in both orientations. Insets are also listed in the Debug report. Test: test/adjust-window.js.

## v23.6 · 2026-10-25
- Fix: the drop-off / pick-up line piled everyone onto one tile when the tile behind the first customer was blocked (chairs, plants, a counter), so the queue was invisible while customers still timed out and "gave up at drop-off". The line now bends around obstacles (`queueLine`), never crossing another window's spot. Test: test/queue-line.js.

## v23.5 · 2026-10-25
- Fix: in v23.4 the rotated app relied on 100vh/100vw while the canvas used the visual viewport, so on iPhone the floor could render stretched/offset relative to the HUD. The app box is sized explicitly from the visual viewport again (as in v23.1).

## v23.4 · 2026-10-25
- Rotated layout uses the full screen again (v23.1 dimensions). Instead of shrinking the app, the HUD gutters grow to at least the safe-area insets, so no panel, card, prompt or message sits under the Dynamic Island or the home bar; review/inbox panels respect the right gutter too.

## v23.3 · 2026-10-25
- Fix: reloading a saved game on iPhone (WebKit) could crash the page. Cause: the `container-type` rule added to the taskbar in v23.2; replaced with a JS class toggle (`.strip.narrow`) driven by a ResizeObserver.

## v23.2 — 2026-10-25 — Notch-safe, restroom card fixed
- On a phone held upright (game rotated), the whole game now sits between the status bar/Dynamic Island and the home indicator instead of running under them: the app is shortened by the safe-area insets and no HUD piece or floor is drawn under the black bar. The old 87px left gutter that approximated this is gone, so nothing is wasted. Taskbar labels tighten on narrow widths.
- Restroom card: shows "FREE / IN USE · 3 today · 11 total" (lifetime count added; a stray "yesterday" removed) and the status line says who is inside or "Free · customers use it while they wait". Trips were being counted; the display reset each morning and hid it.

## v23.1 — 2026-10-25 — Margins, measured
- Insurer rates +$6 (BlueLeaf $58, SilverPlan $50, QuickPay $44) and copay $15 (was $12): about +$8 a script. Three-seed playtest: cautious wins weeks 13–14 every time, builder and optimal in 1 of 3 runs (they overspend), naive never reaches the goal, no dead stretches. 7 of 8 targets pass.
- Event texts updated to the new rates; old saves adopt the new rates.

## v23 — 2026-10-25 — A named owner, a restroom, and equipment that unlocks
- **The owner has a name.** Each new game picks one (Sam, Jo, Avery, Morgan, Riley, Quinn, Jordan, Casey, Devi, Noor, Tomas, Lena); existing saves get one on load. Tags, slips and the team's feed posts use it; "You" is gone.
- **Restroom** ($900, unisex, one at a time), available from the start. Some waiting customers need it (older customers twice as often): with a free one they walk over ("IN USE"), come back and rejoin; without one, or if it stays busy, they get restless (patience −40%) and some walk out "needing the restroom". Gazette, feed ("No restroom", promisable), Flow row and the item card all report it.
- **Gradual unlocks**, each announced in the Gazette's box and badged NEW in Build until first placed: phone desk + plant after week 1; problem desk after the first written-off claim; OTC shelf at week 3 with trust 55; consult room from week 3 once insurer checks have arrived and cash is $4k; fridge once a consult desk exists and trust is 70; stock shelf at trust 80 or a 150-script week. Nothing can be placed before it unlocks. Existing saves keep everything they already had.
- Fix: placing a customer-side item (OTC shelf, restroom) was wrongly refused as "staff couldn't reach it".
- Runway shows "ok" above a year instead of "699 wks".
- Playtest: measured with the corrected harness (no real-time ticks between weeks), v23 matches v22.1 — cautious wins week 19–20, builder sometimes week 17, reactive loses. The earlier week-13 wins were inflated by stray ticks; the economy is still slower than the targets, which the next pass addresses with numbers.

## v22.1 — 2026-10-25 — Tuned on the second run
- BlueLeaf pays 7 days after the sale (was 8), so the first check lands on Monday of week 2 — about 2.9 minutes of floor time at 1×.
- Second robot playtest (loan $16k, hungrier rival, robots repay the loan): **cautious wins week 13–14, builder 14–18, optimal 15**; cautious bottoms at $6.6–7.9k in week 3 (the squeeze is back); naive stagnates (served falling 60 → 48 as the chain eats its share, net worth ~$9–11k, no path to the goal); marketer-only play is a trap (trust 36–52, cash under $5k); reactive pays off the loan but is slow (~week 24). 7 of 8 targets pass. Report: `test/reports/v22-pass2.html`.

## v22 — 2026-10-25 — Balance pass, measured
- **Insurers pay daily.** Claims are dated in trading days (BlueLeaf 8, SilverPlan 12, QuickPay 4) and paid the morning they come due: a green "+$520 insurers" floater at the register and a log line; the first check gets a one-time announcement. First money lands around Tuesday of week 2 (~2.5 min of floor time at 1×) instead of the end of week 3. Top bar reads "Insurers owe · $X this wk"; Money tab and Gazette say "this week / next week". Old saves convert.
- The late-payment event cannot appear before week 4 or before two checks have arrived; the advance is listed first and pays 92%; "Wait" delays everything by one week.
- **Service matters more:** demand = 24 × share × (0.4 + trust/100). A trust-95 store draws ~75% more than a trust-40 store (was ~30%).
- **Goal $15k** (was $25k) with the loan repaid and trust 60; **loan and starting cash $16k** (was $20k) to keep an early squeeze now that checks arrive sooner. The rival chain erodes an un-promoted store harder (share up to 35%, +1.5%/week).
- Pacing: the store opens at ▶▶ speed unless you have picked a speed; the intro says insurers pay 8–12 days after a sale; week 1's opening log says when the first checks land.
- Playtest (robots, 20 weeks): optimal wins week 14–15, cautious week 17; every archetype is net-positive by week 2; no dead stretches. Second tuning run in `test/reports/`.

## v21.6 — 2026-10-25 — Playtest harness, and the cascade it found
- **New: `test/playtest.js`** — six robot players (naive, cautious, builder, marketer, reactive, optimal) each play 20 weeks on fixed seeds, deciding only from what the game shows them (feed, advisors, floor cues, cash). It scores the run against written targets (first insurer money ≤ 3 min, a positive week by week 4, cautious bottoms at $4–9k, naive must not prosper, ≥3 archetypes can win, no dominant strategy, no dead stretch > 90 s, losses are warned) and writes an HTML report with cash curves. Reports live in `test/reports/`.
- **Fix (found by the harness): claim cascade.** If a staff member could not path to a station mid-job (e.g. a room placed where it cut off a staff tile), the aborted verify job dropped *rejected* prescriptions back in the bin; they were refilled, re-rejected, filed a duplicate claim each time, and every duplicate expired as a write-off — single weeks with 100–200 write-offs and 50–100 points of trust lost. Now: rejected scripts on an aborted job wait in Claims, a script can only have one open claim, the log names the unreachable station, and placing/moving/rotating anything that would cut staff off from a station is refused (walls and counters warn instead, since you may be mid-room).
- Baseline scorecard after the fix: 4 of 8 targets pass. Still failing: first insurer money (8.6 min), first positive week (week 4), naive play prospers (doing nothing ends with $23–25k), and nobody reaches the goal in 20 weeks. These are balance decisions, taken next.

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
