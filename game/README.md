# The Sara quiz

A host-controlled game for one laptop connected to a television. Open [the game](https://0xdrchkn.github.io/roaring-thirty/game/).

1. Enter 2–6 team names and choose a timer duration: 15, 30, 45, 60, 90 or 120 seconds.
2. Choose **One game** (2–6 teams, pick any available categories; **Use recommended six** gives a complete 30-question board) or **Tournament** (4–12 teams, 2–4 heats). A tournament shuffles teams into heats, gives each heat its own four-category board, and sends every heat winner (ties included) to a six-category final. **End this round** finishes a heat early on the current scores. The final's winner card shows the optional prize.
3. The first team starts. Open a tile: its team is selected and the timer starts automatically. Timeout never changes scores.
4. **Correct** awards the clue value; **Wrong** deducts it. Either judgement immediately takes the tile and advances the primary turn in the original team order. A judged tile cannot be reopened or scored again unless the host undoes that judgement.
5. **Skip clue** retires a tile without awarding points. Closing an unfinished clue keeps its used tokens. Each team has one **Double Up**, **First Letter** and **Steal** per round; Double Up doubles that team’s gain or loss, First Letter reveals the meaningful initial, and Steal passes to the next eligible team without changing the primary turn order. Declare tokens before judging or revealing the answer; a judged clue is already retired. Tokens reset when a new heat or final starts.
6. **Undo** reverses the most recent score or token decision, including the taken tile and turn advance after judging a clue. Earlier token declarations can be undone separately. **Adjust scores** accepts a positive or negative correction and a required reason; corrections use the same undo history.

Reactions use only the two selected stickers: pink sweater for correct and sceptical face for wrong. Each result uses a frameless cutout with a gold/red glow and one of three entrance effects. Continue or Escape dismisses the 2.6-second overlay. Reactions can be switched off and default off under reduced motion. Sound is not implemented.

English/Norwegian changes the interface and clues. The recommended six-column board fits a 1280×720 landscape browser, including the turn banner and tokens. Wider selections and small phones scroll horizontally to keep columns legible. Rehearse on your actual TV before the party.

## Question bank

**22 categories, 110 slots, 106 ready clues.** The recommended six are The Birthday Girl, What’s That Country?, Bad Movie Plots, Name That Tune, Science + Tech and Typically Norwegian. Choose any 1–40 categories for testing; **Select all ready** includes the complete categories and the wider board scrolls horizontally. The celebrity round has five ready portraits, with sixteen blends in the host picker. The other general categories: Guess the Year, Throwback 2000s, Famous Duos, Wild Facts, Around the Table, Game On, Brand New, Famous Saras, What's That Country?, The Roaring Twenties, Name That Tune, Time Machine, Hold My Drink and The Impostor. The Sara Archives remains unfinished and is left out of tournaments.

The Birthday Girl has five ready face clues: DiCaprio, Ramsay, Marilyn Monroe, Rihanna and Gosling. Expand **Choose Sara’s celebrity faces** to pick five of sixteen blends; checkbox order sets 100–500 points. The alternatives include Brad Pitt, Angelina Jolie, Dwayne Johnson, Beyoncé, Tom Cruise, Jennifer Aniston, Adele, Emma Watson, Margot Robbie, Jason Momoa and Chris Hemsworth. Jennifer is marked for rehearsal because the resemblance is weaker. The Sara Archives has one ready clue and four **To prepare** slots; those need host-confirmed personal questions. These drafts cannot open and do not block finishing a game. Personal stories or answers have not been invented.

Geography uses five bundled country outlines. Name That Tune uses text clues; no recording is needed. See [category formats](../docs/GAME-CATEGORIES.md) and [content sources](../docs/GAME-CONTENT.md).

## Prepare a private pack

At setup, expand **Prepare a private question pack**:

1. **Download question bank** saves a JSON copy with the full bank, bilingual questions and answers.
2. Edit that copy locally. Keep 6–40 uniquely identified categories, five clues in each with values 100, 200, 300, 400 and 500. Keep six valid `defaultCategoryIds`.
3. Add a verified answer and remove `draft: true` when a personal clue is ready. Plain strings or `{ "en": "…", "nb": "…" }` are accepted; a single supplied language is used as fallback in both interfaces.
4. Private images can be embedded as PNG, JPEG or WebP `data:` URLs in `image` or `answerImage`. Total JSON must be at most 2 MB. Existing bundled picture paths work; arbitrary external URLs, filesystem paths and SVG uploads are rejected.
5. **Import private JSON** validates everything before replacing the current bank. Choose your categories and start. Invalid files leave your previous bank intact.

Optional clue fields include `acceptedAnswers` (array of strings or bilingual text), `explanation`, `hostNote`, `hint`, `imageAlt` and `answerImage`. Accepted answers, explanation, host note and answer image appear only after revealing the answer; `hint` is reserved for future controls. Keep image descriptions neutral so they do not give away the answer.

The private bank stays in this browser and can be downloaded again. It is not uploaded to the invitation, Tally or GitHub. Keep your JSON backup on the host laptop. Browser storage limits can prevent saving a large pack; the game reports that explicitly. This is a JSON preparation workflow, **not an in-app visual question editor**.

Only the chosen two reaction images are used, including with an imported pack. Use **New game** before loading another bank. **Use public question bank** returns setup to the bundled bank.

## Saving and reuse

Scores, selected categories, imported bank, language and timer duration save on this browser/device. Reload restores the current clue and a paused timer. They are not shared with guests or backed up remotely. New game clears the current scores only after confirmation. If another tab changes the save, the older tab stops and offers reload rather than overwriting it. Use one host tab.

The content fingerprint rejects an old game if its selected clues change. Changes to unselected categories do not invalidate the active game. For reuse, import another JSON bank; branding and the two Sara reaction images remain in this version. A fuller event editor, live team renaming, curated timed heats, tournament tiebreaks, sounds, intermissions and finale video remain future work.

The public bank is a rehearsal pack and its answers are public source. Keep final guest stories and secret personal clues in your private JSON, outside the repository.

## Implementation and checks

- `pack.js`: public category bank and fixed reaction paths.
- `pack-tools.js`: bounded JSON import/export; only supported text/media fields are accepted.
- `engine.js`: selected categories, scores, corrections, completion, undo and validated event replay.
- `app.js`: preparation, browser UI and timer.
- `session-store.js`: stale-tab save protection.
- `game.css`: black/gold layout and reduced-motion handling.

```sh
node --test tests/game-engine.cjs tests/session-store.cjs tests/game-pack.cjs tests/celebrity-faces.cjs
node --check game/app.js
node --check game/pack-tools.js
node --check game/pack.js
```

See the [specification and reference comparison](../docs/GAME-SPEC.md) and [verification evidence](../docs/GAME-QA.md).

## Party format recommendation

For 20–30 guests, use teams of three or four and two 20-minute heats followed by a 15-minute final, approximately 65 minutes including transitions. The proposed equal-turn caps and one-winner tiebreak flow are documented in [PARTY-GAME-PLAN.md](../docs/PARTY-GAME-PLAN.md); those enhancements are not yet implemented in the existing tournament controls. True/False and Before/After have been replaced with open knowledge questions.
