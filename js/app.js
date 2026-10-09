/**
 * =========================================================
 * СтудСеть — макет мессенджера
 * ---------------------------------------------------------
 * JS оставлен ТОЛЬКО для переключения экранов.
 * Всё остальное (фильтры, чаты, инпут, кнопки) — чистая
 * вёрстка, она визуально есть, но не работает.
 * =========================================================
 */

(function () {
  'use strict';

  const $$ = (s) => document.querySelectorAll(s);

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Навигация по вкладкам (шапка + аватар + настройки)
    $$('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
  }

  function navigate(screen) {
    // Снять активность со всех экранов
    $$('.screen').forEach((s) => s.classList.remove('screen--active'));

    // Открыть нужный экран
    document.getElementById('screen-' + screen)?.classList.add('screen--active');

    // Обновить подсветку в навигации
    $$('.topnav__item').forEach((b) =>
      b.classList.toggle('topnav__item--active', b.dataset.nav === screen)
    );
  }

})();