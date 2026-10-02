# The Sara quiz

A host-controlled game for one laptop connected to a television. Open [the game](https://0xdrchkn.github.io/roaring-thirty/game/).

1. Enter 2–6 team names and choose a timer duration: 15, 30, 45, 60, 90 or 120 seconds.
2. Choose **One game** (2–6 teams, pick six categories; **Use recommended six** gives a complete 30-question board) or **Tournament** (4–12 teams, 2–4 heats). A tournament shuffles teams into heats, gives each heat its own four-category board, and sends every heat winner (ties included) to a six-category final. **End this round** finishes a heat early on the current scores. The final's winner card shows the optional prize.
3. Choose an answering team, open a tile and start the optional timer when everyone is ready. Timeout never changes scores.
4. **Correct** awards the clue value; **Wrong** deducts it. A different team can try after a wrong answer. A correct answer reveals the answer automatically.
5. **Finish clue** marks the tile as played. Closing an unfinished clue keeps its attempts and scores so you can return later.
6. **Undo** reverses the most recent score decision, including after finishing a clue. **Adjust scores** accepts a positive or negative correction and a required reason; corrections use the same undo history.

Reactions use only the two selected stickers: pink sweater for correct and sceptical face for wrong. Each result uses a frameless cutout with a gold/red glow and one of three entrance effects. Continue or Escape dismisses the 2.6-second overlay. Reactions can be switched off and default off under reduced motion. Sound is not implemented.

English/Norwegian changes the interface and clues. The board fits a 1280×720 landscape browser; on small phones it scrolls horizontally to keep six columns legible. Rehearse on your actual TV before the party.

## Question bank

**22 categories, 110 slots, 102 ready clues.** The recommended six are Cocktail Hour, Emoji Cinema, Finish the Lyric, True or False?, Typically Norwegian and Bad Movie Plots. The other general categories: Guess the Year, Throwback 2000s, Famous Duos, Wild Facts, Around the Table, Game On, Brand New, Famous Saras, What's That Country?, The Roaring Twenties, Name That Tune, Before or After?, Hold My Drink and The Impostor. The Birthday Girl and The Sara Archives are personal drafts and are left out of tournaments until complete.

The Birthday Girl and Sara Archives each have one ready clue and four **To prepare** slots. The host still needs to supply four verified celebrity mashups and four personal questions. These drafts cannot open and do not block finishing a game. Personal stories or answers have not been invented.

Geography uses five bundled country outlines. Name That Tune uses text clues; no recording is needed. See [category formats](../docs/GAME-CATEGORIES.md) and [content sources](../docs/GAME-CONTENT.md).

## Prepare a private pack

At setup, expand **Prepare a private question pack**:

1. **Download question bank** saves a JSON copy with the full bank, bilingual questions and answers.
2. Edit that copy locally. Keep 6–40 uniquely identified categories, five clues in each with values 100, 200, 300, 400 and 500. Keep six valid `defaultCategoryIds`.
3. Add a verified answer and remove `draft: true` when a personal clue is ready. Plain strings or `{ "en": "…", "nb": "…" }` are accepted; a single supplied language is used as fallback in both interfaces.
4. Private images can be embedded as PNG, JPEG or WebP `data:` URLs in `image` or `answerImage`. Total JSON must be at most 2 MB. Existing bundled picture paths work; arbitrary external URLs, filesystem paths and SVG uploads are rejected.
5. **Import private JSON** validates everything before replacing the current bank. Choose six categories and start. Invalid files leave your previous bank intact.

Optional clue fields include `acceptedAnswers` (array of strings or bilingual text), `explanation`, `hostNote`, `hint`, `imageAlt` and `answerImage`. Accepted answers, explanation, host note and answer image appear only after revealing the answer; `hint` is reserved for future controls. Keep image descriptions neutral so they do not give away the answer.

The private bank stays in this browser and can be downloaded again. It is not uploaded to the invitation, Tally or GitHub. Keep your JSON backup on the host laptop. Browser storage limits can prevent saving a large pack; the game reports that explicitly. This is a JSON preparation workflow, **not an in-app visual question editor**.

Only the chosen two reaction images are used, including with an imported pack. Use **New game** before loading another bank. **Use public question bank** returns setup to the bundled bank.

## Saving and reuse

Scores, selected categories, imported bank, language and timer duration save on this browser/device. Reload restores the current clue and a paused timer. They are not shared with guests or backed up remotely. New game clears the current scores only after confirmation. If another tab changes the save, the older tab stops and offers reload rather than overwriting it. Use one host tab.

The content fingerprint rejects an old game if its selected clues change. Changes to unselected categories do not invalidate the active game. For reuse, import another JSON bank; branding and the two Sara reaction images remain in this version. A fuller event editor, live team renaming, choosing-team tracking, tokens, sounds, intermissions and finale video remain future work.

The public bank is a rehearsal pack and its answers are public source. Keep final guest stories and secret personal clues in your private JSON, outside the repository.

## Implementation and checks

- `pack.js`: public category bank and fixed reaction paths.
- `pack-tools.js`: bounded JSON import/export; only supported text/media fields are accepted.
- `engine.js`: selected categories, scores, corrections, completion, undo and validated event replay.
- `app.js`: preparation, browser UI and timer.
- `session-store.js`: stale-tab save protection.
- `game.css`: black/gold layout and reduced-motion handling.

```sh
node --test tests/game-engine.cjs tests/session-store.cjs tests/game-pack.cjs
node --check game/app.js
node --check game/pack-tools.js
node --check game/pack.js
```

See the [specification and reference comparison](../docs/GAME-SPEC.md) and [verification evidence](../docs/GAME-QA.md).
