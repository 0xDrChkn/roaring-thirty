# Sara's birthday game — specification and reference comparison

Updated 2 October 2026. The host plays from one laptop connected to a TV. Teams answer aloud; the host operates the mouse, timer and scores. No phone joining or game backend is needed.

## Current game — 2 October 2026

The public bank has 22 categories and 110 slots. Recommended categories: The Birthday Girl, Where Are We?, Bad Movie Plots, Name That Tune, Science + Tech and Typically Norwegian. True/False has been replaced by Science + Tech; Before/After is now Time Machine with open year questions. Select any 1–40 categories for testing; wide boards scroll horizontally. Draft image/personal clues stay locked.

Where Are We? uses five licensed, locally served real location photographs at fixed viewpoints. Teams name only the country. The 500-point clue supplies a South America hint. These are curated drops repeated on new games, without navigation or random worldwide selection. The game footer links to photographer/licence credits, with answer-bearing location/source details collapsed.

Teams play in entry order. Opening a clue selects the active team and starts its timer. Correct awards points; Wrong deducts points. Either judgement immediately takes the tile and advances the primary turn. A wrong answer does not leave the clue available for another attempt. A steal never changes the primary turn sequence. A completed tile is grey, checked and disabled; the last answer remains visible on the board.

Each team has one Double Up, First Letter and Steal per round. Double Up doubles that team's gain or loss, First Letter reveals the meaningful initial, and Steal passes to the next eligible team with its own unused Steal token. Tokens are declared before judging or revealing the answer. Steal is available only while the clue is still open; a judged clue has already been retired. Undo reverses score/token decisions, including completion and turn navigation. Reload replays scores, turn order and tokens, restoring the timer paused. Existing score correction, private JSON and stale-tab protection remain available.

Tournament heats/final each start fresh scores and tokens. See [PARTY-GAME-PLAN.md](PARTY-GAME-PLAN.md) for the proposed two-heat format, small teams, equal-turn budgets and explicit tiebreaks. The existing tournament still shuffles category banks and advances ties; the report labels the improvements that remain to implement.

The host can select five of sixteen celebrity blends, with selection order setting 100–500 points. Face clues follow the host's latest reference: blend Sara's central facial features into the celebrity's facial structure in a neutral portrait, without recognizable outfits, props or scenery. The earlier Gatsby scene remains a separate warm-up; new face clues must not disclose the name in their image alt text.

## Sara reactions

Only the two selected images are used:

| Result | Source | Game asset |
| --- | --- | --- |
| Correct | Pink-sweater pose (`sticker5.webp`) | `reaction-02.webp` |
| Wrong | Sceptical face (`sticker3.webp`) | `reaction-06.webp` |

They appear as frameless cutouts with a warm gold correct glow or muted red wrong glow. Each outcome rotates among three CSS entrance effects; the image itself stays fixed. A result displays the team and signed points and closes after 2.6 seconds or Continue/Escape. Scoring commits before the effect. Reactions are optional and default off for reduced-motion users. There is no sound playback yet.

## Private preparation and reuse

The public pack is a rehearsal bank: its answers are visible in public source code. Do not commit private guest stories, photos or secret final questions to this repository.

Setup's **Prepare a private question pack** lets the host download JSON, edit it locally and import it again. The imported bank stays in browser storage and exported local files; nothing is sent to a server. A game must be reset before replacing its bank. The two fixed Sara reactions remain regardless of import contents.

Import constraints: 6–40 categories with unique IDs; five uniquely identified clues per category with values 100–500 in order; six valid default category IDs; up to 2 MB total. Text may be a string or `{en, nb}`; either supplied language fills an absent translation. Required question/answer fields must be present unless an answer is explicitly a draft. Supported optional fields are `image`, `imageAlt`, `answerImage`, `acceptedAnswers`, `explanation`, `hostNote` and reserved `hint`.

Private media is embedded PNG/JPEG/WebP data URLs. Already bundled picture paths are allowed, including trusted country SVGs. Arbitrary external URLs, local filesystem paths and uploaded SVGs are rejected. Imported strings render as text. The file is validated before it replaces the previous bank; malformed data cannot silently replace a working selection.

This is a JSON preparation path, not yet a visual clue editor. Keep the JSON backup outside the browser. Scores and private banks are local to one browser/device; there is no cloud sync or game-session export. Clearing browser storage loses that local copy. Changing selected clue content invalidates an older game; changes to unselected categories do not.

## What the Lovable example has, and our integration

The [Bright Play Show reference](https://bright-play-show.lovable.app/) and its admin editor were inspected on 19 and 22 September 2026. The reviewer opened/cancelled a clue and inspected Presets, Display, Sounds, Wildcards, Jokers, Teams and Categories without saving settings, answers or scores. Token and finale semantics were observed as controls, not executed end to end.

| Observed reference feature | Sara game now | Next decision |
| --- | --- | --- |
| Category editor: text, picture, answers, upload/URL, add/reorder | 22-category bank; choose any available categories; private JSON import/export | Add a visual preparation editor with local media packaging. |
| Named presets with teams/settings/content | Recommended six and replaceable private JSON bank | Save named local presets; add whole-game backup if useful. |
| Editable teams, host turn selector, standalone ±100 | Setup names, answering team, arbitrary signed score correction with reason/undo | Team rename and separate choosing-team state remain missing. |
| Configurable timer; auto-start; multiple timer styles | 15–120 seconds; starts when a clue opens; host pause/reset | Extra timer styles are optional. |
| Correct/wrong image and rotating entrance effects | Requested two fixed memes, frameless, six entrance effects total | Optional effect size preference later. |
| Correct/wrong sound pools and time-up clips | Silent | Optional local permitted clips, mute/volume and media-failure fallback. |
| DOUBLE UP, FIRST LETTER and STEAL tokens | One of each per team per round, with undo/reload | Judge either correct or wrong to retire the clue. |
| Joker pool with speed/reverse/shuffle pranks | None | Optional later; avoid disrupting the first rehearsal. |
| Scheduled wildcards/intermissions | None | Host-written surprises after completed clue counts, if wanted. |
| Finale video and winner/fireworks controls | Winner/tie panel | A skippable finale can follow reliable base gameplay. |
| Themes, text sizes, ambient settings | Black/gold TV layout, reduced-motion handling | Keep Gatsby style; test readability on the real TV. |

The reference's editor exposes more categories than its initial board. Our game shows the selected categories, with the full bank visible during preparation. The recommended six fit the TV; larger selections scroll horizontally. The reference is an interaction reference; it is not embedded or copied into the invitation.

## Scoring, tokens and choosing order

1. The primary turn follows team entry order. A Steal changes the answering team without changing the primary team whose turn advances after completion.
2. Both Correct and Wrong immediately retire the tile. Correct awards the value; Wrong deducts the value. A completed clue cannot be reopened or scored again unless the host undoes the judgement.
3. Double Up is declared before judging or revealing the answer, once per team per round: ±2× the clue value. A Steal clears the previous team's doubled stake; the stealing team's own token must be declared to double its attempt.
4. First Letter and Steal are also once per team per round and must be used before judging or revealing the answer.
5. Undo removes the score decision, clue completion and turn advance together. Earlier token declarations remain until separately undone. Scores, tokens and turns survive validated reload.

## Implementation boundaries

`engine.js` owns selected categories and the event history. Its replay recomputes scores instead of trusting saved totals. `app.js` owns preparation, timer and presentation. `pack-tools.js` validates local JSON and media references. `session-store.js` guards writes against another tab's newer snapshot.

Media and timer expiry must never award points. Imported content cannot replace the selected reaction pair. A final private pack should be previewed on the host laptop and actual TV, with local backups. The current controls are browser-tested at 1280×720; a physical TV rehearsal remains necessary.

See [GAME-QA.md](GAME-QA.md) for concrete verification. Guest RSVP/photo collection is separate from this local host game and is not established by game checks.
