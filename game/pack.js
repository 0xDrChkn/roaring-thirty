/* Public rehearsal pack. Keep private guest stories out of this file.
 * All text fields accept { en, nb }; image paths are relative to /game/.
 * Choose six categories from the bank. The default board is complete.
 * A draft clue is intentionally unavailable until its answer is verified.
 */
(() => {
  'use strict';
  const text = (en, nb = en) => ({ en, nb });
  const draft = (id, value, question, norwegian) => ({
    id, value, draft: true,
    question: text(question, norwegian),
    answer: text('Add a host-confirmed answer before playing.', 'Legg inn et svar bekreftet av verten før dere spiller.')
  });

  window.BIRTHDAY_GAME_PACK = {
    id: 'sara-rehearsal-v1',
    title: text('The Sara Show', 'Sara-showet'),
    subtitle: text('A roaring birthday quiz', 'En bursdagsquiz med stil'),
    defaultCategoryIds: ['cocktail-hour', 'emoji-cinema', 'finish-the-lyric', 'true-or-false', 'norway-knows', 'movie-plots'],
    categories: [
      {
        id: 'cocktail-hour',
        title: text('Cocktail Hour', 'Cocktailtimen'),
        description: text('We are at a cocktail bar, after all.', 'Vi er tross alt på en cocktailbar.'),
        clues: [
          { id: 'ch-100', value: 100, question: text('Which spirit is the base of a classic Margarita?', 'Hvilken brennevinstype er basen i en klassisk Margarita?'), answer: text('Tequila') },
          { id: 'ch-200', value: 200, question: text('Rum, lime, mint, sugar and soda water. Name this Cuban classic.', 'Rom, lime, mynte, sukker og soda. Hva heter denne cubanske klassikeren?'), answer: text('A Mojito', 'Mojito') },
          { id: 'ch-300', value: 300, question: text('How does James Bond famously like his martini?', 'Hvordan liker James Bond martinien sin?'), answer: text('Shaken, not stirred.', 'Ristet, ikke rørt.') },
          { id: 'ch-400', value: 400, question: text('Vodka, triple sec and lime. Which juice turns a Cosmopolitan pink?', 'Vodka, triple sec og lime. Hvilken juice gjør en Cosmopolitan rosa?'), answer: text('Cranberry juice', 'Tranebærjuice') },
          { id: 'ch-500', value: 500, question: text('Whiskey, sweet vermouth and bitters, named after a New York borough. Which cocktail?', 'Whisky, søt vermut og bitter, oppkalt etter en bydel i New York. Hvilken cocktail?'), answer: text('A Manhattan', 'Manhattan') }
        ]
      },
      {
        id: 'norway-knows',
        title: text('Typically Norwegian', 'Typisk norsk'),
        description: text('Fjords, polar heroes and one very useful kitchen tool.', 'Fjorder, polarhelter og ett svært nyttig kjøkkenredskap.'),
        clues: [
          { id: 'no-100', value: 100, question: text('On which date does Norway celebrate Constitution Day?', 'Hvilken dato feirer Norge grunnlovsdagen?'), answer: text('17 May', '17. mai') },
          { id: 'no-200', value: 200, question: text('Which Norwegian artist painted The Scream?', 'Hvilken norsk kunstner malte Skrik?'), answer: text('Edvard Munch') },
          { id: 'no-300', value: 300, question: text('What is the name of Norway’s longest fjord?', 'Hva heter Norges lengste fjord?'), answer: text('Sognefjorden (the Sognefjord)', 'Sognefjorden') },
          { id: 'no-400', value: 400, question: text('In December 1911, Roald Amundsen’s expedition was the first to reach which place?', 'I desember 1911 ble Roald Amundsens ekspedisjon de første som nådde hvilket sted?'), answer: text('The South Pole', 'Sydpolen') },
          { id: 'no-500', value: 500, question: text('This Norwegian carpenter patented the cheese slicer in 1925. Who was he?', 'Denne norske snekkeren patenterte ostehøvelen i 1925. Hvem var han?'), answer: text('Thor Bjørklund') }
        ]
      },
      {
        id: 'emoji-cinema',
        title: text('Emoji Cinema', 'Emoji-kino'),
        description: text('A whole film in a few small pictures.', 'En hel film i noen få små bilder.'),
        clues: [
          { id: 'em-100', value: 100, question: text('🦁 👑 🌅  Name the film.', '🦁 👑 🌅  Hvilken film?'), answer: text('The Lion King', 'Løvenes konge') },
          { id: 'em-200', value: 200, question: text('👸 ❄️ ⛄ 🏰  Name the film.', '👸 ❄️ ⛄ 🏰  Hvilken film?'), answer: text('Frozen', 'Frost') },
          { id: 'em-300', value: 300, question: text('👻 🚫 📞  Name the film.', '👻 🚫 📞  Hvilken film?'), answer: text('Ghostbusters') },
          { id: 'em-400', value: 400, question: text('🐀 👨‍🍳 🇫🇷  Name the film.', '🐀 👨‍🍳 🇫🇷  Hvilken film?'), answer: text('Ratatouille') },
          { id: 'em-500', value: 500, question: text('🌽 🚀 🕳️ ⏳  Name the film.', '🌽 🚀 🕳️ ⏳  Hvilken film?'), answer: text('Interstellar') }
        ]
      },
      {
        id: 'guess-the-year',
        title: text('Guess the Year', 'Hvilket år?'),
        description: text('Exact year for the points. The host decides on near misses.', 'Nøyaktig år gir poeng. Verten avgjør nesten-treff.'),
        clues: [
          { id: 'gy-100', value: 100, question: text('The Berlin Wall falls. Which year?', 'Berlinmuren faller. Hvilket år?'), answer: text('1989') },
          { id: 'gy-200', value: 200, question: text('Euro notes and coins go into everyday use. Which year?', 'Euroens sedler og mynter tas i bruk. Hvilket år?'), answer: text('2002') },
          { id: 'gy-300', value: 300, question: text('The first Harry Potter book is published in the UK. Which year?', 'Den første Harry Potter-boken kommer ut i Storbritannia. Hvilket år?'), answer: text('1997') },
          { id: 'gy-400', value: 400, question: text('Facebook launches for Harvard students. Which year?', 'Facebook lanseres for Harvard-studenter. Hvilket år?'), answer: text('2004') },
          { id: 'gy-500', value: 500, question: text('Norway votes no to joining the EU for the second time. Which year?', 'Norge stemmer nei til EU for andre gang. Hvilket år?'), answer: text('1994') }
        ]
      },
      {
        id: 'throwback-2000s',
        title: text('Throwback 2000s', '2000-tallet tilbake'),
        description: text('Flip phones, Disney musicals and Idol fever.', 'Klapptelefoner, Disney-musikaler og Idol-feber.'),
        clues: [
          { id: 'tb-100', value: 100, question: text('Troy and Gabriella sang their way through East High in which Disney Channel film?', 'Troy og Gabriella sang seg gjennom East High i hvilken Disney Channel-film?'), answer: text('High School Musical') },
          { id: 'tb-200', value: 200, question: text('Paris Hilton and Nicole Richie swapped luxury for farm life in which 2003 reality show?', 'Paris Hilton og Nicole Richie byttet luksus mot gårdsliv i hvilket realityprogram fra 2003?'), answer: text('The Simple Life') },
          { id: 'tb-300', value: 300, question: text('Nintendo’s 2004 handheld had two screens. What was it called?', 'Nintendos håndholdte konsoll fra 2004 hadde to skjermer. Hva het den?'), answer: text('The Nintendo DS', 'Nintendo DS') },
          { id: 'tb-400', value: 400, question: text('Which razor-thin Motorola flip phone was the must-have of the mid-2000s?', 'Hvilken tynn klapptelefon fra Motorola måtte alle ha midt på 2000-tallet?'), answer: text('The Motorola Razr (V3)', 'Motorola Razr (V3)') },
          { id: 'tb-500', value: 500, question: text('He won the first Norwegian Idol in 2003, then World Idol. Who is he?', 'Han vant første sesong av Idol Norge i 2003 og deretter World Idol. Hvem er han?'), answer: text('Kurt Nilsen') }
        ]
      },
      {
        id: 'famous-duos',
        title: text('Famous Duos', 'Kjente par'),
        description: text('Name the missing half.', 'Hvem er den andre halvdelen?'),
        clues: [
          { id: 'fd-100', value: 100, question: text('Sesame Street’s best friends: Bert and…?', 'Sesam stasjons bestevenner: Bert og…?'), answer: text('Ernie') },
          { id: 'fd-200', value: 200, question: text('Gotham’s crime fighters: Batman and…?', 'Gothams forbryterjegere: Batman og…?'), answer: text('Robin') },
          { id: 'fd-300', value: 300, question: text('The Sound of Silence was sung by Simon and…?', 'The Sound of Silence ble sunget av Simon og…?'), answer: text('Garfunkel') },
          { id: 'fd-400', value: 400, question: text('Stan and Ollie were the comedy duo known by which two surnames?', 'Stan og Ollie var komikerduoen kjent under hvilke to etternavn?'), answer: text('Laurel and Hardy', 'Laurel og Hardy (Helan og Halvan)') },
          { id: 'fd-500', value: 500, question: text('Ben & Jerry’s ice cream. Name both founders’ surnames.', 'Ben & Jerry’s-iskrem. Hva er etternavnene til begge grunnleggerne?'), answer: text('Ben Cohen and Jerry Greenfield', 'Ben Cohen og Jerry Greenfield') }
        ]
      },
      {
        id: 'wild-facts',
        title: text('Wild Facts', 'Ville fakta'),
        description: text('The animal kingdom is stranger than you think.', 'Dyreriket er merkeligere enn du tror.'),
        clues: [
          { id: 'wf-100', value: 100, question: text('What is the largest animal known ever to have lived?', 'Hva er det største dyret vi vet har levd?'), answer: text('The blue whale', 'Blåhvalen') },
          { id: 'wf-200', value: 200, question: text('Which are the only mammals capable of true, flapping flight?', 'Hvilke pattedyr er de eneste som virkelig kan fly?'), answer: text('Bats', 'Flaggermus') },
          { id: 'wf-300', value: 300, question: text('How many hearts does an octopus have?', 'Hvor mange hjerter har en blekksprut (åttearmet)?'), answer: text('Three', 'Tre') },
          { id: 'wf-400', value: 400, question: text('Which Australian animal has fingerprints remarkably similar to a human’s?', 'Hvilket australsk dyr har fingeravtrykk som ligner påfallende mye på menneskers?'), answer: text('The koala', 'Koalaen') },
          { id: 'wf-500', value: 500, question: text('Flamingos are not born pink. What makes them pink?', 'Flamingoer er ikke rosa når de klekkes. Hva gjør dem rosa?'), answer: text('Their diet: pigments (carotenoids) in the algae and shrimp they eat.', 'Maten: fargestoffer (karotenoider) i algene og rekene de spiser.') }
        ]
      },
      {
        id: 'around-the-table',
        title: text('Around the Table', 'Rundt bordet'),
        description: text('Food from everywhere. Questions for the hungry.', 'Mat fra hele verden. Spørsmål for de sultne.'),
        clues: [
          { id: 'at-100', value: 100, question: text('Guacamole is mainly made from which fruit?', 'Guacamole lages hovedsakelig av hvilken frukt?'), answer: text('Avocado') },
          { id: 'at-200', value: 200, question: text('Paella comes from which country?', 'Paella kommer fra hvilket land?'), answer: text('Spain', 'Spania') },
          { id: 'at-300', value: 300, question: text('Which Italian dessert’s name means “pick me up”?', 'Hvilken italiensk dessert betyr «løft meg opp»?'), answer: text('Tiramisu') },
          { id: 'at-400', value: 400, question: text('What is the main ingredient of hummus?', 'Hva er hovedingrediensen i hummus?'), answer: text('Chickpeas', 'Kikerter') },
          { id: 'at-500', value: 500, question: text('Picked by hand from a crocus flower, it is the world’s most expensive spice by weight. Which?', 'Plukkes for hånd fra en krokus og er verdens dyreste krydder per gram. Hvilket?'), answer: text('Saffron', 'Safran') }
        ]
      },
      {
        id: 'game-on',
        title: text('Game On', 'Sport'),
        description: text('Balls, skis and one very familiar table.', 'Baller, ski og ett svært kjent bord.'),
        clues: [
          { id: 'go-100', value: 100, question: text('How many players does each football (soccer) team have on the pitch?', 'Hvor mange spillere har hvert fotballag på banen?'), answer: text('Eleven', 'Elleve') },
          { id: 'go-200', value: 200, question: text('In which sport would you do a slam dunk?', 'I hvilken idrett gjør man en slam dunk?'), answer: text('Basketball', 'Basketball') },
          { id: 'go-300', value: 300, question: text('Which Grand Slam tennis tournament is played on grass in London?', 'Hvilken Grand Slam-turnering i tennis spilles på gress i London?'), answer: text('Wimbledon') },
          { id: 'go-400', value: 400, question: text('Marit Bjørgen won a record number of Winter Olympic medals in which sport?', 'Marit Bjørgen vant rekordmange vinter-OL-medaljer i hvilken idrett?'), answer: text('Cross-country skiing', 'Langrenn') },
          { id: 'go-500', value: 500, question: text('Sara’s old sport: to how many points is a standard game of table tennis played?', 'Saras gamle idrett: til hvor mange poeng spilles et vanlig sett i bordtennis?'), answer: text('Eleven (win by two)', 'Elleve (med to poengs margin)') }
        ]
      },
      {
        id: 'brand-new',
        title: text('Brand New', 'Kjente merker'),
        description: text('Logos, names and where they came from.', 'Logoer, navn og hvor de kommer fra.'),
        clues: [
          { id: 'br-100', value: 100, question: text('Which company’s logo is an apple with a bite taken out?', 'Hvilket selskap har et eple med et bitt i som logo?'), answer: text('Apple') },
          { id: 'br-200', value: 200, question: text('Which sportswear brand’s logo is the “swoosh”?', 'Hvilket sportsmerke har «swooshen» som logo?'), answer: text('Nike') },
          { id: 'br-300', value: 300, question: text('Which car brand’s logo is four interlocking rings?', 'Hvilket bilmerke har fire sammenflettede ringer som logo?'), answer: text('Audi') },
          { id: 'br-400', value: 400, question: text('LEGO comes from the Danish words “leg godt”. What do they mean?', 'LEGO kommer fra de danske ordene «leg godt». Hva betyr de?'), answer: text('Play well', 'Lek godt') },
          { id: 'br-500', value: 500, question: text('IKEA is an acronym. What does the I K stand for?', 'IKEA er en forkortelse. Hva står I og K for?'), answer: text('Ingvar Kamprad, the founder (E and A: his farm Elmtaryd and village Agunnaryd).', 'Ingvar Kamprad, grunnleggeren (E og A: gården Elmtaryd og bygda Agunnaryd).') }
        ]
      },
      {
        id: 'finish-the-lyric',
        title: text('Finish the Lyric', 'Fullfør teksten'),
        description: text('Sing it if you dare. The words count, not the voice.', 'Syng hvis du tør. Det er ordene som teller, ikke stemmen.'),
        clues: [
          { id: 'fl-100', value: 100, question: text('Queen: “We will, we will…”', 'Queen: «We will, we will…»'), answer: text('…rock you!') },
          { id: 'fl-200', value: 200, question: text('Britney Spears: “Oh baby, baby… hit me baby…”', 'Britney Spears: «Oh baby, baby… hit me baby…»'), answer: text('…one more time') },
          { id: 'fl-300', value: 300, question: text('Rick Astley: “Never gonna give you up, never gonna…”', 'Rick Astley: «Never gonna give you up, never gonna…»'), answer: text('…let you down') },
          { id: 'fl-400', value: 400, question: text('Miley Cyrus: “I came in like a…”', 'Miley Cyrus: «I came in like a…»'), answer: text('…wrecking ball') },
          { id: 'fl-500', value: 500, question: text('Journey: “Just a small-town girl, livin’ in a…”', 'Journey: «Just a small-town girl, livin’ in a…»'), answer: text('…lonely world') }
        ]
      },
      {
        id: 'true-or-false',
        title: text('True or False?', 'Sant eller usant?'),
        description: text('Things everyone “knows”. Some of them are even true.', 'Ting «alle vet». Noen av dem er til og med sanne.'),
        clues: [
          { id: 'tf-100', value: 100, question: text('True or false: you can see the Great Wall of China from the Moon with the naked eye.', 'Sant eller usant: Den kinesiske mur kan ses fra månen med det blotte øye.'), answer: text('False', 'Usant') },
          { id: 'tf-200', value: 200, question: text('True or false: goldfish only have a three-second memory.', 'Sant eller usant: Gullfisker husker bare i tre sekunder.'), answer: text('False. They can remember for months.', 'Usant. De kan huske i flere måneder.') },
          { id: 'tf-300', value: 300, question: text('True or false: botanically, bananas are berries.', 'Sant eller usant: Botanisk sett er bananer bær.'), answer: text('True', 'Sant') },
          { id: 'tf-400', value: 400, question: text('True or false: Napoleon was unusually short for a Frenchman of his time.', 'Sant eller usant: Napoleon var uvanlig lav for en franskmann på sin tid.'), answer: text('False. He was about average height.', 'Usant. Han var omtrent gjennomsnittlig høy.') },
          { id: 'tf-500', value: 500, question: text('True or false: Oxford University is older than the Aztec capital Tenochtitlan.', 'Sant eller usant: Oxford-universitetet er eldre enn aztekernes hovedstad Tenochtitlan.'), answer: text('True. Teaching at Oxford began by 1096; Tenochtitlan was founded around 1325.', 'Sant. Undervisning i Oxford fantes allerede i 1096; Tenochtitlan ble grunnlagt rundt 1325.') }
        ]
      },
      {
        id: 'famous-saras',
        title: text('Famous Saras', 'Kjente Saraer'),
        description: text('Screen icons, pop stars and Olympic gold. The extra H is allowed.', 'Filmstjerner, pop og OL-gull. En ekstra H er lov.'),
        clues: [
          { id: 'fs-100', value: 100, question: text('Which Sarah plays Carrie Bradshaw in Sex and the City?', 'Hvilken Sarah spiller Carrie Bradshaw i Sex og singelliv?'), answer: text('Sarah Jessica Parker') },
          { id: 'fs-200', value: 200, question: text('Which Sarah played Buffy in the television series Buffy the Vampire Slayer?', 'Hvilken Sarah spilte Buffy i TV-serien Buffy the Vampire Slayer?'), answer: text('Sarah Michelle Gellar') },
          { id: 'fs-300', value: 300, question: text('Love Song. Brave. Which Sara recorded both?', 'Love Song. Brave. Hvilken Sara sang begge?'), answer: text('Sara Bareilles. Accept the surname.', 'Sara Bareilles. Etternavnet er nok.') },
          { id: 'fs-400', value: 400, question: text('Linda Hamilton plays her. A Terminator is looking for her. Which fictional Sarah?', 'Linda Hamilton spiller henne. En Terminator er på jakt etter henne. Hvilken fiktiv Sarah?'), answer: text('Sarah Connor') },
          { id: 'fs-500', value: 500, question: text('This Swedish Sarah won both the women’s 50 m and 100 m freestyle at Paris 2024. What is her surname?', 'Denne svenske Sarah tok gull på både 50 og 100 meter fri for kvinner i Paris-OL 2024. Hva er etternavnet?'), answer: text('Sjöström. Accept Sjostrom / Sjoestroem.', 'Sjöström. Godta Sjostrom / Sjoestroem.') }
        ]
      },
      {
        id: 'birthday-girl',
        title: text('The Birthday Girl', 'Bursdagsbarnet'),
        description: text('Sara takes over the big screen. Name the original star.', 'Sara tar over lerretet. Hvem var den opprinnelige stjernen?'),
        clues: [
          { id: 'bg-100', value: 100, question: text('Sara has borrowed an iconic Gatsby toast. Which actor raised the glass in the 2013 film?', 'Sara har lånt en ikonisk Gatsby-skål. Hvilken skuespiller løftet glasset i filmen fra 2013?'), answer: text('Leonardo DiCaprio'), image: 'assets/clue-bg-100.jpg', imageAlt: text('Sara raising a glass in a recreated film scene.', 'Sara løfter et glass i en gjenskapt filmscene.') },
          draft('bg-200', 200, 'Celebrity mashup — image and accepted answer needed.', 'Kjendismiks — bilde og godkjent svar mangler.'),
          draft('bg-300', 300, 'Celebrity mashup — image and accepted answer needed.', 'Kjendismiks — bilde og godkjent svar mangler.'),
          draft('bg-400', 400, 'Celebrity mashup — image and accepted answer needed.', 'Kjendismiks — bilde og godkjent svar mangler.'),
          draft('bg-500', 500, 'Celebrity mashup — image and accepted answer needed.', 'Kjendismiks — bilde og godkjent svar mangler.')
        ]
      },
      {
        id: 'countries',
        title: text('What’s That Country?', 'Hvilket land?'),
        description: text('Gold silhouettes. No labels. One final capital to name.', 'Gylne silhuetter uten stedsnavn. Til slutt trenger vi også hovedstaden.'),
        clues: [
          { id: 'geo-100', value: 100, question: text('Which country is this?', 'Hvilket land er dette?'), answer: text('Italy', 'Italia'), image: 'assets/clue-geo-100.svg', imageAlt: text('A gold country outline, with north at the top.', 'En gyllen landkontur med nord øverst.') },
          { id: 'geo-200', value: 200, question: text('Which country’s European territory is shown?', 'Hvilket lands europeiske område ser vi?'), answer: text('France', 'Frankrike'), image: 'assets/clue-geo-200.svg', imageAlt: text('A gold outline of a European country, including its nearby island.', 'En gyllen kontur av et europeisk land, med en øy i nærheten.') },
          { id: 'geo-300', value: 300, question: text('Which country is this island chain?', 'Hvilket land er denne øyrekken?'), answer: text('Japan'), image: 'assets/clue-geo-300.svg', imageAlt: text('A chain of islands shown in gold, with north at the top.', 'En øyrekke i gull med nord øverst.') },
          { id: 'geo-400', value: 400, question: text('Which country is this?', 'Hvilket land er dette?'), answer: text('Iceland', 'Island'), image: 'assets/clue-geo-400.svg', imageAlt: text('A single island country in gold, with north at the top.', 'En øystat i gull med nord øverst.') },
          { id: 'geo-500', value: 500, question: text('Name the country in gold AND its capital. Both for the points.', 'Hva heter landet i gull OG hovedstaden? Begge må være riktige.'), answer: text('New Zealand and Wellington.', 'New Zealand og Wellington.'), image: 'assets/clue-geo-500.svg', imageAlt: text('A regional map with one country in gold and its larger neighbour in grey.', 'Et regionalt kart med ett land i gull og den større naboen i grått.') }
        ]
      },
      {
        id: 'twenties',
        title: text('The Roaring Twenties', 'De glade 20-årene'),
        description: text('Gatsby, questionable parties and actual history.', 'Gatsby, tvilsomme fester og ekte historie.'),
        clues: [
          { id: 'rt-100', value: 100, question: text('Which dance belongs at a 1920s party: the Charleston, the Macarena or the moonwalk?', 'Hvilken dans passer på en 1920-tallsfest: charleston, macarena eller moonwalk?'), answer: text('The Charleston.', 'Charleston.') },
          { id: 'rt-200', value: 200, question: text('During US Prohibition, what was an illegal bar commonly called?', 'Hva ble en ulovlig bar vanligvis kalt under forbudstiden i USA?'), answer: text('A speakeasy.', 'En speakeasy.') },
          { id: 'rt-300', value: 300, question: text('Silent films found their voices. What English nickname was given to films with spoken dialogue?', 'Stumfilmen fikk en stemme. Hvilket engelsk kallenavn fikk filmer med talt dialog?'), answer: text('Talkies.') },
          { id: 'rt-400', value: 400, question: text('Before Leonardo raised his glass, who wrote the 1925 novel The Great Gatsby?', 'Før Leonardo løftet glasset: Hvem skrev romanen The Great Gatsby fra 1925?'), answer: text('F. Scott Fitzgerald. Accept Fitzgerald.', 'F. Scott Fitzgerald. Godta Fitzgerald.') },
          { id: 'rt-500', value: 500, question: text('Norway had a spirits ban too. Was it formally repealed in 1923, 1927 or 1933?', 'Norge hadde også brennevinsforbud. Ble det formelt opphevet i 1923, 1927 eller 1933?'), answer: text('1927. The referendum was in 1926; formal repeal followed in 1927.', '1927. Folkeavstemningen var i 1926; forbudet ble formelt opphevet i 1927.') }
        ]
      },
      {
        id: 'sara-archives',
        title: text('The Sara Archives', 'Sara-arkivet'),
        description: text('The real stories behind the photographs.', 'De ekte historiene bak bildene.'),
        clues: [
          { id: 'sa-100', value: 100, question: text('Before tonight’s party, Sara had a different kind of game face. Which sport did she play?', 'Før kveldens fest hadde Sara et helt annet konkurranseansikt. Hvilken idrett drev hun med?'), answer: text('Table tennis. Accept ping-pong.', 'Bordtennis. Godta pingpong.'), image: 'assets/clue-sa-100.jpg', imageAlt: text('A photograph from Sara’s sporting days.', 'Et bilde fra Saras idrettsdager.') },
          draft('sa-200', 200, 'Where was this taken? Add a photo and its confirmed location.', 'Hvor ble dette tatt? Legg inn et bilde og et bekreftet sted.'),
          draft('sa-300', 300, 'Who said it? Add a real Sara quote with a confirmed source.', 'Hvem sa det? Legg inn et ekte Sara-sitat med bekreftet kilde.'),
          draft('sa-400', 400, 'What happened next? Add a guest story and its real ending.', 'Hva skjedde så? Legg inn en gjestehistorie og den ekte slutten.'),
          draft('sa-500', 500, 'The deep cut. Add a host-approved story for the final clue.', 'For de innvidde. Legg inn en historie verten har godkjent.')
        ]
      },
      {
        id: 'movie-plots',
        title: text('Bad Movie Plots', 'Dårlige filmreferat'),
        description: text('Good films. Deeply unhelpful descriptions.', 'Gode filmer. Håpløse beskrivelser.'),
        clues: [
          { id: 'mp-100', value: 100, question: text('A couple’s new relationship hits an iceberg. Name the 1997 film.', 'Et helt nytt forhold treffer et isfjell. Hvilken film fra 1997?'), answer: text('Titanic.') },
          { id: 'mp-200', value: 200, question: text('The family goes to France. Their forgotten child stays home and becomes a burglar’s worst Christmas present.', 'Familien drar til Frankrike. Barnet de glemte hjemme blir innbruddstyvenes verste julegave.'), answer: text('Home Alone (1990).', 'Alene hjemme / Home Alone (1990).') },
          { id: 'mp-300', value: 300, question: text('In this 1993 film, a dinosaur theme park discovers that its attractions also enjoy the visitors.', 'I denne filmen fra 1993 oppdager en dinosaurpark at attraksjonene også setter pris på gjestene.'), answer: text('Jurassic Park.') },
          { id: 'mp-400', value: 400, question: text('An anxious fish crosses the ocean with a very forgetful stranger because his son has ended up at the dentist.', 'En engstelig fisk krysser havet med en svært glemsk fremmed fordi sønnen har havnet hos tannlegen.'), answer: text('Finding Nemo.', 'Oppdrag Nemo / Finding Nemo.') },
          { id: 'mp-500', value: 500, question: text('Corporate espionage reaches the point where even your nap needs a security department. A team must plant an idea, not steal one.', 'Industrispionasje går så langt at selv middagsluren trenger en sikkerhetsavdeling. Et team skal plante en idé, ikke stjele en.'), answer: text('Inception.') }
        ]
      },
      {
        id: 'name-that-tune',
        title: text('Name That Tune', 'Hvilken låt?'),
        description: text('The songs you know. The clues you didn’t expect. No audio needed.', 'Låter du kjenner, med litt andre ledetråder. Ingen lyd nødvendig.'),
        clues: [
          { id: 'nt-100', value: 100, question: text('Queen turned a six-minute mix of ballad, opera and rock into a 1975 hit. Name the song.', 'Queen gjorde seks minutter med ballade, opera og rock til en hit i 1975. Hva heter låten?'), answer: text('Bohemian Rhapsody — Queen.') },
          { id: 'nt-200', value: 200, question: text('ABBA. 1976. A dance-floor anthem whose title gives someone a royal promotion. Name the song.', 'ABBA. 1976. En dansegulvklassiker med en kongelig tittel. Hva heter låten?'), answer: text('Dancing Queen — ABBA.') },
          { id: 'nt-300', value: 300, question: text('Britney Spears’ debut single. The music video turned a school corridor into a dance floor. Name the song.', 'Britney Spears’ debutsingel. I musikkvideoen blir skolekorridoren et dansegulv. Hva heter låten?'), answer: text('…Baby One More Time. Accept Baby One More Time.', '…Baby One More Time. Godta Baby One More Time.') },
          { id: 'nt-400', value: 400, question: text('A Norwegian band. A man inside a pencil-drawn comic. A very ambitious high note. Name the song.', 'Et norsk band. En mann i en blyanttegnet tegneserie. En svært ambisiøs høy tone. Hva heter låten?'), answer: text('Take On Me — a-ha.') },
          { id: 'nt-500', value: 500, question: text('Coldplay borrowed the Spanish title of a Frida Kahlo painting for this 2008 song and album. Name it.', 'Coldplay lånte den spanske tittelen på et Frida Kahlo-maleri til denne låten og albumet fra 2008. Hva heter den?'), answer: text('Viva La Vida — Coldplay.') }
        ]
      },
      {
        id: 'before-or-after',
        title: text('Before or After?', 'Før eller etter?'),
        description: text('Two things you remember. One timeline you probably don’t.', 'To ting du husker. En tidslinje du kanskje har glemt.'),
        clues: [
          { id: 'ba-100', value: 100, question: text('Did the first Shrek film arrive BEFORE or AFTER Apple unveiled the first iPhone?', 'Kom den første Shrek-filmen FØR eller ETTER at Apple presenterte den første iPhonen?'), answer: text('Before. Shrek: 2001. First iPhone unveiled: 2007.', 'Før. Shrek: 2001. Første iPhone presentert: 2007.') },
          { id: 'ba-200', value: 200, question: text('Was Google incorporated as a company BEFORE or AFTER the original release of Titanic with Leonardo DiCaprio?', 'Ble Google stiftet som selskap FØR eller ETTER at Titanic med Leonardo DiCaprio først kom på kino?'), answer: text('After. Titanic: 1997. Google incorporated: 1998.', 'Etter. Titanic: 1997. Google stiftet: 1998.') },
          { id: 'ba-300', value: 300, question: text('Did the first Toy Story reach US cinemas BEFORE or AFTER the original PlayStation launched in Japan?', 'Kom den første Toy Story på kino i USA FØR eller ETTER at den første PlayStation ble lansert i Japan?'), answer: text('After. PlayStation in Japan: December 1994. Toy Story: November 1995.', 'Etter. PlayStation i Japan: desember 1994. Toy Story: november 1995.') },
          { id: 'ba-400', value: 400, question: text('Was the first SMS text message sent BEFORE or AFTER Jurassic Park was first released?', 'Ble den første SMS-en sendt FØR eller ETTER at Jurassic Park først kom på kino?'), answer: text('Before. First SMS: December 1992. Jurassic Park: 1993.', 'Før. Første SMS: desember 1992. Jurassic Park: 1993.') },
          { id: 'ba-500', value: 500, question: text('Both happened in 1995. Did Windows 95 go on sale BEFORE or AFTER Toy Story first reached US cinemas?', 'Begge deler skjedde i 1995. Kom Windows 95 i salg FØR eller ETTER at Toy Story først kom på kino i USA?'), answer: text('Before. Windows 95: 24 August. Toy Story: 22 November.', 'Før. Windows 95: 24. august. Toy Story: 22. november.') }
        ]
      },
      {
        id: 'party-science',
        title: text('Hold My Drink', 'Hold glasset mitt'),
        description: text('Fizz, melting ice and a ball with a mind of its own.', 'Bobler, smeltende is og en ball som nekter å gå rett frem.'),
        clues: [
          { id: 'ps-100', value: 100, question: text('The fizz in your Champagne is mostly bubbles of which gas?', 'Boblene i champagnen består hovedsakelig av hvilken gass?'), answer: text('Carbon dioxide / CO₂.', 'Karbondioksid / CO₂.') },
          { id: 'ps-200', value: 200, question: text('The outside of a cold glass gets wet. Is the water coming through the glass, or out of the surrounding air?', 'Utsiden av et kaldt glass blir våt. Kommer vannet gjennom glasset eller fra luften rundt?'), answer: text('From the air. Water vapour condenses on the cold surface.', 'Fra luften. Vanndamp kondenserer på den kalde overflaten.') },
          { id: 'ps-300', value: 300, question: text('Ice cubes are floating in plain water. Ignoring evaporation and temperature expansion, does the water level rise, fall or stay the same when they melt?', 'Isbiter flyter i rent vann. Se bort fra fordamping og varmeutvidelse: Stiger nivået, synker det, eller er det uendret når isen smelter?'), answer: text('It stays the same. The floating ice already displaces its own weight in water.', 'Det er uendret. Isen fortrenger allerede sin egen vekt i vann.') },
          { id: 'ps-400', value: 400, question: text('Two identical sparkling wines: one warm, one chilled. Which generally loses more dissolved gas when poured?', 'To like musserende viner: én varm og én avkjølt. Hvilken mister vanligvis mest oppløst gass når du skjenker?'), answer: text('The warm one. Chilling helps retain the dissolved carbon dioxide.', 'Den varme. Avkjøling hjelper vinen med å beholde oppløst karbondioksid.') },
          { id: 'ps-500', value: 500, question: text('Sara puts topspin on a table-tennis ball. Does the spin’s extra aerodynamic force bend its flight upward or downward?', 'Sara slår en bordtennisball med overskru. Bøyer den ekstra aerodynamiske kraften ballbanen oppover eller nedover?'), answer: text('Downward. This is the Magnus effect; naming the effect is not required.', 'Nedover. Dette er Magnus-effekten; navnet på effekten er ikke nødvendig.') }
        ]
      },
      {
        id: 'the-impostor',
        title: text('The Impostor', 'Hvem skal ut?'),
        description: text('Four names. Three belong. Find the one that doesn’t.', 'Fire navn. Tre passer inn. Finn det som skal ut.'),
        clues: [
          { id: 'im-100', value: 100, question: text('Three played James Bond in the official films. Who is the impostor? Daniel Craig · Matt Damon · Sean Connery · Pierce Brosnan', 'Tre har spilt James Bond i de offisielle filmene. Hvem skal ut? Daniel Craig · Matt Damon · Sean Connery · Pierce Brosnan'), answer: text('Matt Damon. His spy franchise is Bourne.', 'Matt Damon. Hans spionserie er Bourne.') },
          { id: 'im-200', value: 200, question: text('Three are national capitals. Which city isn’t? Wellington · Ottawa · Sydney · Canberra', 'Tre er hovedsteder i selvstendige land. Hvilken by er ikke det? Wellington · Ottawa · Sydney · Canberra'), answer: text('Sydney. Canberra is Australia’s capital.', 'Sydney. Canberra er Australias hovedstad.') },
          { id: 'im-300', value: 300, question: text('Three are Nobel Prize categories. Which one isn’t? Physics · Mathematics · Chemistry · Literature', 'Tre er nobelpriskategorier. Hvilken er ikke det? Fysikk · Matematikk · Kjemi · Litteratur'), answer: text('Mathematics.', 'Matematikk.') },
          { id: 'im-400', value: 400, question: text('Three countries have a Mediterranean coastline. Which one doesn’t? Greece · Portugal · Italy · Egypt', 'Tre land har kyst mot Middelhavet. Hvilket har ikke det? Hellas · Portugal · Italia · Egypt'), answer: text('Portugal. Its coast faces the Atlantic.', 'Portugal. Kysten vender mot Atlanterhavet.') },
          { id: 'im-500', value: 500, question: text('Three are Champagne’s main grape varieties. Which is the impostor? Chardonnay · Pinot noir · Merlot · Meunier', 'Tre er de viktigste druesortene i champagne. Hvilken skal ut? Chardonnay · Pinot noir · Merlot · Meunier'), answer: text('Merlot. The main three are Chardonnay, Pinot noir and Meunier.', 'Merlot. De tre viktigste er Chardonnay, Pinot noir og Meunier.') }
        ]
      }
    ],
    // Only the two host-selected reactions: pink-sweater pose and sceptical face.
    reactions: {
      correct: ['assets/reaction-02.webp'],
      wrong: ['assets/reaction-06.webp']
    }
  };
})();
