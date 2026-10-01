/* A scroll-directed arrival. The invitation below stays independent of this scene. */
(() => {
  'use strict';
  const root = document.getElementById('gatsby-invitation');
  const config = window.BIRTHDAY_CONFIG;
  if (!root || !config || root.querySelector('.cinema-intro')) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const person = config.person || {};
  const name = person.name || person.fullName || '';
  const fullName = person.fullName || name;
  let language = root.lang === 'nb' ? 'nb' : (config.appearance?.defaultLanguage === 'nb' ? 'nb' : 'en');
  const copy = {
    en: {
      label: 'Your arrival at the party',
      chapter: `${fullName} · Chapter ${person.age || ''}`,
      opening: ['The twenties', 'are calling.'],
      openingNote: `${name}’s turning back the clock for one night. Dress accordingly.`,
      scroll: 'Scroll to step inside', welcomeKicker: 'An evening with',
      welcome: name,
      welcomeNote: 'Step inside. The twenties aren’t quite over.',
      continue: 'Let the evening begin',
      portrait: `${name} raising a champagne glass in a Gatsby-inspired AI portrait`
    },
    nb: {
      label: 'Din ankomst til festen',
      chapter: `${fullName} · Kapittel ${person.age || ''}`,
      opening: ['Tjueårene', 'kaller.'],
      openingNote: `${name} skrur klokken tilbake for én kveld. Kle deg for anledningen.`,
      scroll: 'Rull ned og kom inn', welcomeKicker: 'En kveld med',
      welcome: name,
      welcomeNote: 'Kom inn. Tjueårene er ikke helt over ennå.',
      continue: 'La kvelden begynne',
      portrait: `${name} som løfter et champagneglass i et KI-laget Gatsby-portrett`
    }
  };
  const intro = document.createElement('section');
  intro.className = 'cinema-intro';
  intro.id = 'arrival';
  intro.innerHTML = `
    <div class="cinema-sticky">
      <div class="cinema-mansion" aria-hidden="true">
        <img class="cinema-wide-shot" src="assets/gatsby-mansion-wide-open.jpg" alt="" fetchpriority="high" decoding="async">
        <img class="cinema-wide-shot cinema-echo cinema-echo-1" src="assets/gatsby-mansion-wide-open.jpg" alt="" decoding="async">
        <img class="cinema-wide-shot cinema-echo cinema-echo-2" src="assets/gatsby-mansion-wide-open.jpg" alt="" decoding="async">
      </div>
      <div class="cinema-vignette" aria-hidden="true"></div>
      <canvas class="cinema-sparks" aria-hidden="true"></canvas>
      <div class="cinema-bloom" aria-hidden="true"></div>
      <div class="cinema-grain" aria-hidden="true"></div>
      <div class="cinema-letterbox" aria-hidden="true"><span></span><span></span></div>
      <div class="cinema-nav">
        <div class="cinema-languages" role="group" aria-label="Language / Språk">
          <button type="button" data-cinema-language="en" lang="en">EN</button>
          <span aria-hidden="true">/</span>
          <button type="button" data-cinema-language="nb" lang="nb">NO</button>
        </div>
      </div>
      <div class="cinema-arrival">
        <p class="cinema-eyebrow" data-cinema-copy="chapter"></p>
        <span class="cinema-rule" aria-hidden="true"><i></i></span>
        <h1 class="cinema-opening"><span data-cinema-opening="0"></span><em data-cinema-opening="1"></em></h1>
        <p class="cinema-arrival-note" data-cinema-copy="openingNote"></p>
      </div>
      <div class="cinema-guest-scene">
        <div class="cinema-guest-backdrop" aria-hidden="true"><img alt="" decoding="async"></div>
        <div class="cinema-arch">
          <div class="cinema-sunburst" aria-hidden="true"></div>
          <span class="cinema-arch-line cinema-arch-outer" aria-hidden="true"></span>
          <span class="cinema-arch-line cinema-arch-inner" aria-hidden="true"></span>
          <img class="cinema-portrait" decoding="async">
          <span class="cinema-sheen" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cinema-welcome">
        <p class="cinema-eyebrow" data-cinema-copy="welcomeKicker"></p>
        <h2 class="cinema-name" data-cinema-name></h2>
        <p class="cinema-welcome-note" data-cinema-copy="welcomeNote"></p>
        <a class="cinema-continue" href="#invitation"><span data-cinema-copy="continue"></span><span aria-hidden="true">↓</span></a>
      </div>
      <p class="cinema-scroll-cue"><span data-cinema-copy="scroll"></span><span class="cinema-scroll-line" aria-hidden="true"></span></p>
      <div class="cinema-progress" aria-hidden="true"><span></span></div>
    </div>`;

  const portrait = intro.querySelector('.cinema-portrait');
  if (config.heroPhoto?.src) {
    portrait.src = config.heroPhoto.src;
    intro.querySelector('.cinema-guest-backdrop img').src = config.heroPhoto.src;
  }
  else portrait.hidden = true;
  const welcome = intro.querySelector('.cinema-welcome');
  const arrival = intro.querySelector('.cinema-arrival');
  const continueLink = intro.querySelector('.cinema-continue');
  const frame = root.querySelector('#invitation');

  function translate(next) {
    language = next === 'nb' ? 'nb' : 'en';
    const text = copy[language];
    intro.lang = language;
    intro.setAttribute('aria-label', text.label);
    intro.querySelectorAll('[data-cinema-copy]').forEach(node => {
      node.textContent = text[node.dataset.cinemaCopy];
    });
    intro.querySelectorAll('[data-cinema-opening]').forEach(node => {
      node.textContent = text.opening[Number(node.dataset.cinemaOpening)];
    });
    // Letters arrive one by one; screen readers get the whole name.
    const nameNode = intro.querySelector('[data-cinema-name]');
    nameNode.setAttribute('aria-label', text.welcome);
    nameNode.replaceChildren(...[...text.welcome].map((letter, index) => {
      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--i', index);
      span.textContent = letter;
      return span;
    }));
    intro.style.setProperty('--cinema-letters', Math.max(1, [...text.welcome].length));
    intro.querySelectorAll('[data-cinema-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.cinemaLanguage === language));
    });
    const configuredAlt = config.heroPhoto?.alt;
    const alt = typeof configuredAlt === 'string' ? configuredAlt : configuredAlt?.[language];
    portrait.alt = (alt || text.portrait).replaceAll('{name}', name).replaceAll('{fullName}', fullName).replaceAll('{age}', String(person.age || ''));
  }

  translate(language);
  root.insertBefore(intro, frame || root.firstChild);
  // Separate controls deliberately avoid the invitation's [data-language] hooks.
  intro.querySelectorAll('[data-cinema-language]').forEach(button => {
    button.addEventListener('click', () => {
      const requested = button.dataset.cinemaLanguage;
      translate(requested);
      window.dispatchEvent(new CustomEvent('birthday:request-language', { detail: { language: requested } }));
    });
  });
  window.addEventListener('birthday:language', event => {
    if (event.detail?.language) translate(event.detail.language);
  });

  intro.querySelectorAll('a[href="#invitation"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById('invitation') || frame;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: motion.matches ? 'auto' : 'smooth', block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  const clamp = value => Math.min(1, Math.max(0, value));
  const ramp = (progress, start, end) => clamp((progress - start) / (end - start));
  const ease = value => value * value * (3 - 2 * value);
  const easeInOut = value => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
  const easeOut = value => 1 - (1 - value) ** 3;
  const stage = intro.querySelector('.cinema-sticky');
  // Phones get the same story with fewer full-screen blend and blur layers.
  const lite = window.matchMedia('(pointer: coarse), (max-width: 700px)').matches;
  intro.classList.toggle('is-lite', lite);
  const touch = window.matchMedia('(pointer: coarse)').matches;
  // Freeze the screen-height unit: a phone keyboard or address bar must never resize this
  // tall section (that shifts the whole form below it). Only a width change (rotation) updates it.
  let lockedWidth = 0;
  function lockHeight() {
    if (window.innerWidth === lockedWidth) return;
    lockedWidth = window.innerWidth;
    const height = Math.round(window.visualViewport?.height || window.innerHeight);
    root.style.setProperty('--cinema-vh', `${height / 100}px`);
  }
  lockHeight();
  let scheduled = false;
  let welcomeVisible = true;
  let progress = 0;
  let target = 0;
  let applied = -1;
  // Pointer depth on desktop, smoothed like the scroll.
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  // Where the open doorway sits on screen; the sparks stream out of it.
  const door = { x: 0, y: 0 };
  function setWelcomeVisibility(visible) {
    if (visible === welcomeVisible) return;
    welcomeVisible = visible;
    welcome.setAttribute('aria-hidden', String(!visible));
    welcome.inert = !visible;
    continueLink.tabIndex = visible ? 0 : -1;
  }

  // Timeline, as a share of the scroll through the scene:
  // title leaves → dolly toward the door → doorway light floods the screen → Sara emerges in the arch.
  function updateScene() {
    scheduled = false;
    if (motion.matches) {
      setWelcomeVisibility(true);
      arrival.setAttribute('aria-hidden', 'true');
      return;
    }
    const rect = intro.getBoundingClientRect();
    const viewport = stage.offsetHeight;
    const width = stage.clientWidth;
    target = clamp(-rect.top / Math.max(1, rect.height - viewport));
    // Inertia: the scene glides toward the scroll position instead of jumping with each wheel step.
    const now = performance.now();
    const elapsed = Math.min(64, now - (updateScene.last || now));
    updateScene.last = now;
    // Touch screens follow the finger exactly; only mouse and trackpad get the glide.
    progress = touch ? target : progress + (target - progress) * (1 - Math.exp(-elapsed / 110));
    if (Math.abs(target - progress) < .0004) progress = target;
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-elapsed / 260));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-elapsed / 260));
    const key = `${progress.toFixed(5)}:${pointer.x.toFixed(3)}:${pointer.y.toFixed(3)}:${width}:${viewport}`;
    if (key === applied) return;
    applied = key;
    // Fit the complete landscape photograph first, including on portrait screens.
    const imageAspect = 1672 / 941;
    const photoWidth = Math.min(width, viewport * imageAspect);
    const photoHeight = photoWidth / imageAspect;
    const wideDoorY = (viewport - photoHeight) / 2 + photoHeight * .655;
    const approach = easeInOut(ramp(progress, .03, .62));
    const finalZoom = Math.min(6.5, width * .9 / (photoWidth * .065));
    const zoom = Math.pow(finalZoom, approach);
    const cameraY = approach * (viewport * .5 - wideDoorY);
    door.x = width / 2;
    door.y = wideDoorY + cameraY;
    // The rush: echo copies stretch the picture outward while the camera moves fastest.
    const rush = Math.sin(Math.PI * ramp(progress, .14, .64));
    const bloom = ramp(progress, .34, .62);
    const flash = ramp(progress, .57, .63) * (1 - ramp(progress, .63, .72));
    const reveal = ramp(progress, .60, .66);
    const settle = easeOut(ramp(progress, .62, .88));
    const frame = easeOut(ramp(progress, .70, .88));
    const welcomeIn = ramp(progress, .76, .94);
    const titleOut = ease(ramp(progress, .04, .24));
    const values = {
      '--cinema-progress': progress,
      '--cinema-zoom': zoom,
      '--cinema-door-y': `${wideDoorY}px`,
      '--cinema-door-screen-y': `${door.y}px`,
      '--cinema-camera-y': `${cameraY}px`,
      '--cinema-rush': rush,
      '--cinema-mansion-opacity': 1 - ramp(progress, .62, .66),
      '--cinema-bloom': ease(bloom) * (1 - ease(ramp(progress, .625, .67))),
      '--cinema-bloom-size': `${18 + ease(bloom) ** 2 * 260}vmax`,
      '--cinema-flash': flash,
      '--cinema-letterbox': 1 - ease(ramp(progress, .52, .74)),
      '--cinema-arrival-opacity': 1 - titleOut,
      '--cinema-arrival-blur': `${titleOut * 14}px`,
      '--cinema-arrival-scale': 1 + titleOut * .14,
      '--cinema-arrival-y': `${-titleOut * 40}px`,
      '--cinema-guest-opacity': reveal,
      '--cinema-exposure': 1 - easeOut(ramp(progress, .62, .78)),
      '--cinema-guest-zoom': 1.16 - settle * .16,
      '--cinema-frame': frame,
      '--cinema-sunburst': ease(ramp(progress, .66, .86)),
      '--cinema-welcome': welcomeIn,
      '--cinema-cue-opacity': 1 - ramp(progress, .08, .2),
      '--cinema-sheen': ease(ramp(progress, .8, .97)),
      '--cinema-px': pointer.x.toFixed(4),
      '--cinema-py': pointer.y.toFixed(4)
    };
    Object.entries(values).forEach(([key, value]) => intro.style.setProperty(key, value));
    setWelcomeVisibility(progress >= .85);
    arrival.setAttribute('aria-hidden', String(progress > .24));
    if (progress >= .68 && !burstFired) burst();
    if (progress < .5) burstFired = false;
  }

  // Gold sparks: drifting dust at rest, a warp stream out of the doorway while scrolling,
  // and one burst of confetti when Sara appears. Drawn only while the scene is on screen.
  const canvas = intro.querySelector('.cinema-sparks');
  const context = canvas.getContext('2d');
  const sparks = [];
  const confetti = [];
  let burstFired = false;
  let lastProgress = 0;
  let speed = 0;
  let running = false;
  let onScreen = true;
  const palette = ['#f6e3ae', '#e2c595', '#d3b580', '#fff4d6', '#b8902f'];
  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.5);
    const nextWidth = Math.round(stage.clientWidth * ratio);
    const nextHeight = Math.round(stage.offsetHeight * ratio);
    if (canvas.width === nextWidth && canvas.height === nextHeight) return;
    canvas.width = nextWidth;
    canvas.height = nextHeight;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function seedSpark(spark = {}, anywhere = false) {
    spark.angle = Math.random() * Math.PI * 2;
    spark.distance = anywhere ? 20 + Math.random() * Math.hypot(stage.clientWidth, stage.offsetHeight) * .6 : 4 + Math.random() * 40;
    spark.size = .5 + Math.random() * 1.6;
    spark.drift = .15 + Math.random() * .35;
    spark.color = palette[Math.floor(Math.random() * palette.length)];
    spark.twinkle = Math.random() * Math.PI * 2;
    return spark;
  }
  function burst() {
    burstFired = true;
    const portraitBox = portrait.getBoundingClientRect();
    const stageBox = stage.getBoundingClientRect();
    const originX = portraitBox.left - stageBox.left + portraitBox.width / 2;
    const originY = portraitBox.top - stageBox.top + portraitBox.height * .35;
    for (let i = 0; i < (stage.clientWidth < 700 ? 90 : 160); i++) {
      const angle = -Math.PI / 2 + (Math.random() - .5) * Math.PI * 1.6;
      const velocity = 4 + Math.random() * 9;
      confetti.push({
        x: originX, y: originY, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity,
        spin: Math.random() * Math.PI, spinSpeed: (Math.random() - .5) * .3,
        size: 3 + Math.random() * 5, life: 1, decay: .006 + Math.random() * .008,
        color: palette[Math.floor(Math.random() * palette.length)], strip: Math.random() < .55
      });
    }
    startLoop();
  }
  function draw() {
    if (!running) return;
    updateScene();
    const width = stage.clientWidth;
    const height = stage.offsetHeight;
    context.clearRect(0, 0, width, height);
    speed += (Math.min(.08, Math.abs(progress - lastProgress)) - speed) * .18;
    lastProgress = progress;
    const warp = progress < .66 ? 1 : 0;
    const boost = 1 + speed * 900 * warp;
    const fade = 1 - ramp(progress, .62, .7) * .7;
    context.globalCompositeOperation = 'lighter';
    for (const spark of sparks) {
      const before = spark.distance;
      spark.distance += (spark.drift * .35 + spark.distance * .0018) * boost;
      spark.twinkle += .05;
      const x = door.x + Math.cos(spark.angle) * spark.distance;
      const y = door.y + Math.sin(spark.angle) * spark.distance * .62;
      if (x < -40 || x > width + 40 || y < -40 || y > height + 40) { seedSpark(spark); continue; }
      const alpha = Math.min(1, spark.distance / 160) * (.45 + .35 * Math.sin(spark.twinkle)) * fade;
      context.strokeStyle = spark.color;
      context.globalAlpha = Math.max(0, alpha);
      context.lineWidth = spark.size;
      context.lineCap = 'round';
      context.beginPath();
      const trail = Math.max(.6, (spark.distance - before) * 3.2);
      context.moveTo(x, y);
      context.lineTo(door.x + Math.cos(spark.angle) * (spark.distance - trail), door.y + Math.sin(spark.angle) * (spark.distance - trail) * .62);
      context.stroke();
    }
    context.globalCompositeOperation = 'source-over';
    for (let i = confetti.length - 1; i >= 0; i--) {
      const piece = confetti[i];
      piece.vx *= .985; piece.vy = piece.vy * .985 + .16;
      piece.x += piece.vx; piece.y += piece.vy;
      piece.spin += piece.spinSpeed; piece.life -= piece.decay;
      if (piece.life <= 0 || piece.y > height + 30) { confetti.splice(i, 1); continue; }
      context.globalAlpha = Math.min(1, piece.life * 1.6);
      context.fillStyle = piece.color;
      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.spin);
      if (piece.strip) context.fillRect(-piece.size / 2, -piece.size * .2, piece.size, piece.size * .4 * Math.abs(Math.cos(piece.spin * 2)) + .6);
      else { context.beginPath(); context.arc(0, 0, piece.size * .32, 0, Math.PI * 2); context.fill(); }
      context.restore();
    }
    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  function startLoop() {
    if (running || motion.matches || !onScreen) return;
    running = true;
    requestAnimationFrame(draw);
  }
  function stopLoop() { running = false; }
  function setupSparks() {
    resizeCanvas();
    sparks.length = 0;
    for (let i = 0; i < (stage.clientWidth < 700 ? 70 : 130); i++) sparks.push(seedSpark({}, true));
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) startLoop(); else stopLoop();
    }).observe(intro);
  }

  function scheduleScene() {
    if (running) return;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateScene);
  }
  function setMotion() {
    intro.classList.toggle('is-animated', !motion.matches);
    intro.classList.toggle('is-static', motion.matches);
    applied = -1;
    progress = target = clamp(-intro.getBoundingClientRect().top / Math.max(1, intro.offsetHeight - stage.offsetHeight));
    updateScene();
    if (motion.matches) { stopLoop(); context.clearRect(0, 0, canvas.width, canvas.height); }
    else { setupSparks(); startLoop(); }
  }

  window.addEventListener('scroll', scheduleScene, { passive: true });
  window.addEventListener('resize', () => { lockHeight(); scheduleScene(); if (!motion.matches) resizeCanvas(); }, { passive: true });
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', event => {
      pointer.tx = event.clientX / window.innerWidth * 2 - 1;
      pointer.ty = event.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });
  }
  // Film grain: one small noise tile, generated once and shifted by CSS.
  const grainTile = document.createElement('canvas');
  grainTile.width = grainTile.height = 160;
  const grainContext = grainTile.getContext('2d');
  const grainPixels = grainContext.createImageData(160, 160);
  for (let i = 0; i < grainPixels.data.length; i += 4) {
    const value = Math.random() * 255;
    grainPixels.data[i] = grainPixels.data[i + 1] = grainPixels.data[i + 2] = value;
    grainPixels.data[i + 3] = 255;
  }
  grainContext.putImageData(grainPixels, 0, 0);
  intro.querySelector('.cinema-grain').style.backgroundImage = `url(${grainTile.toDataURL()})`;
  motion.addEventListener('change', setMotion);
  setMotion();
  // The opening shot: lights come up on the mansion once the photograph has loaded.
  const wide = intro.querySelector('.cinema-wide-shot');
  const lightsUp = () => requestAnimationFrame(() => intro.classList.add('is-lit'));
  if (wide.complete) lightsUp(); else { wide.addEventListener('load', lightsUp, { once: true }); setTimeout(lightsUp, 2500); }

})();
