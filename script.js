/**
 * Feng Chen Academic CV - Theme, copy, WeChat popover
 */

(function () {
  const THEME_KEY = 'fengchen-cv-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  }

  function getSystemPreference() {
    if (typeof window.matchMedia !== 'function') return LIGHT;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function getInitialTheme() {
    const stored = getStoredTheme();
    if (stored === DARK || stored === LIGHT) return stored;
    return getSystemPreference();
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    updateButtonLabel(theme);
  }

  function updateButtonLabel(theme) {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function updateLangButtonLabel(lang) {
    const btn = document.getElementById('lang-btn');
    if (!btn) return;
    btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : 'Switch to Chinese');
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }

  function init() {
    const theme = getInitialTheme();
    applyTheme(theme);

    const btn = document.getElementById('theme-btn');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (getStoredTheme() !== null) return;
      applyTheme(e.matches ? DARK : LIGHT);
    });

    initCopyButtons();
    initLangToggle();
  }

  function initLangToggle() {
    const LANG_KEY = 'fengchen-cv-lang';
    const btn = document.getElementById('lang-btn');
    if (!btn) return;

    function getLang() {
      try {
        return localStorage.getItem(LANG_KEY) || 'en';
      } catch {
        return 'en';
      }
    }

    const TITLE = { en: 'Feng Chen', zh: '陈凤' };
    const DESCRIPTION = {
      en: 'Feng Chen – Joint PhD Student at MGH, Harvard Medical School. Research in CAR T cells, cancer stem cells, tumor organoids. Publications, awards, contact.',
      zh: '陈凤 – 麻省总医院、哈佛医学院联合培养博士研究生。CAR T细胞、肿瘤干细胞、肿瘤类器官研究。学术成果、论文、联系方式。',
    };

    function setLang(lang) {
      document.documentElement.setAttribute('data-lang', lang);
      document.title = TITLE[lang];
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', DESCRIPTION[lang]);
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {}
      updateLangButtonLabel(lang);
    }

    setLang(getLang());

    btn.addEventListener('click', () => {
      const next = getLang() === 'en' ? 'zh' : 'en';
      setLang(next);
    });
  }

  function getCopyFeedbackText() {
    const lang = document.documentElement.getAttribute('data-lang');
    return lang === 'zh' ? '已复制！' : 'Copied!';
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach((el) => {
      el.addEventListener('click', async () => {
        const text = el.getAttribute('data-copy') || el.dataset.copy;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          const textEl = el.querySelector('.btn-text') || el;
          const original = textEl.textContent;
          textEl.textContent = getCopyFeedbackText();
          setTimeout(() => { textEl.textContent = original; }, 1500);
        } catch {
          /* fallback for older browsers */
        }
      });
    });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
