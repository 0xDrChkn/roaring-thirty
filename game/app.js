(() => {
  'use strict';
  const engine = window.BirthdayGameEngine;
  const publicPack = window.BIRTHDAY_GAME_PACK;
  const faceTools = window.BirthdayCelebrityFaces;
  const defaultFaceIds = ['dicaprio','gordon-ramsay','marilyn-monroe','rihanna','ryan-gosling'].filter(id => faceTools.portraits.some(portrait => portrait.id === id));
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
    footer:'PENT ANTREKK. VENNSKAPELIG RIVALISERING.', backInvite:'Tilbake til invitasjonen ↗',
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
    en:{team:'Team',draft:'To prepare',played:'Played',done:'clues played',paused:'Resume timer',pause:'Pause',start:'Start timer',time:'Time’s up',on:'Sara reactions: on',off:'Sara reactions: off',pick:'Choose the answering team.',tried:'This team has already tried. Choose another team or undo.',resolved:'Points awarded. Finish the clue when ready.',wrong:'Wrong answer: points deducted and clue removed from the board.',savedError:'This browser cannot save your game. Keep this page open to retain your scores.',restoreError:'The saved game could not be restored with this question pack. Start a new game below.',names:'Give each team a different name (1–40 characters).',error:'That action could not be completed. Please try again.',fullscreen:'Full screen is unavailable here. You can use your browser’s full-screen control.',preview:'Reaction preview',correct:'CORRECT ANSWER',incorrect:'WRONG ANSWER',winner:'THE WINNING TEAM',tie:'HONOURS SHARED',points:'points',back:'Return to board',close:'Close',seconds:'Seconds remaining',resetTimer:'Reset timer',reaction:'Sara reaction',image:'Picture clue',selected:'Selected',timerEnded:'Time is up. The host decides whether to accept an answer.'},
    nb:{team:'Lag',draft:'Må klargjøres',played:'Spilt',done:'spørsmål spilt',paused:'Fortsett klokken',pause:'Pause',start:'Start klokken',time:'Tiden er ute',on:'Sara-reaksjoner: på',off:'Sara-reaksjoner: av',pick:'Velg laget som svarer.',tried:'Dette laget har allerede prøvd. Velg et annet lag eller angre.',resolved:'Poengene er gitt. Avslutt spørsmålet når dere er klare.',wrong:'Feil svar: poengene trekkes fra og spørsmålet fjernes fra brettet.',savedError:'Nettleseren kan ikke lagre spillet. Hold siden åpen for å beholde poengene.',restoreError:'Det lagrede spillet kunne ikke hentes med denne spørsmålspakken. Start et nytt spill nedenfor.',names:'Gi hvert lag et eget navn (1–40 tegn).',error:'Handlingen kunne ikke fullføres. Prøv igjen.',fullscreen:'Fullskjerm er ikke tilgjengelig her. Bruk nettleserens fullskjermfunksjon.',preview:'Prøv en reaksjon',correct:'RIKTIG SVAR',incorrect:'FEIL SVAR',winner:'VINNERLAGET',tie:'DELT SEIER',points:'poeng',back:'Tilbake til brettet',close:'Lukk',seconds:'Sekunder igjen',resetTimer:'Nullstill klokken',reaction:'Sara reagerer',image:'Bildespørsmål',selected:'Valgt',timerEnded:'Tiden er ute. Verten avgjør om svaret godtas.'}
  };
  Object.assign(ui.en, {packLoaded:'Private pack loaded. Choose categories below.', packFailed:'The pack could not be loaded. Check the JSON format, category IDs, five clue values per category and embedded images (maximum 2 MB). Your previous bank is unchanged.', selectedCategories:'categories selected', ready:'ready', unfinished:'to prepare', chooseSix:'Choose at least one category to start.', adjustmentError:'Enter a non-zero whole number and a short reason.', adjustments:'Recent corrections', accepts:'Also accept', context:'For the host'});
  Object.assign(ui.nb, {packLoaded:'Privat pakke lastet inn. Velg kategorier nedenfor.', packFailed:'Pakken kunne ikke lastes inn. Sjekk JSON-formatet, kategori-ID-ene, fem poengverdier per kategori og innebygde bilder (maks 2 MB). Den forrige banken er uendret.', selectedCategories:'kategorier valgt', ready:'klare', unfinished:'må klargjøres', chooseSix:'Velg minst én kategori for å starte.', adjustmentError:'Skriv inn et heltall som ikke er null, og en kort begrunnelse.', adjustments:'Siste endringer', accepts:'Godta også', context:'Til verten'});
  Object.assign(ui.en, {heat:(n,total) => 'HEAT ' + n + ' OF ' + total, final:'THE FINAL', single:'THE GREAT MATILDA · THE GAME', heatWinner:n => 'HEAT ' + n + ' · THROUGH TO THE FINAL', champions:'THE CHAMPIONS', roundWinner:'THE WINNING TEAM', nextHeat:n => 'On to heat ' + n + ' →', toFinal:'On to the final →', playAgain:'Start a new game', prizeLabel:'The prize', tourTeams:'Make at least two teams per heat (4–12 teams in total).', planTitle:'The tournament plan', planHint:'Teams and boards are shuffled. Each heat has its own four categories; the final gets six fresh ones.', reshuffle:'Shuffle again', heatName:n => 'Heat ' + n, finalName:'Final', finalTeams:'Heat winners', startTour:'Start the tournament'});
  Object.assign(ui.nb, {heat:(n,total) => 'RUNDE ' + n + ' AV ' + total, final:'FINALEN', single:'THE GREAT MATILDA · SPILLET', heatWinner:n => 'RUNDE ' + n + ' · VIDERE TIL FINALEN', champions:'MESTERNE', roundWinner:'VINNERLAGET', nextHeat:n => 'Videre til runde ' + n + ' →', toFinal:'Videre til finalen →', playAgain:'Start et nytt spill', prizeLabel:'Premien', tourTeams:'Lag minst to lag per runde (4–12 lag totalt).', planTitle:'Turneringsplanen', planHint:'Lag og brett er stokket. Hver runde har sine egne fire kategorier; finalen får seks nye.', reshuffle:'Stokk på nytt', heatName:n => 'Runde ' + n, finalName:'Finale', finalTeams:'Rundevinnerne', startTour:'Start turneringen'});
  Object.assign(ui.en, {turn:'YOUR TURN', answeringNow:'Answering', double:'Double Up', letter:'First Letter', steal:'Steal', spent:'used', available:'available', firstLetter:'First letter', nextTurn:'Next turn', powerHint:'One of each per team per round. Double Up doubles the gain or loss. Steal passes to the next eligible team before judging or revealing the answer.'});
  Object.assign(ui.nb, {turn:'DERES TUR', answeringNow:'Svarer', double:'Doble poeng', letter:'Første bokstav', steal:'Stjel', spent:'brukt', available:'tilgjengelig', firstLetter:'Første bokstav', nextTurn:'Neste tur', powerHint:'Én av hver per lag per runde. Doble poeng dobler gevinst eller tap. Stjel gir spørsmålet til neste tilgjengelige lag før svaret vurderes eller vises.'});
  const timerDurations = [15,30,45,60,90,120];
  const defaultCategories = () => (pack.defaultCategoryIds || pack.categories.slice(0,6).map(category => category.id)).slice();
  let selectedCategoryIds = defaultCategories();
  let timerDuration = 45;
  let language = 'en';
  let state = null;
  let names = ['The Bootleggers', 'Champagne Problems', 'The Old Sports'];
  // Tournament: heats on their own smaller boards, then the heat winners play the final.
  let mode = 'single';
  let heatCount = 2;
  let prize = '';
  let tour = null;
  let roundShown = false;
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
  function indexClues() {
    clues.clear();
    pack.categories.forEach(category => category.clues.forEach(clue => clues.set(clue.id, { ...clue, category })));
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
      const result = session.write(JSON.stringify({state,selectedFaceIds,language,reactionsEnabled,selectedCategoryIds,timerDuration,privatePack,mode,heatCount,prize,tour,roundShown,timer:{clueId:timer.clueId,remaining:timer.remaining}}));
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
  function planTour() {
    const teams = shuffle(names.map(name => name.trim()));
    const heats = Array.from({length:heatCount}, () => ({teams:[], categoryIds:[]}));
    teams.forEach((name,index) => heats[index % heatCount].teams.push(name));
    const ready = pack.categories.filter(category => category.clues.every(clue => !clue.draft)).map(category => category.id);
    const pool = shuffle(ready);
    const perHeat = Math.max(1, Math.min(4, Math.floor((pool.length - 6) / heatCount) || Math.floor(pool.length / (heatCount + 1))));
    let next = 0;
    const take = count => Array.from({length:count}, () => pool[next++ % pool.length]);
    heats.forEach(heat => { heat.categoryIds = take(perHeat); });
    const finalCategoryIds = [...new Set(take(Math.min(6, pool.length)))];
    return {heats, finalCategoryIds, stage:0, results:[], prize:prize.trim()};
  }
  const finalists = () => tour.results.flatMap(result => result.winners).slice(0,6);
  function stageTeams() { return tour.stage < tour.heats.length ? tour.heats[tour.stage].teams : finalists(); }
  function stageCategories() { return tour.stage < tour.heats.length ? tour.heats[tour.stage].categoryIds : tour.finalCategoryIds; }
  function startStage() {
    state = engine.create(stageTeams(), pack, stageCategories());
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
    const card = (label, teams, ids) => { const box = element('section','tour-heat'); box.append(element('p','eyebrow',label), element('h3','',teams), element('p','tour-cats',ids.map(title).join(' · '))); return box; };
    const reshuffle = element('button','text-button',copy().reshuffle); reshuffle.type = 'button';
    reshuffle.addEventListener('click', () => { readNames(); tour = planTour(); save(); renderPlan(); });
    plan.replaceChildren(element('p','form-hint',copy().planHint), ...tour.heats.map((heat,index) => card(copy().heatName(index+1), heat.teams.join(' · '), heat.categoryIds)), card(copy().finalName, copy().finalTeams, tour.finalCategoryIds), reshuffle);
  }
  try {
    const saved = JSON.parse(initialSave.raw || 'null');
    if (saved) {
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
      roundShown = saved.roundShown === true;
      if (saved.state) {
        state = engine.restore(saved.state, pack);
        restoreFailed = !state;
        if (state) { names = state.teams.map(team => team.name); selectedCategoryIds = state.categoryIds.slice(); }
      }
      if (state?.currentClueId && saved.timer?.clueId === state.currentClueId && Number.isInteger(saved.timer.remaining) && saved.timer.remaining >= 0 && saved.timer.remaining <= timerDuration) timer = {...timer,clueId:saved.timer.clueId,remaining:saved.timer.remaining};
    }
  } catch { restoreFailed = true; }
  indexClues();
  function renderNotice() {
    $('#notice').textContent = storageFailed ? copy().savedError : restoreFailed ? copy().restoreError : notice;
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
      details.append(powers); button.append(details,element('strong','',String(team.score)));
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
    $('#board').replaceChildren(...state.categoryIds.map((id,index) => {
      const category = pack.categories.find(item => item.id === id);
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
  function showRound() {
    if (!state) return;
    if (reactionDialog.open) reactionDialog.close();
    const result = standingsOf(state);
    const isFinal = !tour || tour.stage === tour.heats.length;
    $('#round-eyebrow').textContent = !tour ? (result.winners.length > 1 ? copy().tie : copy().roundWinner) : isFinal ? copy().champions : copy().heatWinner(tour.stage+1);
    $('#round-winner').textContent = result.winners.join(' & ');
    const prizeText = tour?.prize || '';
    $('#round-prize').hidden = !(isFinal && prizeText);
    $('#round-prize').textContent = isFinal && prizeText ? '🏆 ' + copy().prizeLabel + ': ' + prizeText : '';
    $('#round-scores').replaceChildren(...result.scores.map(([name,score]) => { const row = element('li'); row.append(element('span','',name), element('strong','',String(score))); return row; }));
    $('#round-next').textContent = !tour || isFinal ? copy().playAgain : tour.stage + 1 < tour.heats.length ? copy().nextHeat(tour.stage+2) : copy().toFinal;
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
    $('#clue-teams').replaceChildren(element('strong','answering-team',answering?.name || copy().pick));
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
  function showReaction(kind,value,team,src) {
    pauseTimer(); clearTimeout(reactionTimeout);
    const list = pack.reactions[kind] || [];
    const image = src || list[reactionIndex[kind]++ % list.length];
    if (!image) return;
    reactionDialog.classList.toggle('wrong',kind === 'wrong');
    reactionDialog.dataset.effect = reactionEffects[kind][effectIndex[kind]++ % reactionEffects[kind].length];
    $('#reaction-heading').textContent = kind === 'correct' ? copy().correct : copy().incorrect;
    $('#reaction-image').src = image;
    $('#reaction-points').textContent = value == null ? (kind === 'correct' ? '✓' : '×') : (kind === 'correct' ? '+' : '−') + value;
    $('#reaction-team').textContent = team || copy().preview;
    if (!reactionDialog.open) reactionDialog.showModal();
    reactionTimeout = setTimeout(() => { if (reactionDialog.open) reactionDialog.close(); },2600);
  }
  function award(sign) {
    const clue = clues.get(state.currentClueId);
    const team = state.teams.find(team => team.id === state.selectedTeamId);
    const value = clue.value * (state.doubleTeamId === team.id ? 2 : 1);
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
    if (mode === 'tournament') while (names.length < 4) names.push(copy().team + ' ' + (names.length+1));
    tour = null; save(); renderSetup();
  }));
  $('#heat-count').addEventListener('change', () => { readNames(); heatCount = Number($('#heat-count').value); tour = null; save(); renderSetup(); });
  $('#prize').addEventListener('input', () => { prize = $('#prize').value.slice(0,80); if (tour) tour.prize = prize.trim(); save(); });
  $('#team-inputs').addEventListener('change', () => { if (mode === 'tournament') { readNames(); tour = null; renderPlan(); save(); } });
  $('#end-round').addEventListener('click', () => $('#end-round-dialog').showModal());
  $('#confirm-end-round').addEventListener('click', () => { $('#end-round-dialog').close(); if (state?.currentClueId) act('cancelClue'); roundShown = true; save(); showRound(); });
  $('#round-back').addEventListener('click', () => $('#round-dialog').close());
  $('#round-next').addEventListener('click', () => {
    if (!checkSession()) return;
    $('#round-dialog').close();
    const isFinal = !tour || tour.stage === tour.heats.length;
    if (isFinal) { $('#confirm-reset').click(); return; }
    tour.results[tour.stage] = standingsOf(state);
    tour.stage += 1;
    try { startStage(); } catch { notice = copy().error; }
    save(); render(); window.scrollTo({top:0});
  });
  $('#team-form').addEventListener('submit',event => {
    event.preventDefault(); readNames();
    if (mode === 'tournament') {
      if (names.length < heatCount * 2 || names.length > 12) { notice = copy().tourTeams; renderNotice(); return; }
      const trimmed = names.map(name => name.trim());
      if (trimmed.some(name => !name || name.length > 40 || /[\u0000-\u001f\u007f]/.test(name)) || new Set(trimmed.map(name => name.toLocaleLowerCase('en'))).size !== trimmed.length) { notice = copy().names; renderNotice(); return; }
      names = trimmed;
      if (!tour || tour.stage !== 0) tour = planTour();
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
  $('#add-team').addEventListener('click',() => { readNames(); if(names.length<maxTeams()) names.push(copy().team+' '+(names.length+1)); renderSetup(); $('#team-inputs').lastElementChild?.querySelector('input')?.focus(); });
  $('#remove-team').addEventListener('click',() => { readNames(); if(names.length>2) names.pop(); renderSetup(); });
  $('#language').addEventListener('click',() => {
    if (!state) readNames();
    language = language === 'en' ? 'nb' : 'en'; renderLocale(); renderSetup(); renderGallery(); save(); render();
  });
  $('#help-open').addEventListener('click',() => { pauseTimer(); $('#help-dialog').showModal(); });
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click',() => document.getElementById(button.dataset.close).close()));
  $('#fullscreen').addEventListener('click',async () => {
    try { if(document.fullscreenElement) await document.exitFullscreen(); else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else throw new Error(); }
    catch { notice=copy().fullscreen; renderNotice(); }
  });
  $('#undo').addEventListener('click',() => act('undo'));
  $('#clue-undo').addEventListener('click',() => act('undo'));
  $('#new-game').addEventListener('click',() => $('#reset-dialog').showModal());
  $('#confirm-reset').addEventListener('click',() => {
    if (tour) names = tour.heats.flatMap(heat => heat.teams); else names = state.teams.map(team => team.name); state=null; tour=null; roundShown=false; pauseTimer(); timer={clueId:null,remaining:timerDuration,running:false,deadline:0}; restoreFailed=false; notice=''; save();
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
  $('#power-double').addEventListener('click',() => act('usePower','double'));
  $('#power-letter').addEventListener('click',() => act('usePower','letter'));
  $('#power-steal').addEventListener('click',() => { const team = stealTeam(); if (team && act('usePower','steal',team.id)) restartTimer(); });
  $('#timer-toggle').addEventListener('click',() => {
    if(timer.running){pauseTimer();save();return;}
    startTimer();
  });
  $('#timer-reset').addEventListener('click',() => { pauseTimer();timer.remaining=timerDuration;renderClue();save(); });
  document.addEventListener('visibilitychange',() => { if(document.hidden){pauseTimer();save();} });
  window.addEventListener('pagehide',() => {pauseTimer();save();});
  renderLocale(); renderSetup(); renderGallery(); render();
})();
