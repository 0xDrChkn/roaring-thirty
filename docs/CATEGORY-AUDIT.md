# Category audit and proposed party boards

Audited 2 October 2026 against every clue in `game/pack.js`, the portrait picker in `game/celebrity-faces.js`, the generated portrait notes, and the actual tournament allocator in `game/app.js`. No question wording or game behaviour was changed by this audit. Grades are editorial assessments for approximately 20–30 guests around age 30, not measured success rates.

**Finish the Lyric should leave the event lineup in its present form.** All five prompts are familiar chorus or title completions, including the 400 and 500 tiles. The best specified categories are **What’s That Country?** and **Famous Saras**. The strongest party formats are country pictures, Sara face blends, comic film plots, music recognition and 2000s nostalgia. Several good formats still have easy high-value questions.

## Current inventory and grading rules

- **22 categories, 110 slots, 106 playable clues, 21 complete categories.** The four drafts are `sa-200`–`sa-500`; a fifth finished answer must not be invented to complete that column.
- Each complete category has one five-clue set. A different heading or value does not make an already revealed question fresh.
- A read-back during the audit found **16 registered portraits and 16 portrait PNGs**: the original eleven plus Adele, Emma Watson, Margot Robbie, Jason Momoa and Chris Hemsworth. Parallel portrait work may grow this pool; count the exact registered entries before claiming a later total. Asset existence or picker integration alone does not establish tested recognition.
- Countries have five bundled outlines. Emoji Cinema uses rendered Unicode, not custom pictures. Name That Tune is text trivia; audio playback is not implemented or required by its written format.

Grades: **A** = clearly specified and ready apart from rehearsal; **B** = sound format with focused improvements; **C** = substantially weak, redundant or needs a rebuild; **D** = exclude from the settled event lineup. Dimension codes below are **clarity / progression / party appeal / media readiness / replay supply**. All standard categories score D for replay supply because they have no second authored set; this does not prevent a single use at this event. Portraits score B for potential supply, conditional on integration and recognition checks.

Open knowledge means recalling a name, place, term, year or explanation without being offered the answer choices. A two-option question remains a guessing question even when it is not literally yes/no. Four-option elimination also does not meet that stricter format.

## All 22 categories

| Category | Overall; dimensions | Open knowledge? | Decision | Evidence from actual clues and concrete improvement |
| --- | --- | --- | --- | --- |
| **What’s That Country?** (`countries`) | **A**; A/B/A/A/D | Yes | **Keep** | `geo-100` Italy through `geo-400` Iceland is a sensible visual range. `geo-500` explicitly requires **New Zealand and Wellington**, so there is no hidden two-part scoring rule. Accept country names in either language. Keep north up and outlines large; test Iceland versus other island guesses on the TV. |
| **Famous Saras** (`famous-saras`) | **A**; A/B/B/A/D | Yes | **Keep** | TV actor versus fictional character is explicit: `fs-200` specifies the television Buffy, `fs-400` asks for fictional Sarah Connor. `fs-300` accepts Bareilles; `fs-500` accepts Sjöström spelling variants. `fs-400` may be easier than `fs-300`; swap values after rehearsal. Five answers span TV, music, film and sport instead of five identical actor questions. |
| **The Birthday Girl** (`birthday-girl`) | **B**; A/C/A/B/B | Yes | **Keep; calibrate** | Five finished pictures, one clear task. `bg-100`–`bg-500` are ordered by host selection, not measured recognisability; the same five are used wherever that category appears. Marilyn and Rihanna may be easier than DiCaprio depending on likeness. Rehearse neutral face blends with a non-player; put instantly recognised faces lower and plausible difficult faces higher. A weak likeness should be replaced, not made a 500-point clue. Jennifer is already a rehearsal reserve; bearded new candidates have subtle resemblance according to their quality notes. |
| **Bad Movie Plots** (`movie-plots`) | **B**; A/C/A/A/D | Yes | **Keep; elevate 300–500** | Clear and funny, but `mp-300` directly describes a dinosaur park and gives 1993, and `mp-400` gives fish, forgetful companion and dentist. These are likely easy recognitions. `mp-500` is distinctive and fair because the task of planting an idea identifies Inception. Retain accessible 100–200; rewrite higher tiles with fewer obvious nouns while preserving one defensible answer. |
| **Name That Tune** (`name-that-tune`) | **B**; A/C/A/A/D | Yes | **Keep; elevate** | Better than Lyric because teams identify songs from descriptions, videos or a backstory. `nt-200` nearly translates Dancing Queen’s title, `nt-300` identifies Britney’s debut plus the school corridor, and Norwegian guests will often get `nt-400` Take On Me quickly. `nt-500` uses a more interesting Kahlo connection. Reorder or rebuild 300–500, and make the host introduction clear that this is song trivia rather than promised audio. |
| **Throwback 2000s** (`throwback-2000s`) | **B**; A/C/A/A/D | Yes | **Keep; elevate** | Good age fit and mixed domains: High School Musical, The Simple Life, DS, Razr, Kurt Nilsen. `tb-500` may be much easier than `tb-400` for Norwegians. The Razr prompt itself hints at the answer through “razor-thin”. Replace that giveaway and raise the last two prompts to inference or a less obvious but widely shared detail. |
| **Cocktail Hour** (`cocktail-hour`) | **B**; A/C/A/A/D | Yes | **Keep; elevate** | Strong setting fit. `ch-300` Bond’s martini phrase is often easier than `ch-200`; `ch-500` gives ingredients plus the borough connection, making Manhattan straightforward. Move Bond lower or replace it. Make 400–500 require a cocktail from a distinctive ingredient combination without a title hint; avoid obscure brand names. |
| **Typically Norwegian** (`norway-knows`) | **B**; B/C/B/A/D | Yes | **Keep; correct/elevate** | `no-100`–`no-200` are fair easy anchors. `no-400` explicitly names Amundsen and December 1911, making South Pole easy. `no-500` is genuinely harder but its patent year is imprecise: application/priority was 1925, grant 1926. Rewrite that event wording. Balance 300–500 so newer residents can contribute, rather than adding obscure bureaucracy. |
| **Wild Facts** (`wild-facts`) | **B**; A/C/A/A/D | Yes | **Keep; elevate 500** | Blue whale, bats, three octopus hearts and koala fingerprints offer accessible surprise. `wf-500` food making flamingos pink is often easier than `wf-400` koala. Accept diet/pigments as sufficient, not necessarily the technical word carotenoids. Reorder or replace 500 with a comparably memorable harder open question. |
| **Science + Tech** (`science-tech`) | **B**; A/C/B/A/D | Yes | **Keep; elevate/reorder** | Clear open answers and bilingual CO₂ variants. Mars, CO₂ and Au are basic; `st-400` full CPU expansion may be harder than `st-500` defining a light-year. Keep the latter’s requirement of light travelling for a year; “distance” alone is incomplete. Accept a translated equivalent consistently or tighten the clue if exact expansion is intended. Better high-value everyday inference would improve party appeal. |
| **The Roaring Twenties** (`twenties`) | **B**; A/B/A/A/D | **No: 2/5 offer choices** | **Keep theme; elevate two prompts** | Venue/birthday-theme fit is excellent. `rt-100` explicitly offers Charleston/Macarena/moonwalk; `rt-500` offers three years. Remove those choices and make 500 a fair historical question with context. Speakeasy, talkies and Fitzgerald are varied open answers. Keep the 1926 referendum/1927 formal repeal distinction accurate. |
| **Hold My Drink** (`party-science`) | **B**; A/B/A/A/D | **No: 2/5 offer choices** | **Elevate; use as first reserve** | CO₂, condensation and Magnus effect are good name-the-thing prompts. `ps-300` offers rise/fall/stay, `ps-400` warm/cold. Change 300 to “Explain why melting floating ice leaves the water level unchanged”; ask 400 for the gas or physical reason, without printing options. Do not make a yes/no guess count as an explanation. Avoid pairing too many CO₂ clues on one board. |
| **Time Machine** (`timeline`) | **B**; A/B/B/A/D | Yes | **Reserve; choose this OR Guess the Year** | `ba-100` specifies iPhone unveiling, `ba-300` specifies PlayStation in Japan, `ba-500` specifies Google incorporation. These boundaries prevent date disputes. Exact years become harder at SMS/Google. Its format duplicates Guess the Year; one chronology category is enough for a short event. `ba-200` would reveal Titanic’s year if used before a fresh film clue that asks that year. |
| **Guess the Year** (`guess-the-year`) | **C**; B/C/B/A/D | Yes | **Reserve; merge into Time Machine pool later** | Berlin Wall, euro cash, UK Harry Potter publication, Harvard Facebook and second Norway EU vote are defensible events. Difficulty depends strongly on guest background; `gy-500` 1994 may be easy locally. Description says exact year but leaves near misses to the host. Choose an exact-year policy before play; do not improvise different tolerance per team. Duplicate chronology format offers little variety. |
| **Around the Table** (`around-the-table`) | **C**; A/D/B/A/D | Yes | **Elevate; reserve until 400–500 are stronger** | Avocado, Spain, tiramisu, chickpeas, saffron is a flat sequence for adult diners. `at-400` hummus ingredient is easier than `at-300` dessert etymology; `at-500` adds hand-picked crocus and price hints. Keep 100–200 and replace/reorder high values with less over-signalled food knowledge. |
| **Brand New** (`brand-new`) | **C**; A/C/B/A/D | Yes | **Elevate or reserve** | `br-100` apple logo → Apple is almost self-answering; Nike swoosh and Audi rings are also basic. LEGO translation is especially obvious to Norwegian speakers. IKEA founder is a reasonable harder name. Either write interesting brand-origin clues or prepare cropped real logo details; there are currently no logo-image clues, so do not promise a finished visual logo round. |
| **Emoji Cinema** (`emoji-cinema`) | **C**; B/C/B/B/D | Yes | **Remove from main lineup; optional warm-up** | First four are immediate recognitions and duplicate the better film format. `em-200` fits Frozen’s franchise, not uniquely the first film; accept franchise-level answers or add a distinctive clue. `em-500` corn/space/hole/time could fit multiple space-film interpretations without the host’s intended connection. Define accepted titles and verify emoji display on the TV. |
| **Famous Duos** (`famous-duos`) | **C**; B/D/C/A/D | Yes | **Remove from main lineup; rebuild only if wanted** | Bert/Ernie, Batman/Robin, Simon/Garfunkel are free associations; `fd-400` Laurel/Hardy switches the task to surnames; `fd-500` suddenly requires two ice-cream founders’ obscure surnames. That is a cliff, not a difficulty curve. The Norwegian `fd-100` references Sesamstasjon rather than the US programme named in English; check/localise the programme instead of implying equivalent casts. |
| **The Impostor** (`the-impostor`) | **C**; A/B/B/A/D | **No: all 5 list choices** | **Remove under the open-knowledge rule** | Bond actor, capital, Nobel category, coastline and Champagne grapes have stated rules and defensible answers. But every question shows four candidates and permits elimination/25% guessing. A future version can require identifying the exception **and explaining the rule**, if the host explicitly wants that format; it is still an offered-choice format. |
| **Game On** (`game-on`) | **D**; B/D/C/A/D | Yes | **Remove or rebuild** | Football team size and slam dunk fit 100-level warm-up. `go-400` asks which sport Marit Bjørgen competes in; `go-500` asks standard table-tennis score, an especially easy clue linked to Sara’s sport. Neither earns its value. `go-100` should say maximum/starting players, since teams may legally play with fewer. Rebuild around moments, tactics or meaningful sport facts, not obvious sport names. |
| **Finish the Lyric** (`finish-the-lyric`) | **D**; B/D/B/A/D | Yes, but trivial recall | **Remove now; rebuild if it survives a rehearsal** | `fl-100`–`fl-400` mostly give a performer plus a globally familiar refrain whose missing ending is the title. `fl-500` is another famous opening fragment; no real step-up. `fl-200` splices non-adjacent fragments rather than specifying a precise lyric cut. Merely replacing the songs with obscure tracks would be unfair rather than stronger. See rebuild spec below. |
| **The Sara Archives** (`sara-archives`) | **D for readiness**; B/D/A/C/D | Only 1 finished | **Reserve until host-confirmed** | `sa-100` is the finished table-tennis photo; 200–500 are instructions to author missing material. Strong birthday potential, but not a current five-clue round. Its sport answer overlaps the table-tennis references elsewhere. Make stories inferable for newer friends, with confirmed names/locations/endings and clear accepted variants. |

## Finish the Lyric versus Name That Tune

Keep **Name That Tune** as the one settled music category. It asks for more than the last word of an announced title and already has usable original paraphrases without recordings. Replace its easy high-value clues before adding a second music format.

If Lyric is rebuilt later, its written specification should require:

1. A precise cut immediately before an answer of several words, including words beyond the song title. No spliced fragments or performer hints at higher values.
2. Familiar songs across several decades and genres. Increase the missing span/inference, not merely the obscurity of the song.
3. Two easy entrance clues, one medium memory challenge and two harder but recognisable completions. A full next line at 400–500 is a possible direction, subject to the host having suitable material and exact verification.
4. Exact minimum words and accepted harmless contraction/pronunciation variants in host notes. Decide before the party whether an approximately correct sung answer earns points.
5. A TV rehearsal without playing the answer track, including the First Letter token. Audio would need a separate implemented playback workflow; it does not exist now.

This audit deliberately does not reproduce extended lyrics or author replacement copyrighted lines. The format can be strengthened using short prompts and host-provided verified material; changes are future work.

## Settle boards by number of games

For 20–30 people, use teams of three or four: usually six to eight teams. **Two heats and a final = three games** is the recommended default. More guests do not automatically require more games; eight teams can play four per heat.

Use distinct categories once across the event to obtain fresh questions from the existing bank. Repeating the best category titles across stages would require newly authored questions/images. The boards below avoid exact clue repetition and keep the birthday picture surprise for the final.

### Recommended: three games, 55 prepared questions

| Game | Categories | Prepared bank | Time and selection cap |
| --- | --- | ---: | --- |
| Heat A | **What’s That Country? · Throwback 2000s · Cocktail Hour · Wild Facts** | 20 | 20 minutes; 18 selections for three teams or 20 for four teams. |
| Heat B | **Bad Movie Plots · Name That Tune · Typically Norwegian · Science + Tech** | 20 | Same rules and time as Heat A. |
| Final | **The Birthday Girl · Famous Saras · The Roaring Twenties** | 15 | 15 minutes; twelve primary selections, six per finalist, then a fresh tiebreak if needed. |

Total: **11 distinct complete categories × five = 55 prepared clues**, all present today. Expect approximately 65 minutes including instructions and transitions. Having fifteen final tiles does not promise that all fifteen are played; twelve gives both finalists equal primary turns and leaves room for the host and a tiebreak. Unplayed pictures can be audience reveals after official play.

Before settling these as party-ready: correct `no-500`, convert `rt-100` and `rt-500` to open questions, strengthen the easiest high-value tiles and rehearse the faces. No entirely new five-clue set is needed for these three boards, although individual replacements are recommended.

Heat scores must not be compared across the two different boards. Each heat supplies exactly one winner under the proposed event rules. The current implementation lets tied winners advance; the one-winner tiebreak remains to implement or handle explicitly as a host procedure.

### Four games: three heats and a final, 75 prepared questions

Keep Heat A, Heat B and the three-category final above. Add:

| Game | Categories | Prepared bank | Content gate |
| --- | --- | ---: | --- |
| Heat C | **Around the Table · Brand New · Time Machine · Hold My Drink** | 20 | Elevate food and brands; convert `ps-300`/`ps-400` to open prompts. Use Time Machine alone, without Guess the Year. |

Total: **15 distinct complete categories = 75 prepared clues**. Three 20-minute heats and a 15-minute final need about **85 minutes** with ten minutes of instructions/changeovers; allow more if transitions or tie decisions are slow. Three finalists can receive four primary selections each in a twelve-selection final. Six to eight teams split across three heats unevenly, usually two/three per heat; use the same per-team opportunity policy. Two-team heats can cap at eighteen selections, nine each; three-team heats at eighteen, six each. This option needs more repair work and takes longer, so use it for a deliberate longer programme or substantially more teams, not as the default for 20–30 people.

### One game, if the event is shortened

Use **The Birthday Girl · What’s That Country? · Bad Movie Plots · Name That Tune**, twenty prepared clues. Add **Throwback 2000s** and **Typically Norwegian** only for a longer thirty-clue board. The current one-game UI supports at most six teams; seven or eight teams require combining into six teams or using the tournament format.

## Content gate versus implementation gate

The current tournament shuffles all complete categories. It does **not** apply this quality shortlist or allow these curated allocations. It assigns four categories to each two/three-heat stage and **six categories (30 tiles) to the final**, not three. The current manual End Round control can stop play, but it does not impose equal-turn caps or a round countdown. Do not present the curated table as already selected inside the game.

Implement stage-specific category selection and a three-category final, or run separately prepared one-game boards as a host workaround. A stage-specific portrait selection system is also needed before the same face-category heading can mean fresh faces across several games. A larger pool does not automatically create three separately calibrated five-face boards; the current category still contains five selected portraits for the whole game session.

There is enough unique **quantity** for the recommended three games now. The remaining work is quality, explicit format and tournament selection. The rejected categories should be excluded from the event selection, while keeping them available as rebuild ideas; deleting bank entries is not needed to make that decision concrete.

## Factual checks and source boundaries

Detailed primary-source results are saved in `artifacts/category-audit-fact-checks.md`. The science/history checks support existing answers rather than proving their entertainment value.

- `no-500`: [Norwegian Industrial Property Office: 100 years of the cheese slicer](https://www.patentstyret.no/kundehistorier/ostehovel-i-100-ar) distinguishes priority in 1925 from the grant in 1926. Replace “patented in 1925” with the specific application or invention wording.
- `wf-100`: [NOAA Fisheries: blue whale](https://www.fisheries.noaa.gov/species/blue-whale) supports the largest-animal answer. Keep “known” and do not imply every prehistoric mass estimate is settled.
- `ps-400`: [American Chemical Society research paper on Champagne pouring](https://www.acs.org/content/dam/acsorg/avweb/1c2web3536/champagnepouring.pdf) supports chilled sparkling wine retaining more dissolved CO₂ under the study’s pouring conditions. “Generally” is an appropriate qualifier.
- `rt-500`: the [Norwegian Institute of Public Health historical overview](https://www.fhi.no/le/alkohol/alkoholinorge/alkohol-i-historien/historisk-oversikt-alkohol-i-norge-1816-2019/) distinguishes the 1926 vote and formal 1927 repeal, and the earlier fortified-wine change. The answer is sound; offered choices are the format weakness.

Earlier `GAME-CATEGORIES.md`, `GAME-CONTENT.md` and the first inventory paragraph of `PARTY-GAME-PLAN.md` contain September or pre-image-update counts. This audit’s source count is 106 ready clues. Those historical notes do not override the current executable bank.
