(() => {
  'use strict';
  const engine = window.BirthdayGameEngine;
  const publicPack = window.BIRTHDAY_GAME_PACK;
  const faceTools = window.BirthdayCelebrityFaces;
  // The owner's party pick, in 100–500 order.
  const defaultFaceIds = ['ryan-gosling','dwayne-johnson','rihanna','jason-momoa','gordon-ramsay'].filter(id => faceTools.portraits.some(portrait => portrait.id === id));
  let selectedFaceIds = defaultFaceIds.length === 5 ? defaultFaceIds : faceTools.portraits.slice(0,5).map(portrait => portrait.id);
  let pendingFaceIds = selectedFaceIds.slice();
  let pack = selectedFaceIds.length === 5 ? faceTools.buildPack(publicPack,selectedFaceIds) : publicPack;
  let privatePack = null;
  const packTools = window.BirthdayGamePackTools;
  const trustedImages = faceTools.portraits.map(portrait => portrait.image).concat(publicPack.categories.flatMap(category => category.clues.flatMap(clue => [clue.image,clue.answerImage].filter(Boolean))));
  const $ = selector => document.querySelector(selector);
  const STORE = 'birthday-game:' + pack.id + ':v1';
  const session = window.BirthdayGameSessionStore.create(() => window.localStorage, STORE);
  const initialSave = session.read();
  const clueDialog = $('#clue-dialog');
  const reactionDialog = $('#reaction-dialog');
  const english = {};
  document.querySelectorAll('[data-copy]').forEach(node => { english[node.dataset.copy] = node.innerHTML; });
  const norwegian = {
    privateTitle:'Klargjør en privat spørsmålspakke', privateHint:'Last ned spørsmålsbanken som JSON, rediger spørsmålene og svarene, og importer den her. Den blir i denne nettleseren; ingenting lastes opp til invitasjonen. Behold en kopi på laptopen.', privateFormat:'6–40 kategorier med fem spørsmål hver. Maks 2 MB, inkludert innebygde PNG-, JPG- eller WebP-bilder. De to Sara-reaksjonene beholdes.', exportPack:'Last ned spørsmålsbanken', importPack:'Importer privat JSON', defaultPack:'Bruk den offentlige spørsmålsbanken',
    timerSetting:'Sekunder per spørsmål', timerHint:'Klokken starter når spørsmålet åpnes. Tiden endrer aldri poengsummen.', chooseBoard:'Velg brettet ↓',
    categoryEyebrow:'SPØRSMÅLSBANKEN', chooseSix:'Velg kategorier.', categoryHint:'Velg så mange du vil for å teste. Seks kategorier passer til festen. Uferdige spørsmål er låst.', recommended:'Bruk de seks anbefalte',
    adjustScores:'Juster poeng', adjustHint:'Rett en poengsum eller gi en bonus etter husreglene. Hver endring har en begrunnelse og kan angres.', adjustTeam:'Lag', adjustAmount:'Poeng som legges til eller trekkes fra', adjustReason:'Begrunnelse', applyCorrection:'Bruk endringen',
    how:'Slik spiller dere', edition:'THE GREAT MATILDA SPILLKVELD', setupTitle:'Litt vennskapelig<br><em>konkurranse.</em>',
    setupIntro:'Seks kategorier. Favorittmenneskene dine. Og Sara, som følger med på poengene.',
    points:'POENG PER SPØRSMÅL', teams:'LAG RUNDT BORDET', host:'VERT MED KONTROLL',
    starter:'Bygg brettet fra kategoribanken. Velg seks ferdige kategorier, eller ta med Saras personlige runder når de er klare.',
    guestList:'KONKURRENTENE', nameTeams:'Hva heter lagene?', removeTeam:'− Fjern lag', addTeam:'+ Legg til lag',
    begin:'La spillet begynne', localSave:'Spillet lagres i denne nettleseren, så festen tåler en oppdatering.',
    reactionEyebrow:'SARA HAR EN REAKSJON PÅ DET', reactionTitle:'Riktig? Feil? Hun sier fra.',
    reactionHint:'Trykk på et bilde for å prøve reaksjonene.', boardEyebrow:'TJUEÅRENE OM IGJEN · SPILLET',
    undo:'↶ Angre', newGame:'Nytt spill', turnLabel:'ORDET ER DERES', turnOrderLabel:'LAGREKKEFØLGE', portraitTitle:'Velg Saras kjendisansikter', portraitHint:'Velg fem portretter til runden. Rekkefølgen setter 100–500 poeng. Navnene vises her for verten.', portraitApply:'Bruk disse fem ansiktene', allCategories:'Velg alle ferdige', clearCategories:'Fjern valgene',
    boardHint:'Laget som er markert velger et spørsmål. Riktig eller Feil tar ruten; turene følger lagrekkefølgen.',
    footer:'PENT ANTREKK. VENNSKAPELIG RIVALISERING.', photoCredits:'Fotokreditering ↗', backInvite:'Tilbake til invitasjonen ↗',
    answerLabel:'SVARET', startTimer:'Start klokken', reveal:'Vis svaret', answering:'SVARER NÅ',
    wrong:'Feil', correct:'Riktig', finish:'Hopp over spørsmålet →', continue:'Fortsett →',
    hostNotes:'TIL VERTEN', rule1:'Koble laptopen til TV-en. Lag to til seks lag og skriv inn lagnavnene.',
    rule2:'Første lag starter. Velg et spørsmål; markert lag svarer og klokken starter automatisk.',
    rule3:'Riktig gir poeng; Feil trekker poeng. Begge tar ruten med én gang og gir turen til neste lag.',
    rule4:'Turene følger lagrekkefølgen. Hvert lag har én Doble poeng, Første bokstav og Stjel per runde, brukt før svaret vurderes eller vises. Angre gjenoppretter poeng, ruter, turer og hjelpemidler.',
    draftHelp:'Ruter merket «Må klargjøres» trenger personlige spørsmål eller bilder. De kan ikke åpnes før innholdet er lagt inn.',
    understood:'Skjønner', newRound:'EN NY START', resetTitle:'Starte et nytt spill?',
    resetBody:'Dette nullstiller poengene og spilte spørsmål i denne nettleseren. Spørsmålspakken beholdes.',
    keepPlaying:'Fortsett spillet', resetConfirm:'Start nytt spill',
    modeLegend:'Spillformat', modeSingle:'Ett spill', modeSingleHint:'2–6 lag på ett brett.', modeTournament:'Turnering', modeTournamentHint:'4–12 lag. Raske innledende runder, så møtes vinnerne i finalen.',
    heatSetting:'Antall innledende runder', prizeSetting:'Premien (valgfritt)', endRound:'Avslutt runden', endRoundTitle:'Avslutte runden nå?', endRoundBody:'Laget med flest poeng akkurat nå vinner runden. Spørsmål som ikke er spilt, hoppes over.', endRoundConfirm:'Avslutt runden', backToBoard:'Tilbake til brettet',
    rule5:'Turnering: hver runde har sitt eget brett. Når en runde er over, går vinneren videre. Rundevinnerne spiller finalen om premien.', boardTitle:'The Great Matilda<span class="gold">.</span>',
    conflictTitle:'Spillet er endret i en annen fane.', conflictBody:'Denne fanen er satt på pause for å beskytte de nyeste poengene. Last inn det lagrede spillet på nytt før du fortsetter.', reloadGame:'Last inn nyeste spill'
  };
  const ui = {
    en:{team:'Team',draft:'To prepare',played:'Played',done:'clues played',paused:'Resume timer',pause:'Pause',start:'Start timer',time:'Time’s up',on:'Sara reactions: on',off:'Sara reactions: off',pick:'Choose the answering team.',tried:'This team has already tried. Choose another team or undo.',resolved:'Points awarded. Finish the clue when ready.',wrong:'Wrong answer: points deducted and clue removed from the board.',savedError:'This browser cannot save your game. Keep this page open to retain your scores.',restoreError:'The saved game could not be restored with this question pack. Start a new game below.',names:'Give each team a different name (1–40 characters).',error:'That action could not be completed. Please try again.',fullscreen:'iPhone can’t go full screen in Safari. Tap Share → Add to Home Screen, then open Sara’s Game from the home screen: it opens full screen.',preview:'Reaction preview',correct:'CORRECT ANSWER',incorrect:'WRONG ANSWER',winner:'THE WINNING TEAM',tie:'HONOURS SHARED',points:'points',back:'Return to board',close:'Close',seconds:'Seconds remaining',resetTimer:'Reset timer',reaction:'Sara reaction',image:'Picture clue',selected:'Selected',timerEnded:'Time is up. The host decides whether to accept an answer.'},
    nb:{team:'Lag',draft:'Må klargjøres',played:'Spilt',done:'spørsmål spilt',paused:'Fortsett klokken',pause:'Pause',start:'Start klokken',time:'Tiden er ute',on:'Sara-reaksjoner: på',off:'Sara-reaksjoner: av',pick:'Velg laget som svarer.',tried:'Dette laget har allerede prøvd. Velg et annet lag eller angre.',resolved:'Poengene er gitt. Avslutt spørsmålet når dere er klare.',wrong:'Feil svar: poengene trekkes fra og spørsmålet fjernes fra brettet.',savedError:'Nettleseren kan ikke lagre spillet. Hold siden åpen for å beholde poengene.',restoreError:'Det lagrede spillet kunne ikke hentes med denne spørsmålspakken. Start et nytt spill nedenfor.',names:'Gi hvert lag et eget navn (1–40 tegn).',error:'Handlingen kunne ikke fullføres. Prøv igjen.',fullscreen:'iPhone kan ikke vise fullskjerm i Safari. Trykk Del → Legg til på Hjem-skjerm, og åpne Sara’s Game derfra: da åpnes spillet i fullskjerm.',preview:'Prøv en reaksjon',correct:'RIKTIG SVAR',incorrect:'FEIL SVAR',winner:'VINNERLAGET',tie:'DELT SEIER',points:'poeng',back:'Tilbake til brettet',close:'Lukk',seconds:'Sekunder igjen',resetTimer:'Nullstill klokken',reaction:'Sara reagerer',image:'Bildespørsmål',selected:'Valgt',timerEnded:'Tiden er ute. Verten avgjør om svaret godtas.'}
  };
  Object.assign(ui.en, {packLoaded:'Private pack loaded. Choose categories below.', packFailed:'The pack could not be loaded. Check the JSON format, category IDs, five clue values per category and embedded images (maximum 2 MB). Your previous bank is unchanged.', selectedCategories:'categories selected', ready:'ready', unfinished:'to prepare', chooseSix:'Choose at least one category to start.', adjustmentError:'Enter a non-zero whole number and a short reason.', adjustments:'Recent corrections', accepts:'Also accept', context:'For the host'});
  Object.assign(ui.nb, {packLoaded:'Privat pakke lastet inn. Velg kategorier nedenfor.', packFailed:'Pakken kunne ikke lastes inn. Sjekk JSON-formatet, kategori-ID-ene, fem poengverdier per kategori og innebygde bilder (maks 2 MB). Den forrige banken er uendret.', selectedCategories:'kategorier valgt', ready:'klare', unfinished:'må klargjøres', chooseSix:'Velg minst én kategori for å starte.', adjustmentError:'Skriv inn et heltall som ikke er null, og en kort begrunnelse.', adjustments:'Siste endringer', accepts:'Godta også', context:'Til verten'});
  Object.assign(ui.en, {heat:(n,total) => 'HEAT ' + n + ' OF ' + total, final:'THE FINAL', single:'THE GREAT MATILDA · THE GAME', heatWinner:n => 'HEAT ' + n + ' · THROUGH TO THE FINAL', champions:'THE CHAMPIONS', roundWinner:'THE WINNING TEAM', nextHeat:n => 'On to heat ' + n + ' →', toFinal:'On to the final →', playAgain:'Start a new game', prizeLabel:'The prize', tourTeams:'Make at least two teams per heat (4–12 teams in total).', planTitle:'The tournament plan', rulesButton:'Rules', rulesShow:'Show the rules on the TV', planHint:'Teams are shuffled. The final gets the recommended six; the heats share the rest. Open “Choose categories” on any card to change them (1–6 each). A category may be used in more than one heat.', pickCategories:'Choose categories', reshuffle:'Shuffle teams', heatName:n => 'Heat ' + n, finalName:'Final', finalTeams:'Heat winners', startTour:'Start the tournament'});
  Object.assign(ui.nb, {heat:(n,total) => 'RUNDE ' + n + ' AV ' + total, final:'FINALEN', single:'THE GREAT MATILDA · SPILLET', heatWinner:n => 'RUNDE ' + n + ' · VIDERE TIL FINALEN', champions:'MESTERNE', roundWinner:'VINNERLAGET', nextHeat:n => 'Videre til runde ' + n + ' →', toFinal:'Videre til finalen →', playAgain:'Start et nytt spill', prizeLabel:'Premien', tourTeams:'Lag minst to lag per runde (4–12 lag totalt).', planTitle:'Turneringsplanen', rulesButton:'Regler', rulesShow:'Vis reglene på TV-en', planHint:'Lagene er stokket. Finalen får de anbefalte seks; rundene deler resten. Åpne «Velg kategorier» på et kort for å endre dem (1–6 hver). En kategori kan brukes i flere runder.', pickCategories:'Velg kategorier', reshuffle:'Stokk lagene', heatName:n => 'Runde ' + n, finalName:'Finale', finalTeams:'Rundevinnerne', startTour:'Start turneringen'});
  Object.assign(ui.en, {turn:'YOUR TURN', answeringNow:'Answering', double:'Double Up', letter:'First Letter', steal:'Steal', spent:'used', available:'available', firstLetter:'First letter', nextTurn:'Next turn', powerHint:'One of each per team per round. Double Up doubles the gain or loss. Steal passes to the next eligible team before judging or revealing the answer.'});
  Object.assign(ui.nb, {turn:'DERES TUR', answeringNow:'Svarer', double:'Doble poeng', letter:'Første bokstav', steal:'Stjel', spent:'brukt', available:'tilgjengelig', firstLetter:'Første bokstav', nextTurn:'Neste tur', powerHint:'Én av hver per lag per runde. Doble poeng dobler gevinst eller tap. Stjel gir spørsmålet til neste tilgjengelige lag før svaret vurderes eller vises.'});
  const timerDurations = [15,30,45,60,90,120];
  const defaultCategories = () => (pack.defaultCategoryIds || pack.categories.slice(0,6).map(category => category.id)).slice();
  let selectedCategoryIds = defaultCategories();
  let timerDuration = 45;
  let language = 'en';
  let state = null;
  let names = ['The Bootleggers', 'Champagne Problems', 'The Old Sports'];
  const partyTeams = ['The Bootleggers', 'Champagne Problems', 'The Old Sports', 'The Great Matilda'];
  // Team emblems: drop a PNG at assets/team-<name>.png (e.g. team-the-great-matilda.png). Missing files are simply not shown.
  const teamSlug = name => String(name).toLocaleLowerCase('en').normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function teamIcon(name, className = 'team-icon') {
    const img = element('img', className); img.alt = ''; img.src = 'assets/team-' + teamSlug(name) + '.png';
    img.addEventListener('error', () => img.remove());
    return img;
  }
  // Tournament: heats on their own smaller boards, then the heat winners play the final.
  let mode = 'single';
  let heatCount = 2;
  let prize = '';
  let tour = null;
  let roundShown = false;
  let answerTimes = {}; // 'stage|clueId|teamId' -> seconds taken, for the finale's fun facts.
  const PLAN_VERSION = 4; // Bump to replace saved, unstarted tournament plans with the default.
  const openPickers = new Set();
  const maxTeams = () => mode === 'tournament' ? 12 : 6;
  let reactionsEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let reactionIndex = {correct:0,wrong:0};
  let effectIndex = {correct:0,wrong:0};
  const reactionEffects = {correct:['pop','float','swing'],wrong:['shake','drop','wobble']};
  let reactionTimeout = null;
  let resumeAfterReaction = false;
  let roundTimeout = null;
  let timer = {clueId:null,remaining:timerDuration,running:false,deadline:0};
  let timerInterval = null;
  let storageFailed = initialSave.status === 'unavailable';
  let restoreFailed = false;
  let notice = '';
  const clues = new Map();
  // The tournament final adds the pack's finalRows (600/700). The Birthday Girl gets two spare portraits.
  function withFinalRows(base) {
    const extra = base.finalRows || {};
    return {...base, categories: base.categories.map(category => {
      let rows = extra[category.id] || [];
      if (category.id === 'birthday-girl' && window.BirthdayCelebrityFaces) {
        const used = new Set(category.clues.map(clue => clue.image));
        // The final's two hardest faces: Brad Pitt (600) and Jennifer Aniston (700), unless already on the board.
        const all = window.BirthdayCelebrityFaces.portraits;
        const preferred = ['brad-pitt','jennifer-aniston'].map(id => all.find(portrait => portrait.id === id)).filter(portrait => portrait && !used.has(portrait.image));
        const spare = all.filter(portrait => !portrait.reserve && !used.has(portrait.image) && !preferred.includes(portrait));
        rows = preferred.concat(spare).slice(0,2).map((portrait,index) => ({
          ...category.clues[0], id:'bg-' + (600 + index*100), value:600 + index*100, answer:{en:portrait.name,nb:portrait.name}, image:portrait.image
        }));
      }
      return rows.length && category.clues.length === 5 ? {...category, clues:[...category.clues, ...rows]} : category;
    })};
  }
  const inFinal = () => !!tour && tour.stage === tour.heats.length;
  const boardPack = () => inFinal() ? withFinalRows(pack) : pack;
  function indexClues() {
    clues.clear();
    withFinalRows(pack).categories.forEach(category => category.clues.forEach(clue => clues.set(clue.id, { ...clue, category })));
  }
  const text = value => typeof value === 'string' ? value : value?.[language] || value?.en || '';
  const copy = () => ui[language];
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  function lockConflictedSession() {
    pauseTimer();
    clearTimeout(reactionTimeout);
    document.querySelectorAll('dialog[open]').forEach(dialog => {
      if (dialog.id !== 'conflict-dialog') dialog.close();
    });
    $('.game-shell').inert = true;
    if (!$('#conflict-dialog').open) $('#conflict-dialog').showModal();
  }
  function checkSession() {
    const result = session.check();
    if (result.status === 'conflict') { lockConflictedSession(); return false; }
    storageFailed = result.status === 'unavailable';
    return true;
  }
  function save() {
    try {
      const result = session.write(JSON.stringify({state,selectedFaceIds,language,reactionsEnabled,selectedCategoryIds,timerDuration,privatePack,mode,heatCount,prize,tour,roundShown,names,answerTimes,timer:{clueId:timer.clueId,remaining:timer.remaining}}));
      if (result.status === 'conflict') { lockConflictedSession(); return; }
      storageFailed = result.status === 'unavailable';
    } catch { storageFailed = true; }
    renderNotice();
  }
  function validTour(value) {
    const list = item => Array.isArray(item) && item.every(entry => typeof entry === 'string');
    return !!value && Array.isArray(value.heats) && value.heats.length >= 2 && value.heats.length <= 4 && value.heats.every(heat => list(heat.teams) && list(heat.categoryIds))
      && list(value.finalCategoryIds) && Number.isInteger(value.stage) && value.stage >= 0 && value.stage <= value.heats.length && Array.isArray(value.results);
  }
  const shuffle = list => { const copyList = list.slice(); for (let i = copyList.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copyList[i], copyList[j]] = [copyList[j], copyList[i]]; } return copyList; };
  // Playable = at least four finished clues (a heat's Birthday Girl may still wait for its last face; The Sara Archives stays out).
  const readyCategoryIds = () => pack.categories.filter(category => category.clues.filter(clue => !clue.draft).length >= 4).map(category => category.id);
  // keep: an earlier plan whose category choices should survive a team change.
  function planTour(keep) {
    const teams = shuffle(names.map(name => name.trim()));
    const heats = Array.from({length:heatCount}, () => ({teams:[], categoryIds:[]}));
    teams.forEach((name,index) => heats[index % heatCount].teams.push(name));
    const ready = readyCategoryIds();
    if (keep && keep.heats.length === heatCount) {
      // Same arrays, so open category pickers keep editing the live plan.
      const valid = ids => { ids.splice(0, ids.length, ...ids.filter(id => ready.includes(id))); return ids; };
      heats.forEach((heat,index) => { heat.categoryIds = valid(keep.heats[index].categoryIds); });
      const finalCategoryIds = valid(keep.finalCategoryIds);
      if (heats.every(heat => heat.categoryIds.length) && finalCategoryIds.length) return {heats, finalCategoryIds, stage:0, results:[], prize:prize.trim(), plan:PLAN_VERSION};
    }
    // The final gets the recommended six (the best categories); the heats share out the rest.
    const best = (pack.defaultCategoryIds || []).filter(id => ready.includes(id));
    const finalCategoryIds = (best.length ? best : shuffle(ready)).slice(0,6);
    let pool = shuffle(ready.filter(id => !finalCategoryIds.includes(id)));
    if (pool.length < heatCount) pool = shuffle(ready);
    const perHeat = Math.max(1, Math.min(4, Math.floor(pool.length / heatCount)));
    let next = 0;
    heats.forEach(heat => { heat.categoryIds = [...new Set(Array.from({length:perHeat}, () => pool[next++ % pool.length]))]; });
    // The party's chosen split for two heats (Famous Saras in both); other heat counts use the shared-out plan.
    const preset = (pack.tournamentHeats || {})[heatCount];
    if (preset && preset.every(ids => ids.length && ids.every(id => ready.includes(id)))) heats.forEach((heat,index) => { heat.categoryIds = preset[index].slice(); });
    return {heats, finalCategoryIds, stage:0, results:[], prize:prize.trim(), plan:PLAN_VERSION};
  }
  const finalists = () => tour.results.flatMap(result => result.winners).slice(0,6);
  function stageTeams() { return tour.stage < tour.heats.length ? tour.heats[tour.stage].teams : finalists(); }
  function stageCategories() { return tour.stage < tour.heats.length ? tour.heats[tour.stage].categoryIds : tour.finalCategoryIds; }
  function startStage() {
    state = engine.create(stageTeams(), boardPack(), stageCategories());
    roundShown = false; notice = ''; restoreFailed = false;
    timer = {clueId:null,remaining:timerDuration,running:false,deadline:0};
  }
  function standingsOf(current) {
    const ranked = current.teams.slice().sort((a,b) => b.score - a.score);
    const top = ranked[0].score;
    return {winners: ranked.filter(team => team.score === top).map(team => team.name), scores: ranked.map(team => [team.name, team.score])};
  }
  function renderPlan() {
    const plan = $('#tour-plan');
    plan.hidden = mode !== 'tournament';
    $('#category-options').hidden = mode === 'tournament';
    $('#category-shortcuts').hidden = mode === 'tournament';
    $('#category-title').textContent = mode === 'tournament' ? copy().planTitle : (language === 'nb' ? norwegian.chooseSix : english.chooseSix.replace(/<[^>]+>/g,''));
    if (mode !== 'tournament' || state) return; // Never re-plan a tournament that is being played.
    if (!tour || tour.stage !== 0 || tour.results.length) tour = planTour();
    const title = id => text(pack.categories.find(category => category.id === id)?.title);
    const card = (label, teams, ids, key) => {
      const box = element('section','tour-heat');
      const cats = element('p','tour-cats',ids.map(title).join(' · '));
      const picker = element('details','tour-picker');
      picker.open = openPickers.has(key);
      picker.addEventListener('toggle', () => { if (picker.open) openPickers.add(key); else openPickers.delete(key); });
      const status = element('p','tour-pick-count');
      const showCount = () => { status.textContent = ids.length + ' / 8'; };
      picker.append(element('summary','',copy().pickCategories));
      const chips = element('div','tour-chips');
      readyCategoryIds().forEach(id => {
        const chip = element('button','tour-chip',title(id)); chip.type = 'button';
        chip.setAttribute('aria-pressed', String(ids.includes(id)));
        chip.addEventListener('click', () => {
          const at = ids.indexOf(id);
          if (at >= 0) { if (ids.length === 1) return; ids.splice(at,1); }
          else { if (ids.length >= 8) return; ids.push(id); }
          chip.setAttribute('aria-pressed', String(at < 0));
          cats.textContent = ids.map(title).join(' · '); showCount(); save();
        });
        chips.append(chip);
      });
      showCount();
      picker.append(chips, status);
      box.append(element('p','eyebrow',label), element('h3','',teams), cats, picker);
      return box;
    };
    const reshuffle = element('button','text-button',copy().reshuffle); reshuffle.type = 'button';
    reshuffle.addEventListener('click', () => { readNames(); tour = planTour(tour); save(); renderPlan(); });
    plan.replaceChildren(element('p','form-hint',copy().planHint), ...tour.heats.map((heat,index) => card(copy().heatName(index+1), heat.teams.join(' · '), heat.categoryIds, 'h'+index)), card(copy().finalName, copy().finalTeams, tour.finalCategoryIds, 'final'), reshuffle);
  }
  try {
    const saved = JSON.parse(initialSave.raw || 'null');
    if (saved) {
      // A browser still holding the old built-in five gets the new default instead.
      if (Array.isArray(saved.selectedFaceIds) && ['dicaprio,gordon-ramsay,marilyn-monroe,rihanna,ryan-gosling','rihanna,jason-momoa,jennifer-aniston,gordon-ramsay,brad-pitt'].includes(saved.selectedFaceIds.join())) saved.selectedFaceIds = null;
      if (saved.selectedFaceIds) {
        try { pack = faceTools.buildPack(publicPack,saved.selectedFaceIds); selectedFaceIds = saved.selectedFaceIds.slice(); pendingFaceIds = selectedFaceIds.slice(); } catch { /* Keep the available default portraits. */ }
      }
      if (saved.privatePack) {
        privatePack = packTools.parse(JSON.stringify(saved.privatePack),trustedImages);
        pack = {...privatePack,reactions:publicPack.reactions};
        selectedCategoryIds = defaultCategories();
      }
      language = saved.language === 'nb' ? 'nb' : 'en';
      if (timerDurations.includes(saved.timerDuration)) timerDuration = saved.timerDuration;
      timer.remaining = timerDuration;
      if (Array.isArray(saved.selectedCategoryIds) && saved.selectedCategoryIds.length <= 40 && new Set(saved.selectedCategoryIds).size === saved.selectedCategoryIds.length && saved.selectedCategoryIds.every(id => pack.categories.some(category => category.id === id))) selectedCategoryIds = saved.selectedCategoryIds.slice();
      if (typeof saved.reactionsEnabled === 'boolean') reactionsEnabled = saved.reactionsEnabled;
      if (saved.mode === 'tournament') mode = 'tournament';
      if ([2,3,4].includes(saved.heatCount)) heatCount = saved.heatCount;
      if (typeof saved.prize === 'string') prize = saved.prize.slice(0,80);
      if (validTour(saved.tour)) tour = saved.tour;
      if (tour && tour.stage === 0 && !saved.state) tour.heats.forEach(heat => { heat.teams = heat.teams.map(team => team === 'Team 4' ? 'The Great Matilda' : team); });
      // A not-yet-started plan from before the party split is replaced by the agreed default.
      if (tour && tour.stage === 0 && !tour.results.length && !saved.state && tour.plan !== PLAN_VERSION) tour = null;
      // Team names typed during setup survive a refresh.
      if (Array.isArray(saved.names) && saved.names[3] === 'Team 4' && !saved.names.includes('The Great Matilda')) saved.names[3] = 'The Great Matilda';
      if (Array.isArray(saved.names) && saved.names.length >= 2 && saved.names.length <= 12 && saved.names.every(name => typeof name === 'string' && name.length <= 40)) names = saved.names.slice();
      roundShown = saved.roundShown === true;
      if (saved.answerTimes && typeof saved.answerTimes === 'object') answerTimes = saved.answerTimes;
      if (saved.state) {
        state = engine.restore(saved.state, boardPack());
        restoreFailed = !state;
        if (state) { names = state.teams.map(team => team.name); selectedCategoryIds = state.categoryIds.slice(); }
      }
      if (state?.currentClueId && saved.timer?.clueId === state.currentClueId && Number.isInteger(saved.timer.remaining) && saved.timer.remaining >= 0 && saved.timer.remaining <= timerDuration) timer = {...timer,clueId:saved.timer.clueId,remaining:saved.timer.remaining};
    }
  } catch { restoreFailed = true; }
  indexClues();
  function renderNotice() {
    $('#notice').textContent = storageFailed ? copy().savedError : restoreFailed ? copy().restoreError : notice;
    // The start button is far from the top notice on a phone, so setup errors also show next to it.
    const startError = $('#start-error'); if (startError) startError.textContent = state ? '' : notice;
  }
  function renderLocale() {
    document.documentElement.lang = language;
    document.title = language === 'nb' ? 'The Great Matilda · Bursdagsspillet' : 'The Great Matilda · The birthday game';
    document.querySelectorAll('[data-copy]').forEach(node => {
      // Only these source-controlled interface strings contain HTML; guest names use textContent.
      node.innerHTML = language === 'nb' ? norwegian[node.dataset.copy] || english[node.dataset.copy] : english[node.dataset.copy];
    });
    $('#language').textContent = language === 'en' ? 'NO' : 'EN';
    $('#language').ariaLabel = language === 'en' ? 'Bytt til norsk' : 'Switch to English';
    $('#fullscreen').ariaLabel = language === 'en' ? 'Full screen' : 'Fullskjerm';
    $('#clue-cancel').ariaLabel = copy().back;
    $('#timer-reset').ariaLabel = copy().resetTimer;
    $('#timer-value').ariaLabel = copy().seconds;
    $('#reaction-image').alt = copy().reaction;
    document.querySelectorAll('[data-close]').forEach(button => { if (button.textContent === '×') button.ariaLabel = copy().close; });
  }
  function readNames() { names = [...$('#team-inputs').querySelectorAll('input')].map(input => input.value); }
  function renderSetup() {
    $('#team-inputs').replaceChildren(...names.map((name,index) => {
      const label = element('label','team-label',copy().team + ' ' + (index+1));
      const input = element('input');
      input.name = 'team-' + (index+1); input.value = name; input.required = true; input.maxLength = 40; input.autocomplete = 'off';
      label.append(input);
      return label;
    }));
    $('#timer-duration').value = String(timerDuration);
    renderCategories(); renderPortraits();
    $('#remove-team').disabled = names.length <= 2;
    $('#add-team').disabled = names.length >= maxTeams();
    document.querySelectorAll('input[name="mode"]').forEach(input => { input.checked = input.value === mode; });
    $('#tournament-options').hidden = mode !== 'tournament';
    $('#heat-count').value = String(heatCount);
    $('#prize').value = prize;
    renderPlan();
  }
  function renderPortraits() {
    $('#celebrity-picker').hidden = !!privatePack;
    $('#portrait-gallery').replaceChildren(...faceTools.portraits.map(portrait => {
      const label = element('label','portrait-card');
      const input = element('input'); input.type='checkbox'; input.value=portrait.id;
      input.checked=pendingFaceIds.includes(portrait.id);
      input.disabled=pendingFaceIds.length >= 5 && !input.checked;
      const photo=element('img'); photo.src=portrait.image; photo.alt=portrait.name + ' + Sara'; photo.loading='lazy';
      const order=pendingFaceIds.indexOf(portrait.id);
      label.append(photo,input,element('strong','',portrait.name),element('span','',order >= 0 ? String((order+1)*100) + ' ' + copy().points : ''));
      if (portrait.reserve) label.append(element('small','portrait-note',language === 'nb' ? 'Prøv denne på øving: svakere likhet.' : 'Rehearse this one: weaker resemblance.'));
      input.addEventListener('change', () => {
        if (!checkSession()) return;
        pendingFaceIds=input.checked ? pendingFaceIds.concat(portrait.id) : pendingFaceIds.filter(id => id !== portrait.id);
        renderPortraits();
        $('#portrait-gallery input[value="' + CSS.escape(portrait.id) + '"]')?.focus({preventScroll:true});
      });
      return label;
    }));
    $('#portrait-count').textContent=pendingFaceIds.length + ' / 5 ' + (language === 'nb' ? 'ansikter valgt' : 'faces selected');
    $('#portrait-apply').disabled=pendingFaceIds.length !== 5;
  }
  $('#portrait-apply').addEventListener('click', () => {
    if (state || privatePack || !checkSession()) return;
    try {
      pack=faceTools.buildPack(publicPack,pendingFaceIds); selectedFaceIds=pendingFaceIds.slice(); tour=null;
      indexClues(); save(); renderSetup();
    } catch { notice=copy().error; renderNotice(); }
  });
  function renderCategories() {
    $('#pack-default').hidden = !privatePack;
    $('#category-options').replaceChildren(...pack.categories.map(category => {
      const label = element('label','category-option');
      const input = element('input'); input.type = 'checkbox'; input.value = category.id;
      input.checked = selectedCategoryIds.includes(category.id);
      input.disabled = false;
      const ready = category.clues.filter(clue => !clue.draft && text(clue.question) && text(clue.answer)).length;
      const title = element('strong','',text(category.title));
      label.append(input,title,element('small','',text(category.description)),element('span','ready-count',ready + ' / ' + category.clues.length + ' ' + copy().ready));
      input.addEventListener('change', () => {
        if (!checkSession()) return;
        selectedCategoryIds = input.checked ? selectedCategoryIds.concat(category.id) : selectedCategoryIds.filter(id => id !== category.id);
        save(); renderCategories();
        $('#category-options').querySelector('input[value="' + CSS.escape(category.id) + '"]')?.focus({preventScroll:true});
      });
      return label;
    }));
    const chosen = pack.categories.filter(category => selectedCategoryIds.includes(category.id));
    const ready = chosen.flatMap(category => category.clues).filter(clue => !clue.draft && text(clue.question) && text(clue.answer)).length;
    const total = chosen.reduce((count,category) => count + category.clues.length,0);
    $('#category-count').textContent = selectedCategoryIds.length + ' ' + copy().selectedCategories + ' · ' + ready + ' ' + copy().ready + (total > ready ? ' · ' + (total-ready) + ' ' + copy().unfinished : '');
    $('#start-game').disabled = mode === 'single' && (selectedCategoryIds.length === 0 || ready === 0);
    $('#start-game').querySelector('[data-copy="begin"]').textContent = mode === 'tournament' ? copy().startTour : (language === 'nb' ? norwegian.begin : english.begin);
    if (mode === 'tournament') $('#category-count').textContent = names.length + ' ' + (language === 'nb' ? 'lag' : 'teams') + ' · ' + heatCount + ' ' + (language === 'nb' ? 'runder + finale' : 'heats + final');
  }
  function renderAdjustments() {
    $('#adjust-team').replaceChildren(...state.teams.map(team => {
      const option = element('option','',team.name + ' · ' + team.score); option.value = team.id; return option;
    }));
    $('#adjust-team').value = state.selectedTeamId || state.teams[0].id;
    const recent = state.history.filter(event => event.type === 'adjust').slice(-5).reverse();
    $('#adjust-history').replaceChildren(...(recent.length ? [element('p','eyebrow',copy().adjustments),...recent.map(event => {
      const row = element('p');
      row.append(element('strong','',state.teams.find(team => team.id === event.teamId).name + ' ' + (event.amount > 0 ? '+' : '') + event.amount), document.createTextNode(' · ' + event.reason));
      return row;
    })] : []));
  }
  function renderGallery() {
    const stickers = ['correct','wrong'].flatMap(kind => (pack.reactions[kind] || []).map((src,index) => ({kind,src,index})));
    $('#reaction-gallery').replaceChildren(...stickers.map(({kind,src,index}) => {
      const button = element('button','sticker-button'); button.type = 'button';
      button.ariaLabel = copy().preview + ': ' + (kind === 'correct' ? copy().correct : copy().incorrect) + ' ' + (index+1);
      const image = element('img'); image.src = src; image.alt = ''; image.loading = 'lazy'; button.append(image);
      button.addEventListener('click',() => showReaction(kind, null, null, src));
      return button;
    }));
  }
  function renderScoreboard() {
    $('#scoreboard').style.setProperty('--team-count',state.teams.length);
    $('#scoreboard').replaceChildren(...state.teams.map(team => {
      const button = element('button','team-score'); button.type = 'button';
      const active = (state.currentClueId ? state.selectedTeamId : state.turnTeamId) === team.id;
      button.setAttribute('aria-pressed',String(active));
      const details = element('span','team-details');
      details.append(element('span','turn-label',active ? (state.currentClueId ? copy().answeringNow : copy().turn) : '\u00a0'),element('span','team-name',team.name));
      const tokens = state.powerUps.find(item => item.teamId === team.id);
      const powers = element('span','team-powers');
      ['double','letter','steal'].forEach(kind => {
        const token = element('span',tokens[kind] ? 'spent' : '',{double:'×2',letter:'A…',steal:'↗'}[kind]);
        token.title = copy()[kind] + ': ' + (tokens[kind] ? copy().spent : copy().available);
        powers.append(token);
      });
      details.append(powers); button.append(teamIcon(team.name),details,element('strong','',String(team.score)));
      button.addEventListener('click',() => act('selectTeam',team.id));
      return button;
    }));
  }
  function renderBoard() {
    const current = state.teams.find(team => team.id === state.turnTeamId);
    $('#turn-name').textContent = current.name;
    $('#turn-order').textContent = state.teams.map(team => team.name).join(' → ');
    const latest = clues.get(state.completedClueIds.at(-1));
    $('#last-answer').hidden = !latest;
    $('#last-answer').textContent = latest ? text(latest.category.title) + ' · ' + text(latest.answer) : '';
    $('#board').style.setProperty('--board-columns', state.categoryIds.length);
    const shown = boardPack();
    const rowCount = Math.max(...state.categoryIds.map(id => shown.categories.find(item => item.id === id).clues.length));
    $('#board').style.setProperty('--rows', rowCount);
    $('#board').classList.toggle('tall-board', rowCount > 5); // The final's 7 rows use compact tiles to fit a TV screen.
    $('#board').replaceChildren(...state.categoryIds.map((id,index) => {
      const category = shown.categories.find(item => item.id === id);
      const column = element('section','category-column');
      const heading = element('div','category-heading');
      heading.append(element('span','',String(index+1).padStart(2,'0')),element('h2','',text(category.title)));
      column.append(heading);
      category.clues.forEach(clue => {
        const playable = engine.getClue(state,clue.id)?.playable;
        const used = state.completedClueIds.includes(clue.id);
        const button = element('button','clue-tile' + (used ? ' used' : !playable ? ' draft' : ''),used ? '✓' : String(clue.value));
        button.type = 'button'; button.disabled = used || !playable;
        button.dataset.clue = clue.id;
        button.ariaLabel = text(category.title) + ' · ' + clue.value + (used ? ' · ' + copy().played : !playable ? ' · ' + copy().draft : '');
        if (!playable) button.append(element('small','',copy().draft));
        if (used) button.append(element('small','',copy().played));
        button.addEventListener('click',() => act('openClue',clue.id));
        column.append(button);
      });
      return column;
    }));
    const total = state.clueCatalog.filter(clue => clue.playable).length;
    $('#progress').textContent = state.completedClueIds.length + ' / ' + total + ' ' + copy().done;
    $('#undo').disabled = !engine.canUndo(state);
    $('#reactions-toggle').textContent = reactionsEnabled ? copy().on : copy().off;
    $('#reactions-toggle').setAttribute('aria-pressed',String(reactionsEnabled));
    $('#stage-label').textContent = tour ? (tour.stage < tour.heats.length ? copy().heat(tour.stage+1,tour.heats.length) : copy().final) : copy().single;
    $('#end-round').hidden = !tour || engine.isComplete(state);
    if (!engine.isComplete(state)) { clearTimeout(roundTimeout); roundShown = false; }
    if (engine.isComplete(state) && !roundShown) { roundShown = true; save(); roundTimeout = setTimeout(() => { if (state && engine.isComplete(state)) showRound(); },2800); }
    $('#standings').hidden = !engine.isComplete(state);
    if (engine.isComplete(state)) {
      const top = Math.max(...state.teams.map(team => team.score));
      const winners = state.teams.filter(team => team.score === top);
      $('#standings').replaceChildren(element('p','eyebrow',winners.length > 1 ? copy().tie : copy().winner),element('h2','',winners.map(team => team.name).join(' & ')),element('p','',top + ' ' + copy().points));
    }
  }
  // Every judged answer of the current board, with team names and answer times.
  function stageAttempts() {
    const stage = tour ? tour.stage : 0;
    return state.attempts.map(attempt => { const t = answerTimes[stage + '|' + attempt.clueId + '|' + attempt.teamId]; return {team: state.teams.find(team => team.id === attempt.teamId)?.name || '', sign: attempt.sign, value: attempt.value, seconds: typeof t === 'number' ? t : t?.s, doubled: !!t?.d}; });
  }
  function funFacts(onlyThisBoard) {
    const all = (!onlyThisBoard && tour ? tour.results.slice(0, tour.stage).flatMap(result => result.attempts || []) : []).concat(stageAttempts());
    const nb = language === 'nb';
    const sec = n => n.toFixed(1).replace('.0','') + (nb ? ' sek' : ' s');
    const facts = [];
    const timed = all.filter(item => item.sign === 1 && typeof item.seconds === 'number' && item.seconds >= 0.5);
    const fastest = timed.slice().sort((a,b) => a.seconds - b.seconds)[0];
    facts.push(fastest ? {label: nb ? 'Lynrask' : 'Lightning fingers', team: fastest.team, value: sec(fastest.seconds)} : {label: nb ? 'Lynrask' : 'Lightning fingers', team: '', value: '–'});
    const closest = timed.filter(item => timerDuration - item.seconds < 3).sort((a,b) => (timerDuration - a.seconds) - (timerDuration - b.seconds))[0];
    facts.push(closest ? {label: nb ? 'Fotofinish' : 'Photo finish', team: closest.team, value: sec(Math.max(0, timerDuration - closest.seconds)) + (nb ? ' igjen' : ' left')} : {label: nb ? 'Fotofinish' : 'Photo finish', team: '', value: nb ? 'Ingen nære' : 'No close calls'});
    const streaks = {}; const run = {};
    all.forEach(item => { run[item.team] = item.sign === 1 ? (run[item.team] || 0) + 1 : 0; streaks[item.team] = Math.max(streaks[item.team] || 0, run[item.team]); });
    const hot = Object.entries(streaks).sort((a,b) => b[1] - a[1])[0];
    facts.push(hot && hot[1] > 1 ? {label: nb ? 'Het rekke' : 'Hot streak', team: hot[0], value: hot[1] + (nb ? ' på rad' : ' in a row')} : {label: nb ? 'Het rekke' : 'Hot streak', team: '', value: '–'});
    const gamble = all.filter(item => item.doubled).sort((a,b) => b.value - a.value)[0];
    facts.push(gamble ? {label: nb ? 'Største sjanse' : 'Biggest gamble', team: gamble.team, value: (gamble.sign === 1 ? '+' : '−') + gamble.value} : {label: nb ? 'Største sjanse' : 'Biggest gamble', team: '', value: nb ? 'Ingen turte' : 'Nobody dared'});
    const wrong = {}; all.forEach(item => { if (item.sign !== 1) wrong[item.team] = (wrong[item.team] || 0) + 1; });
    const brave = Object.entries(wrong).sort((a,b) => b[1] - a[1])[0];
    facts.push(brave ? {label: nb ? 'Modigste gjettere' : 'Bravest guessers', team: brave[0], value: brave[1] + (nb ? ' feil' : ' wrong')} : {label: nb ? 'Modigste gjettere' : 'Bravest guessers', team: '', value: nb ? 'Ingen feil!' : 'No misses!'});
    return facts;
  }
  function factCards(facts, className) {
    return facts.map((fact,index) => { const card = element('div',className); card.style.setProperty('--i', index); card.append(element('small','',fact.label), element('strong','',fact.value)); if (fact.team) { const who = element('span','finale-fact-team'); who.append(teamIcon(fact.team,'finale-fact-icon'), document.createTextNode(fact.team)); card.append(who); } return card; });
  }
  function showFinale(result) {
    const nb = language === 'nb';
    const dialog = $('#finale-dialog');
    const prizeText = tour?.prize || '';
    $('#finale-eyebrow').textContent = result.winners.length > 1 ? (nb ? 'DELT SEIER' : 'A SHARED VICTORY') : copy().champions;
    $('#finale-winner').replaceChildren(...result.winners.map(name => { const box = element('span','finale-champ'); box.append(teamIcon(name,'finale-champ-icon'), element('span','',name)); return box; }));
    $('#finale-prize').hidden = !prizeText;
    $('#finale-prize').textContent = prizeText ? '🏆 ' + prizeText : '';
    $('#finale-scores').replaceChildren(...result.scores.map(([name,score],index) => { const row = element('li'); row.style.setProperty('--i', index); row.append(element('span','finale-rank',String(index+1)), teamIcon(name,'finale-row-icon'), element('span','finale-name',name), element('strong','',String(score))); return row; }));
    $('#finale-facts').replaceChildren(...factCards(funFacts(false),'finale-fact'));
    dialog.classList.remove('play'); void dialog.offsetWidth; dialog.classList.add('play');
    if (!dialog.open) dialog.showModal();
    startConfetti();
  }
  // Light gold confetti on a canvas behind the finale (no libraries).
  let confettiFrame = null;
  function startConfetti() {
    const canvas = $('#finale-confetti'); const ctx = canvas.getContext('2d');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ctx) return;
    const fit = () => { canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio; };
    fit();
    const colours = ['#d8b46a','#f4e3b5','#b08d4c','#fff6dc','#c94f4f'];
    const pieces = Array.from({length:140}, () => ({x:Math.random(), y:-Math.random()*1.2, s:3+Math.random()*6, v:.0012+Math.random()*.0028, d:(Math.random()-.5)*.002, r:Math.random()*6, w:(Math.random()-.5)*.2, c:colours[Math.floor(Math.random()*colours.length)]}));
    const started = performance.now();
    cancelAnimationFrame(confettiFrame);
    const step = now => {
      if (!$('#finale-dialog').open) return;
      if (canvas.width !== canvas.clientWidth * devicePixelRatio) fit();
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const fade = Math.max(0, 1 - Math.max(0, now - started - 6000) / 2500);
      pieces.forEach(p => { p.y += p.v; p.x += p.d; p.r += p.w; if (p.y > 1.05 && now - started < 6000) { p.y = -.05; p.x = Math.random(); }
        ctx.save(); ctx.globalAlpha = fade; ctx.translate(p.x*canvas.width, p.y*canvas.height); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s*devicePixelRatio/2,-p.s*devicePixelRatio/4,p.s*devicePixelRatio,p.s*devicePixelRatio/2); ctx.restore(); });
      if (fade > 0) confettiFrame = requestAnimationFrame(step);
    };
    confettiFrame = requestAnimationFrame(step);
  }
  function showRound() {
    if (!state) return;
    if (reactionDialog.open) reactionDialog.close();
    const result = standingsOf(state);
    const isFinal = !tour || tour.stage === tour.heats.length;
    if (isFinal) { showFinale(result); return; }
    $('#round-eyebrow').textContent = !tour ? (result.winners.length > 1 ? copy().tie : copy().roundWinner) : isFinal ? copy().champions : copy().heatWinner(tour.stage+1);
    $('#round-winner').replaceChildren(...result.winners.flatMap((name,index) => [...(index ? [document.createTextNode(' & ')] : []), teamIcon(name,'winner-icon'), document.createTextNode(name)]));
    const prizeText = tour?.prize || '';
    $('#round-prize').hidden = !(isFinal && prizeText);
    $('#round-prize').textContent = isFinal && prizeText ? '🏆 ' + copy().prizeLabel + ': ' + prizeText : '';
    $('#round-scores').replaceChildren(...result.scores.map(([name,score]) => { const row = element('li'); row.append(element('span','',name), element('strong','',String(score))); return row; }));
    $('#round-next').textContent = !tour || isFinal ? copy().playAgain : tour.stage + 1 < tour.heats.length ? copy().nextHeat(tour.stage+2) : copy().toFinal;
    $('#round-facts').replaceChildren(...factCards(funFacts(true),'finale-fact'));
    $('#round-dialog').classList.toggle('is-final', isFinal);
    if (!$('#round-dialog').open) $('#round-dialog').showModal();
  }
  function renderTimer() {
    $('#timer-value').textContent = String(timer.remaining).padStart(2,'0');
    $('#timer-toggle').textContent = timer.remaining === 0 ? copy().time : timer.running ? copy().pause : timer.remaining < timerDuration ? copy().paused : copy().start;
    $('#timer-toggle').disabled = timer.remaining === 0 || !!state?.resolved;
    $('#timer-reset').disabled = !!state?.resolved;
  }
  function pauseTimer() {
    if (timer.running) timer.remaining = Math.max(0,Math.ceil((timer.deadline-Date.now())/1000));
    timer.running = false;
    clearInterval(timerInterval); timerInterval = null;
    renderTimer();
  }
  function startTimer() {
    if (session.hasConflict() || timer.running || timer.remaining <= 0 || !state?.currentClueId || state.revealed || state.resolved || reactionDialog.open || document.hidden) return;
    timer.running = true; timer.deadline = Date.now() + timer.remaining * 1000;
    timerInterval = setInterval(() => {
      timer.remaining = Math.max(0,Math.ceil((timer.deadline-Date.now())/1000));
      renderTimer();
      if (timer.remaining === 0) { pauseTimer(); save(); $('#clue-status').textContent = copy().timerEnded; }
    },200);
    renderTimer(); save();
  }
  function restartTimer() {
    pauseTimer(); timer.remaining = timerDuration; renderTimer();
    if (reactionDialog.open) resumeAfterReaction = true;
    else startTimer();
  }
  function stealTeam() {
    if (!state?.currentClueId) return null;
    const index = state.teams.findIndex(team => team.id === state.selectedTeamId);
    for (let offset = 1; offset < state.teams.length; offset += 1) {
      const team = state.teams[(index + offset) % state.teams.length];
      if (!state.powerUps.find(item => item.teamId === team.id).steal && !state.attempts.some(attempt => attempt.clueId === state.currentClueId && attempt.teamId === team.id)) return team;
    }
    return null;
  }
  function renderClue() {
    if (!state.currentClueId) {
      pauseTimer();
      if (clueDialog.open) clueDialog.close();
      return;
    }
    const clue = clues.get(state.currentClueId);
    if (timer.clueId !== clue.id) { pauseTimer(); timer = {clueId:clue.id,remaining:timerDuration,running:false,deadline:0}; }
    $('#clue-category').textContent = text(clue.category.title);
    $('#clue-value').textContent = clue.value;
    $('#clue-question').textContent = text(clue.question);
    const image = $('#clue-image');
    image.hidden = !clue.image; $('#clue-stage').classList.toggle('has-image',!!clue.image);
    $('#clue-stage').classList.toggle('location-clue',clue.category.id === 'countries' && !!clue.image);
    if (clue.image) { if (image.getAttribute('src') !== clue.image) image.src = clue.image; image.alt = text(clue.imageAlt) || copy().image; } else image.removeAttribute('src');
    $('#answer').hidden = !state.revealed;
    $('#answer-text').textContent = state.revealed ? text(clue.answer) : '';
    const extra = [clue.acceptedAnswers && copy().accepts + ': ' + (Array.isArray(clue.acceptedAnswers) ? clue.acceptedAnswers.map(text).join(' · ') : text(clue.acceptedAnswers)), text(clue.explanation), text(clue.hostNote)].filter(Boolean).join('\n');
    const answerImage = $('#answer-image');
    answerImage.hidden = !state.revealed || !clue.answerImage;
    if (state.revealed && clue.answerImage) { answerImage.src=clue.answerImage; answerImage.alt=text(clue.answer); } else answerImage.removeAttribute('src');
    $('#answer-extra').textContent = state.revealed ? extra : '';
    $('#answer-extra').hidden = !state.revealed || !extra;
    $('#reveal').disabled = state.revealed;
    const answering = state.teams.find(team => team.id === state.selectedTeamId);
    $('#clue-teams').replaceChildren(...(answering ? [teamIcon(answering.name,'answering-icon')] : []), element('strong','answering-team',answering?.name || copy().pick));
    const tokens = state.powerUps.find(item => item.teamId === state.selectedTeamId);
    const locked = state.revealed || state.resolved || !answering;
    $('#power-double').disabled = locked || tokens?.double;
    $('#power-letter').disabled = locked || tokens?.letter || state.letterRevealed;
    const stealing = stealTeam();
    $('#power-steal').disabled = locked || !stealing;
    $('#power-double').textContent = '×2 ' + copy().double;
    $('#power-letter').textContent = 'A… ' + copy().letter;
    $('#power-steal').textContent = copy().steal + (stealing ? ' → ' + stealing.name : '');
    $('#power-hint').textContent = copy().powerHint;
    $('#letter-hint').hidden = !state.letterRevealed;
    const meaningfulAnswer = text(clue.answer).trim().replace(/^(?:the|a|an|en|et)\s+/i,'');
    $('#letter-hint').textContent = state.letterRevealed ? copy().firstLetter + ': ' + (meaningfulAnswer.match(/[\p{L}\p{N}]/u)?.[0] || '—') : '';
    const tried = state.attempts.some(a => a.clueId === clue.id && a.teamId === state.selectedTeamId);
    $('#correct').disabled = $('#wrong').disabled = !state.selectedTeamId || tried || state.resolved;
    const value = clue.value * (state.doubleTeamId === state.selectedTeamId ? 2 : 1);
    $('#plus-value').textContent = '+' + value; $('#minus-value').textContent = '−' + value;
    $('#clue-status').textContent = state.resolved ? copy().resolved : !state.selectedTeamId ? copy().pick : tried ? copy().tried : timer.remaining === 0 ? copy().timerEnded : '';
    $('#clue-undo').disabled = !engine.canUndo(state);
    renderTimer();
    if (!clueDialog.open) clueDialog.showModal();
  }
  function render() {
    if (session.hasConflict()) { lockConflictedSession(); return; }
    document.body.classList.toggle('playing',!!state);
    $('#setup').hidden = !!state; $('#play').hidden = !state;
    if (state) { renderScoreboard(); renderBoard(); renderClue(); }
    renderNotice();
  }
  function act(action,...args) {
    if (!checkSession()) return false;
    try {
      if (['finishClue','cancelClue','reveal','undo'].includes(action)) pauseTimer();
      state = engine[action](state,...args);
      notice = ''; restoreFailed = false; save(); render();
      if (action === 'openClue' && !state.revealed && !state.resolved) startTimer();
      return !session.hasConflict();
    } catch (error) {
      notice = ['invalid_name','duplicate_name','invalid_teams'].includes(error.code) ? copy().names : copy().error;
      renderNotice();
      if (clueDialog.open) $('#clue-status').textContent = notice;
      return false;
    }
  }
  // The tournament final gets its own pair of Sara stickers (owner's pick: #4 correct, #5 wrong).
  const finalReactions = {correct:['assets/reaction-04.webp'], wrong:['assets/reaction-05.webp']};
  Object.values(finalReactions).flat().forEach(src => { new Image().src = src; });
  function showReaction(kind,value,team,src) {
    pauseTimer(); clearTimeout(reactionTimeout);
    const list = (tour && tour.stage === tour.heats.length ? finalReactions[kind] : null) || pack.reactions[kind] || [];
    const image = src || list[reactionIndex[kind]++ % list.length];
    if (!image) return;
    reactionDialog.classList.toggle('wrong',kind === 'wrong');
    reactionDialog.dataset.effect = reactionEffects[kind][effectIndex[kind]++ % reactionEffects[kind].length];
    $('#reaction-heading').textContent = kind === 'correct' ? copy().correct : copy().incorrect;
    $('#reaction-image').src = image;
    $('#reaction-points').textContent = value == null ? (kind === 'correct' ? '✓' : '×') : (kind === 'correct' ? '+' : '−') + value;
    // The team's emblem sits next to its name, like on the scoreboard.
    $('#reaction-team').replaceChildren(...(team ? [teamIcon(team,'reaction-team-icon')] : []), document.createTextNode(team || copy().preview));
    if (!reactionDialog.open) reactionDialog.showModal();
    reactionTimeout = setTimeout(() => { if (reactionDialog.open) reactionDialog.close(); },2600);
  }
  function award(sign) {
    const clue = clues.get(state.currentClueId);
    const team = state.teams.find(team => team.id === state.selectedTeamId);
    const value = clue.value * (state.doubleTeamId === team.id ? 2 : 1);
    const seconds = timer.running ? timerDuration - Math.max(0,(timer.deadline - Date.now()) / 1000) : timerDuration - timer.remaining;
    answerTimes[(tour ? tour.stage : 0) + '|' + clue.id + '|' + team.id] = {s: Math.max(0, Math.round(seconds * 10) / 10), d: state.doubleTeamId === team.id};
    pauseTimer(); resumeAfterReaction = false;
    if (act('answerClue',sign)) {
      if (reactionsEnabled) showReaction(sign === 1 ? 'correct' : 'wrong',value,team.name);
    }
  }
  // Any tab that observes a newer save must reload before taking control.
  window.addEventListener('storage', event => { if (event.key === STORE || event.key === null) checkSession(); });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button && button.id !== 'reload-game' && !checkSession()) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('submit', event => {
    if (!checkSession()) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  $('#conflict-dialog').addEventListener('cancel', event => event.preventDefault());
  $('#reload-game').addEventListener('click', () => window.location.reload());
  // Small local cutouts are ready before the first scoring decision.
  Object.values(pack.reactions).flat().forEach(src => { const image = new Image(); image.src = src; });
  document.querySelectorAll('input[name="mode"]').forEach(input => input.addEventListener('change', () => {
    readNames(); mode = input.value === 'tournament' ? 'tournament' : 'single';
    if (mode === 'single' && names.length > 6) names = names.slice(0,6);
    if (mode === 'tournament') while (names.length < 4) names.push(partyTeams[names.length] && !names.includes(partyTeams[names.length]) ? partyTeams[names.length] : copy().team + ' ' + (names.length+1));
    tour = null; save(); renderSetup();
  }));
  $('#heat-count').addEventListener('change', () => { readNames(); heatCount = Number($('#heat-count').value); tour = null; save(); renderSetup(); });
  $('#prize').addEventListener('input', () => { prize = $('#prize').value.slice(0,80); if (tour) tour.prize = prize.trim(); save(); });
  // Renaming a team keeps its heat and the chosen categories; only a different team count re-plans the heats.
  function syncTeams() {
    if (state) return;
    const old = names.slice(); readNames();
    if (mode !== 'tournament') { save(); return; }
    const planned = tour && tour.stage === 0 && !tour.results.length;
    const headings = [...document.querySelectorAll('#tour-plan .tour-heat h3')];
    if (planned && old.length === names.length && tour.heats.flatMap(heat => heat.teams).length === names.length && headings.length === tour.heats.length + 1) {
      const rename = new Map(old.map((name,index) => [name.trim(), names[index].trim()]));
      tour.heats.forEach((heat,index) => { heat.teams = heat.teams.map(team => rename.has(team) ? rename.get(team) : team); headings[index].textContent = heat.teams.join(' · '); });
    } else { tour = planned ? planTour(tour) : null; renderPlan(); }
    save();
  }
  // A new or removed team must be in the plan, keeping the chosen categories.
  function replanTeams() { if (mode === 'tournament' && !state && tour && tour.stage === 0 && !tour.results.length) { tour = planTour(tour); save(); } }
  $('#team-inputs').addEventListener('input', syncTeams);
  $('#team-inputs').addEventListener('change', syncTeams);
  $('#end-round').addEventListener('click', () => $('#end-round-dialog').showModal());
  $('#confirm-end-round').addEventListener('click', () => { $('#end-round-dialog').close(); if (state?.currentClueId) act('cancelClue'); roundShown = true; save(); showRound(); });
  $('#round-back').addEventListener('click', () => $('#round-dialog').close());
  $('#finale-back').addEventListener('click', () => $('#finale-dialog').close());
  $('#finale-new').addEventListener('click', () => { $('#finale-dialog').close(); $('#confirm-reset').click(); });
  $('#round-next').addEventListener('click', () => {
    if (!checkSession()) return;
    $('#round-dialog').close();
    const isFinal = !tour || tour.stage === tour.heats.length;
    if (isFinal) { $('#confirm-reset').click(); return; }
    tour.results[tour.stage] = {...standingsOf(state), attempts: stageAttempts()};
    tour.stage += 1;
    try { startStage(); } catch { notice = copy().error; }
    save(); render(); window.scrollTo({top:0});
  });
  $('#team-form').addEventListener('submit',event => {
    event.preventDefault(); readNames();
    if (mode === 'tournament') {
      // Start should just work: top up to four teams with the party's own team names, and use only as many heats as the teams can fill.
      const filled = names.filter(name => name.trim());
      if (filled.length < 4) { names = filled; partyTeams.forEach(team => { if (names.length < 4 && !names.some(name => name.trim().toLocaleLowerCase('en') === team.toLocaleLowerCase('en'))) names.push(team); }); while (names.length < 4) names.push(copy().team + ' ' + (names.length + 1)); tour = null; }
      if (names.length < heatCount * 2) { heatCount = Math.max(2, Math.min(4, Math.floor(names.length / 2))); tour = null; }
      if (names.length > 12) { notice = copy().tourTeams; renderNotice(); return; }
      const trimmed = names.map(name => name.trim());
      if (trimmed.some(name => !name || name.length > 40 || /[\u0000-\u001f\u007f]/.test(name)) || new Set(trimmed.map(name => name.toLocaleLowerCase('en'))).size !== trimmed.length) { notice = copy().names; renderNotice(); return; }
      names = trimmed;
      // The plan must hold exactly the teams in the name boxes (an older saved plan could still say "Team 4"); keep its category choices.
      const sameTeams = tour && tour.stage === 0 && [...tour.heats.flatMap(heat => heat.teams)].sort().join('|') === [...names].sort().join('|');
      if (!tour || tour.stage !== 0) tour = planTour(); else if (!sameTeams) tour = planTour(tour);
      tour.prize = prize.trim();
      try { startStage(); save(); render(); window.scrollTo({top:0}); } catch { notice = copy().names; renderNotice(); }
      return;
    }
    tour = null;
    if (!selectedCategoryIds.length) { notice=copy().chooseSix; renderNotice(); return; }
    try { state = engine.create(names,pack,selectedCategoryIds); roundShown=false; notice=''; restoreFailed=false; timer={clueId:null,remaining:timerDuration,running:false,deadline:0}; save(); render(); window.scrollTo({top:0}); }
    catch { notice=copy().names; renderNotice(); }
  });
  $('#pack-export').addEventListener('click', () => {
    const url=URL.createObjectURL(new Blob([packTools.exportPack(pack)],{type:'application/json'}));
    const link=element('a'); link.href=url; link.download=pack.id + '.json'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  $('#pack-import').addEventListener('change', async event => {
    if (!checkSession() || state) return;
    const file=event.target.files[0];
    if (!file) return;
    try {
      if (file.size > packTools.MAX_BYTES) throw new Error('too_large');
      const imported=packTools.parse(await file.text(),trustedImages);
      if (!checkSession() || state) return;
      engine.create(['Validation A','Validation B'],imported,imported.defaultCategoryIds);
      privatePack=imported; pack={...imported,reactions:publicPack.reactions}; selectedCategoryIds=defaultCategories();
      indexClues(); save(); renderCategories(); $('#pack-status').textContent=copy().packLoaded;
    } catch { $('#pack-status').textContent=copy().packFailed; }
    event.target.value='';
  });
  $('#pack-default').addEventListener('click', () => {
    if (state) return;
    privatePack=null; pack=selectedFaceIds.length === 5 ? faceTools.buildPack(publicPack,selectedFaceIds) : publicPack; selectedCategoryIds=defaultCategories(); indexClues(); save(); renderCategories(); $('#pack-status').textContent='';
  });
  $('#all-categories').addEventListener('click', () => { selectedCategoryIds = pack.categories.filter(category => category.clues.every(clue => !clue.draft)).map(category => category.id); save(); renderCategories(); });
  $('#clear-categories').addEventListener('click', () => { selectedCategoryIds = []; save(); renderCategories(); });
  $('#default-categories').addEventListener('click', () => { selectedCategoryIds=defaultCategories(); save(); renderCategories(); });
  $('#timer-duration').addEventListener('change', () => { if (!checkSession()) return; timerDuration=Number($('#timer-duration').value); timer.remaining=timerDuration; save(); });
  $('#adjust-open').addEventListener('click', () => { renderAdjustments(); $('#adjust-error').textContent=''; $('#adjust-reason').value=''; $('#adjust-dialog').showModal(); });
  $('#adjust-form').addEventListener('submit', event => {
    event.preventDefault();
    const amount = Number($('#adjust-amount').value);
    const reason = $('#adjust-reason').value.trim();
    if (!Number.isSafeInteger(amount) || amount === 0 || Math.abs(amount) > 1000000 || !reason || reason.length > 160 || /[\u0000-\u001f\u007f]/.test(reason)) { $('#adjust-error').textContent=copy().adjustmentError; return; }
    if (act('adjustScore',$('#adjust-team').value,amount,reason)) $('#adjust-dialog').close();
  });
  $('#add-team').addEventListener('click',() => { readNames(); if(names.length<maxTeams()) { const next = partyTeams.find(team => !names.some(name => name.trim().toLocaleLowerCase('en') === team.toLocaleLowerCase('en'))); names.push(next || copy().team+' '+(names.length+1)); } replanTeams(); renderSetup(); $('#team-inputs').lastElementChild?.querySelector('input')?.focus(); });
  $('#remove-team').addEventListener('click',() => { readNames(); if(names.length>2) names.pop(); replanTeams(); renderSetup(); });
  $('#language').addEventListener('click',() => {
    if (!state) readNames();
    language = language === 'en' ? 'nb' : 'en'; renderLocale(); renderSetup(); renderGallery(); save(); render();
  });
  $('#help-open').addEventListener('click',() => { pauseTimer(); $('#help-dialog').showModal(); });
  // Guest-facing rules: four big slides to show on the TV before the first heat.
  let rulesIndex = 0;
  function rulesSlides() {
    const nb = language === 'nb';
    const seconds = timerDuration;
    // No Sara stickers here: the reaction faces stay a surprise until the game.
    const card = (title, body) => { const box = element('div','rules-power'); box.append(element('strong','',title), element('p','',body)); return box; };
    const list = items => { const ol = element('ol','rules-list'); items.forEach(item => ol.append(element('li','',item))); return ol; };
    return [
      {eyebrow: nb ? 'SLIK SPILLER DERE' : 'HOW IT WORKS', title: nb ? 'Velg. Svar. Vinn.' : 'Pick. Answer. Win.', body: list(nb ? [
        'Lagene bytter på å velge en kategori og en sum.',
        'Dere har ' + seconds + ' sekunder på å svare.',
        'Riktig svar: dere vinner poengene. Feil svar: dere mister dem.',
        'Høyere sum, vanskeligere spørsmål.'
      ] : [
        'Teams take turns picking a category and an amount.',
        'You have ' + seconds + ' seconds to answer.',
        'Right answer: you win the points. Wrong answer: you lose them.',
        'Bigger number, harder question.'
      ])},
      {eyebrow: nb ? 'TRE HEMMELIGE VÅPEN' : 'THREE SECRET WEAPONS', title: nb ? 'Hvert lag: én gang hver per runde' : 'Each team: once each per round', body: (() => { const row = element('div','rules-powers'); row.append(
        card('×2 ' + (nb ? 'Doble poeng' : 'Double Up'), nb ? 'Sikre på svaret? Dobbelt så mange poeng. Men feil svar gir dobbelt tap.' : 'Sure of your answer? Double the points. But a wrong answer costs double.'),
        card('A… ' + (nb ? 'Første bokstav' : 'First Letter'), nb ? 'Står dere fast? Verten avslører første bokstav i svaret.' : 'Stuck? The host reveals the first letter of the answer.'),
        card(nb ? 'Stjel' : 'Steal', nb ? 'Tror dere de andre bommer? Ta spørsmålet deres og svar selv.' : 'Think the other team will miss? Take their question and answer it yourselves.')
      ); return row; })(), note: nb ? 'Si ifra før svaret vises. Brukt er brukt.' : 'Call it before the answer is revealed. Once it’s used, it’s gone.'},
      {eyebrow: nb ? 'TURNERINGEN' : 'THE TOURNAMENT', title: nb ? 'Innledende runder, så finalen' : 'Heats, then the final', body: list(nb ? [
        'Lagene er delt i ' + heatCount + ' innledende runder. Hver runde har sitt eget brett.',
        'Vinneren av hver runde går videre til finalen.',
        'Finalen er større: sju rader, opptil 700 poeng per spørsmål.',
        'I finalen får hvert lag alle tre hemmelige våpen tilbake.'
      ] : [
        'The teams are split into ' + heatCount + ' heats. Every heat has its own board.',
        'The winner of each heat goes through to the final.',
        'The final is bigger: seven rows, up to 700 points a question.',
        'In the final, every team gets all three secret weapons back.'
      ])},
      {eyebrow: nb ? 'KLARE?' : 'READY?', title: nb ? 'Løft glassene.' : 'Raise your glasses.', body: (() => { const box = element('div','rules-ready'); const photo = element('img'); photo.src = '../assets/sara-gatsby-toast.jpg'; photo.alt = nb ? 'Sara skåler med champagne' : 'Sara raising a glass of champagne'; box.append(photo, element('p','', prize.trim() ? (nb ? 'Premien: ' : 'The prize: ') + prize.trim() : (nb ? 'Ære, berømmelse og evig skryt.' : 'Glory, fame and bragging rights forever.'))); return box; })()}
    ];
  }
  function renderRules() {
    const slides = rulesSlides();
    rulesIndex = Math.max(0, Math.min(slides.length - 1, rulesIndex));
    const slide = slides[rulesIndex];
    const parts = [element('p','eyebrow',slide.eyebrow), element('h2','',slide.title), slide.body];
    if (slide.note) parts.push(element('p','rules-note',slide.note));
    $('#rules-slide').replaceChildren(...parts);
    $('#rules-dots').textContent = slides.map((_,index) => index === rulesIndex ? '●' : '○').join(' ');
    $('#rules-prev').disabled = rulesIndex === 0;
    $('#rules-next').textContent = rulesIndex === slides.length - 1 ? (language === 'nb' ? 'La lekene begynne' : 'Let the games begin') : (language === 'nb' ? 'Neste →' : 'Next →');
  }
  document.querySelectorAll('.rules-open').forEach(button => button.addEventListener('click',() => { pauseTimer(); readNames(); rulesIndex = 0; renderRules(); $('#rules-dialog').showModal(); }));
  $('#rules-prev').addEventListener('click',() => { rulesIndex -= 1; renderRules(); });
  $('#rules-next').addEventListener('click',() => { if (rulesIndex >= rulesSlides().length - 1) { $('#rules-dialog').close(); return; } rulesIndex += 1; renderRules(); });
  $('#rules-dialog').addEventListener('keydown', event => { if (event.key === 'ArrowRight') $('#rules-next').click(); if (event.key === 'ArrowLeft' && rulesIndex > 0) $('#rules-prev').click(); });
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click',() => document.getElementById(button.dataset.close).close()));
  $('#fullscreen').addEventListener('click',async () => {
    try { if(document.fullscreenElement) await document.exitFullscreen(); else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else throw new Error(); }
    catch { notice=copy().fullscreen; renderNotice(); }
  });
  $('#undo').addEventListener('click',() => act('undo'));
  $('#clue-undo').addEventListener('click',() => act('undo'));
  $('#new-game').addEventListener('click',() => $('#reset-dialog').showModal());
  $('#confirm-reset').addEventListener('click',() => {
    if (tour) names = tour.heats.flatMap(heat => heat.teams); else names = state.teams.map(team => team.name); state=null; tour=null; roundShown=false; answerTimes={}; pauseTimer(); timer={clueId:null,remaining:timerDuration,running:false,deadline:0}; restoreFailed=false; notice=''; save();
    $('#reset-dialog').close(); renderSetup(); render(); $('#setup').scrollIntoView({block:'start'});
  });
  $('#clue-cancel').addEventListener('click',() => act('cancelClue'));
  clueDialog.addEventListener('cancel',event => { event.preventDefault(); act('cancelClue'); });
  $('#clue-finish').addEventListener('click',() => act('finishClue'));
  $('#reveal').addEventListener('click',() => act('reveal'));
  $('#correct').addEventListener('click',() => award(1));
  $('#wrong').addEventListener('click',() => award(-1));
  $('#reactions-toggle').addEventListener('click',() => { reactionsEnabled=!reactionsEnabled; save(); renderBoard(); });
  $('#reaction-close').addEventListener('click',() => reactionDialog.close());
  reactionDialog.addEventListener('close',() => { clearTimeout(reactionTimeout); if (resumeAfterReaction) { resumeAfterReaction=false; startTimer(); } });
  // Using a power pops up its own Sara sticker for a moment (only when reactions are on).
  const powerFaces = {double:'assets/reaction-03.webp', letter:'assets/reaction-07.webp', steal:'assets/reaction-08.webp'};
  Object.values(powerFaces).forEach(src => { new Image().src = src; });
  let powerPopTimeout = null;
  function powerPop(power, label) {
    if (!reactionsEnabled) return;
    $('#clue-dialog').querySelector('.power-pop')?.remove(); clearTimeout(powerPopTimeout);
    const pop = element('div','power-pop'); const face = element('img'); face.src = powerFaces[power]; face.alt = '';
    pop.append(face, element('strong','',label));
    $('#clue-dialog').append(pop);
    powerPopTimeout = setTimeout(() => pop.remove(), 1800);
  }
  $('#power-double').addEventListener('click',() => { const label = $('#power-double').textContent; if (act('usePower','double')) powerPop('double', label); });
  $('#power-letter').addEventListener('click',() => { const label = $('#power-letter').textContent; if (act('usePower','letter')) powerPop('letter', label); });
  $('#power-steal').addEventListener('click',() => { const team = stealTeam(); const label = $('#power-steal').textContent; if (team && act('usePower','steal',team.id)) { restartTimer(); powerPop('steal', label); } });
  $('#timer-toggle').addEventListener('click',() => {
    if(timer.running){pauseTimer();save();return;}
    startTimer();
  });
  $('#timer-reset').addEventListener('click',() => { pauseTimer();timer.remaining=timerDuration;renderClue();save(); });
  document.addEventListener('visibilitychange',() => { if(document.hidden){pauseTimer();save();} });
  window.addEventListener('pagehide',() => {pauseTimer();save();});
  renderLocale(); renderSetup(); renderGallery(); render();
})();
