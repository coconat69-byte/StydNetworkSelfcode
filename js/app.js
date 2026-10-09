/**
 * СтудСеть — макет мессенджера
 * JS оставлен только для переключения экранов.
 */

(function () {
  'use strict';

  const $$ = (s) => document.querySelectorAll(s);

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Навигация по вкладкам (шапка + аватар + настройки)
    $$('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
  }

  function navigate(screen) {
    $$('.screen').forEach(s => s.classList.remove('screen--active'));
    document.getElementById('screen-' + screen)?.classList.add('screen--active');

    $$('.topnav__item').forEach(b =>
      b.classList.toggle('topnav__item--active', b.dataset.nav === screen)
    );
  }

})();