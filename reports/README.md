# Player reports

Reports saved from the game (⋯ → **Report a problem** → **Save report file**) go here, named
`msp-report-<build>-wk<N>-<time>.json`. Each one holds the full saved game, the last 400 chat lines,
the debug log, device/layout info, performance counters and the player's note.

Load one into the game and get a diagnosis:

    PLAYWRIGHT_BROWSERS_PATH=<browsers> node tools/load-report.js reports/<file>.json 4

The optional last number simulates that many more weeks from the exact saved game.
Findings and fixes are logged in `BUGS.md`.
