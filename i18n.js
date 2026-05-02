// Simple bilingual helper based off of the scRNA tutorial
// This script toggles between Chinese and English content on the page.
// Elements annotated with `data-lang`, `data-zh` and `data-en` will
// automatically show or update based on the chosen language.  A button
// with id="langToggle" is automatically inserted into the navigation bar
// when the page loads.  When clicked it switches the interface language
// and stores the choice in localStorage.

(function(){
  const STORAGE_KEY = 'biostats_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLanguage(l) {
    current = l;
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === 'zh' ? 'zh-Hant' : 'en';
    // Show/hide elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === l ? '' : 'none';
    });
    // Swap text for elements that declare both zh and en
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent = el.dataset[l];
    });
    // Update toggle button label
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = l === 'zh' ? 'EN' : '中文';
    }
    // Notify other scripts that the language changed (for charts etc)
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  function toggle() {
    applyLanguage(current === 'zh' ? 'en' : 'zh');
  }

  function init() {
    const nav = document.querySelector('.top-nav-inner');
    if (nav && !document.getElementById('langToggle')) {
      const btn = document.createElement('button');
      btn.id = 'langToggle';
      btn.className = 'lang-toggle';
      btn.textContent = current === 'zh' ? 'EN' : '中文';
      btn.onclick = toggle;
      nav.appendChild(btn);
    }
    applyLanguage(current);
  }

  document.addEventListener('DOMContentLoaded', init);
  window.I18n = { apply: applyLanguage, toggle, get: () => current };
})();