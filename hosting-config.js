// Filled by start-mac-mini.sh after checking the HTTPS submission flow; currently points at the Railway service.
// Public URL only; guest replies, passwords and photos stay outside this repository.
(() => {
  const config = window.BIRTHDAY_CONFIG;
  // The hosted service already selects its own same-origin service. Preserve that and legacy demos.
  if (config && !config.submissions?.provider && !config.submissions?.publishableKey) {
    config.submissions = { provider: 'local', url: "https://invitation-production-097f.up.railway.app" };
  }
})();
