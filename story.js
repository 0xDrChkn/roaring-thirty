(() => {
  'use strict';
  const root = document.getElementById('gatsby-invitation');
  const story = root.querySelector('.party-story');
  const chapters = [...story.querySelectorAll('.story-chapter')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const touch = window.matchMedia('(pointer: coarse)').matches;
  // Each chapter rises into place once, then stays put. Nothing is tied to the scroll
  // position or screen height, so the phone keyboard opening or closing never moves a form.
  function arrive(chapter) {
    chapter.dataset.storyArrived = '';
    chapter.style.setProperty('--story-opacity', '1');
    chapter.style.setProperty('--story-y', '0px');
  }
  function prepare(chapter) {
    if ('storyArrived' in chapter.dataset || 'storyReady' in chapter.dataset) return;
    chapter.dataset.storyReady = '';
    const top = chapter.querySelector('.story-card').getBoundingClientRect().top;
    // Phones: plain native scrolling, chapters are simply there.
    if (motion.matches || !observer || touch || top < window.innerHeight * .9) { arrive(chapter); return; }
    chapter.style.setProperty('--story-opacity', '0');
    chapter.style.setProperty('--story-y', '48px');
    observer.observe(chapter);
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      requestAnimationFrame(() => arrive(entry.target));
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .08 }) : null;
  function update() { chapters.forEach(chapter => { if (!chapter.hidden) prepare(chapter); }); }
  window.addEventListener('birthday:evidence', update);
  story.addEventListener('focusin', event => { const chapter = event.target.closest('.story-chapter'); if (chapter) arrive(chapter); });
  motion.addEventListener('change', () => chapters.forEach(arrive));
  story.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target || target.hidden) return;
      event.preventDefault();
      target.scrollIntoView({behavior:motion.matches ? 'auto' : 'smooth',block:'start'});
    });
  });
  story.querySelectorAll('[data-dialog-open]').forEach(button => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.dialogOpen);
      if (!dialog.open) dialog.showModal();
    });
  });
  story.querySelectorAll('[data-dialog-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  story.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  update();
})();
