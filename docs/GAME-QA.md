# Game verification — 2 October 2026

Scope: `/game/`, the 22-category public bank, local preparation, automatic turns and host controls. Guest RSVP/storage is separate. These checks describe local files; public deployment is verified separately by the release task.

## Automated checks

```sh
node --test tests/game-engine.cjs tests/game-pack.cjs tests/session-store.cjs tests/celebrity-faces.cjs
```

**51 tests pass:** 27 engine, 7 pack, 13 session-store and 4 portrait-picker tests.

The suite covers:

- 2–6 teams, unique names, signed scoring, duplicate-award protection, reveal, skip, cancel and undo.
- Correct and Wrong retiring the tile immediately, advancing the primary turn, surviving reload and restoring the score/tile/turn together with Undo.
- Steal before judgement, original primary turn order, one Double Up/First Letter/Steal per team per round, late-token rejection, doubled gain/loss, and token undo/replay.
- Selected category catalogs from one through the expanded bank, unknown/duplicate selection rejection and independence from changes to unselected categories.
- A complete six-team, recommended 30-clue game, completion, restoration and final-result undo.
- Signed manual corrections, required reasons and malformed-history rejection; saved totals cannot override replayed scoring.
- JSON round-trip, private raster media, bilingual fallback, rejected external/active images, oversized/malformed data, duplicate IDs and invalid clue values.
- Five portraits chosen from sixteen preserving selection order, scoring values and exported/restored content; invalid or duplicate choices rejected and bundled image paths present. The five latest portraits also produce a complete board with named answers.
- Stale-tab writes, storage denial, transient failures and newer-save conflict detection.

`node --check` passes for `app.js`, `engine.js`, `pack.js`, `pack-tools.js`, `celebrity-faces.js` and `session-store.js`. `git diff --check` also passes.

## Browser checks

CUA used a disposable game at **http://localhost:8766/game/**, separate from both the user's `127.0.0.1:8765` origin and an older `localhost:8765` save. Neither existing game was reset or overwritten. Viewport: 1280×720.

| Check | Observed result |
| --- | --- |
| Setup | 22 categories visible; recommended six select 30 ready clues. |
| Automatic timer | Opening Science + Tech · 100 selected The Bootleggers and started the 45-second timer. |
| Wrong retires tile | One Wrong click deducted exactly 100, closed the clue, showed Mars as the last answer and made the tile grey, checked and disabled. Progress became 1/30. |
| Turn advance | Champagne Problems became the next primary team immediately; the wrong clue offered no second attempt or post-judgement Steal. |
| Reload | The −100 score, disabled tile and next team survived reload without another deduction. |
| Undo | One Undo reopened the original clue with The Bootleggers selected. Closing it showed all scores at zero, progress 0/30 and the tile playable again. |
| Double Up / First Letter | Declaring both before judging changed the stakes to ±200, revealed `M`, and disabled those used controls. |
| Steal | Steal selected Champagne Problems before judgement, reset the timer and cleared the previous team's doubled stake to ±100. |
| Correct after Steal | Correct gave Champagne Problems +100 and retired the tile. The next primary turn remained Champagne Problems, following the original choosing-team order. |
| English / Norwegian help | Both languages say Correct and Wrong take the tile immediately and move the turn to the next team. Tokens must be used before judging or revealing the answer. |
| Browser console | No captured errors or warnings. |
| TV layout | The original added turn/token rows made the page 897px tall. After compact flex sizing and a refreshed stylesheet URL, the parent QA tab verified a 720px page height at 1280×720: 44px title, 54px category header, approximately 45px tiles, all tiles and footer visible, and no page-level horizontal overflow. Wider banks retain horizontal scrolling. |

Evidence:

- [`wrong-retires-tile.jpg`](../artifacts/game-flow/wrong-retires-tile.jpg): −100, next team and disabled tile.
- [`undo-restores-tile.jpg`](../artifacts/game-flow/undo-restores-tile.jpg): zero scores, original turn and restored tile.
- [`steal-correct-turn-order.jpg`](../artifacts/game-flow/steal-correct-turn-order.jpg): +100 to the stealing team and original primary order.
- [`compact-board-1280x720.jpg`](../artifacts/game-flow/compact-board-1280x720.jpg): final compact layout with all 30 tiles, turn banner, scores, last answer and footer visible at 1280×720.

The earlier [`taken-ticket.jpg`](../artifacts/game-flow/taken-ticket.jpg) records an earlier 2 October build. Its automatic pass after Wrong has been superseded by immediate retirement; it is not evidence for the current Wrong rule.

## Existing safeguards and prior checks

The September browser pass exercised private JSON import/export, invalid import leaving the prior bank intact, revealed private-clue restoration, signed corrections and actual stale-tab conflict/reload. The helpers retain their automated coverage in this pass; those longer flows were not all repeated on 2 October.

A browser save is compared with the raw snapshot the tab last read/wrote. A newer save locks the older tab instead of overwriting scores. The timer pauses when the page hides; timeout does not score. Reduced-motion styling and default-off reactions remain; no new system-level reduced-motion test was run.

## Remaining work and limits

- Four Sara Archives slots require host-confirmed content. The recommended board is fully playable.
- Private preparation uses JSON; there is no visual clue editor, image packaging UI, named preset list or in-progress game export.
- Banks and scores live in one browser/device; there is no remote backup, multi-host synchronization or guest phone joining. Storage quota failures are reported visibly.
- Team renaming during play, curated timed heats, explicit tournament tiebreaks, sounds, wildcards, intermissions and finale video remain unimplemented. Tournament heat/final transitions reset scores and tokens; existing advancement includes ties.
- Physical TV, narrow mobile and final portrait-recognition rehearsals remain necessary. Wide category selections scroll horizontally.
- The sixteen-portrait catalogue has passed the bundled-image and selection tests. Final portrait recognition still needs rehearsal with the host.
