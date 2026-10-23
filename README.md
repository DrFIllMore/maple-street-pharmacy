# Maple Street Pharmacy

A builder-manager tycoon game about running an independent pharmacy. Build stations, hire staff, watch prescriptions move through the store as physical baskets and bags, and survive the cash-flow squeeze between paying for drugs now and getting paid by insurers weeks later.

Single-file web game: `index.html`. No build step, no dependencies beyond two Google Fonts.

## Play

- Live: https://drfillmore.github.io/maple-street-pharmacy/
- On a phone: open the link in Safari → Share → Add to Home Screen. It runs full screen and rotates to landscape on its own (no need to unlock rotation).
- `preview.html` is a static layout preview used to tune HUD sizes by dragging.

## Debugging

⋯ menu → Debug report → Copy full report. Paste it into the chat with Claude. It includes viewport and HUD geometry, game state, every worker's current job, every basket's stage, the activity feed, and any JavaScript errors.

## Testing the simulation headless

`harness.js` runs the game logic in Node without a browser and prints weekly economics:

```
node harness.js index.html            # one week, default store
WEEKS=6 node harness.js index.html    # six weeks
BIG=1 WEEKS=6 node harness.js index.html   # expanded store, all insurance plans
```

## Design notes

See `DESIGN.md` for the concept, the decisions made so far, and the open questions.
