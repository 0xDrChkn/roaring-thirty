# Started Somewhere Else — content verification

Implemented 2 October 2026 in `game/pack.js`. Replaces **Brand New**, retaining `brand-new` and `br-100`–`br-500` so saved category selections remain compatible. All five clues have English and Norwegian Bokmål text and verified answers; no draft slots.

| Value | Answer | Origin used | Primary evidence |
|---|---|---|---|
| 100 | Nintendo | Hanafuda playing cards, Kyoto, 1889. | [Nintendo company history](https://www.nintendo.co.jp/corporate/en/history/index.html), 1889 entry. |
| 200 | Lamborghini | The founder converted military vehicles into tractors before the sports-car business formed in 1963. | [Lamborghini history](https://www.lamborghini.com/en-en/history), “From the beginning.” |
| 300 | Michelin | The free motoring guide supported more travel and tyre sales, with maps, repair advice and accommodation. | [Michelin Guide origins](https://guide.michelin.com/en/about-us), “A grand vision”; 1900 is the guide's beginning. |
| 400 | Nokia | Fredrik Idestam's Finnish wood-pulp mill, 1865. | [Nokia history](https://www.nokia.com/fi_fi/about-us/company/historiamme/), “Tapahtumarikas menneisyys.” |
| 500 | Post-it notes | Reusable adhesive became a solution for choir-book markers that fell out. | [Post-it official history](https://www.post-it.com/3M/en_US/post-it/contact-us/about-us/), Spencer Silver and Art Fry sections. |

Sources checked on 2 October 2026. Questions paraphrase the histories; no source prose is reproduced verbatim.

Difficulty is a design estimate, pending a guest rehearsal. The 100 includes Mario as an entrance hint. Higher clues omit the bull logo, Michelin restaurant stars, Nokia mobile phones, and the 3M name. Every prompt explicitly requests a company, car brand or office product. Host answer text accepts Lamborghini/Lambo and equivalent sticky-note descriptions; manufacturer “3M” alone does not answer the product question.

The Post-it clue describes the demonstrated removable adhesive and subsequent use. It avoids unsupported claims that the product was simply a failed invention, and avoids disputed exact invention dates.

Validation: `node --check game/pack.js` and all seven `tests/game-pack.cjs` tests passed. A Node VM check also verified the five ready bilingual clues, preserved IDs and values, accepted-answer import normalization, a complete category playthrough, and serialized game restoration.
