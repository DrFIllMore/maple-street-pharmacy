# Bug log

One entry per reported problem: what the player saw, the real cause, and the fix.
New reports go in `reports/`, and you can load them with `tools/load-report.js` (see `reports/README.md`).

| # | Reported (build) | What the player saw | Cause | Fixed in |
|---|---|---|---|---|
| 1 | v24.26 | Staff card hidden when opened from the Staff page | Card opened under the wide Staff drawer | v24.27 |
| 2 | v24.26 | Upgrade button pushed Sell off the item card | Upgrade shared the action row | v24.27 |
| 3 | v24.27 | Card content could be dragged around | Card scrolled because it was taller than its space | v24.28, v24.32 |
| 4 | v24.31 | Cards still slid sideways on the phone | Landscape touch-scroll moved a hidden axis | v24.32 |
| 5 | v24.31 | Trust-0 "closing tonight", then the game went on | Week-end perks lifted trust after the check | v24.32 |
| 6 | v24.33 | Store served 0 a day; trust collapsed | Will-call shelf jammed with bags nobody came back for | v24.33 |
| 7 | v24.34 | Pages needed scrolling (intro, Gazette) | New rows overflowed; no fit check | v24.35 |
| 8 | v24.36 | Trust reasons didn't add up | Gazette showed only the top 3 reasons | v24.37 |
| 9 | v24.36 | Most walk-outs blamed on the restroom | No-restroom penalty not reduced when use went 4× | v24.38 |
| 10 | v24.38 (wk 9 report) | Hiring didn't help; Rx dropped; trust 9 | Seated customers' walk-outs labeled "at drop-off". Advice said hire clerks; the real jam was one fill station for two techs | v24.39 |
| 11 | v24.39 (audit) | Hire preview said "pays" when it didn't | Per-role guesses. Now uses the measured bottleneck, checked by A/B runs | v24.40 |
| 12 | v24.39 (audit) | Anti-fatigue mats did nothing | Checked the wrong tile | v24.40 |
| 13 | v24.39 (audit) | Insurer pay time wrong; forecasts disagreed; Gazette money didn't add up | Old fields; generic-only order cost; recomputed wages | v24.40 |
| 14 | v24.40 | 92% served yet trust didn't move; customers "don't wait" | Each walk-out = 10 served; no recovery; whole process had to fit in one visit | v24.41 |
| 15 | v24.44 (wk 5 report) | New register unused; customers stuck in one pick-up line; snack machine "never used" | Register placed facing the pharmacy (front unreachable), no warning. Snack machine far from the chairs, and most customers come back later | v24.45 |
| 16 | v24.46 | Can't pay the loan by hand, even paused | Pay buttons needed $1,000 extra cash on hand, with no reason shown. Also no way to pay the week's bill early | v24.47 |
| 17 | v24.49 | Phone calls in week 1 with no phone; drop-off window doing two jobs | Calls rang at the drop-off window until a phone desk unlocked (week 2), competing with walk-ins | v24.50 |
| 18 | v24.51 | Chat box and menu bar sit too high | Chat box was draggable by its tabs (easy to drag by accident); position saved; menu aligned to it | v24.52 |
| 19 | v24.52 (wk 7 report) | Break room never used; patients don't sit or snack; huge waits | Supplies upgrade buttons threw an error (id type), so fills stayed slow; break room was passive only; a 73-basket backlog never cleared, so waits read "48h" and nobody stayed | v24.54 |
