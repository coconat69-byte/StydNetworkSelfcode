# JavaScript — разбор кода

Один файл: `js/app.js`. Реализует переключение экранов.

---

## Полный код

```javascript
(function () {
  'use strict';

  const $$ = (s) => document.querySelectorAll(s);

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    $$('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
  }

  function navigate(screen) {
    $$('.screen').forEach((s) => s.classList.remove('screen--active'));

    document.getElementById('screen-' + screen)?.classList.add('screen--active');

    $$('.topnav__item').forEach((b) =>
      b.classList.toggle('topnav__item--active', b.dataset.nav === screen)
    );
  }

})();
```

---

## Разбор

### IIFE

```javascript
(function () {
  'use strict';
  // ...
})();
```

Immediately Invoked Function Expression — функция, вызываемая сразу после объявления.

Назначение:

- **Изоляция переменных.** Всё, что объявлено внутри, не попадает в глобальную область.
- **`'use strict'`** включает строгий режим: JS сообщает об ошибках вроде случайного создания глобальных переменных или использования необъявленных имён.

### Хелпер `$$`

```javascript
const $$ = (s) => document.querySelectorAll(s);
```

Сокращение для `document.querySelectorAll`. Возвращает все элементы по селектору.

### Точка входа

```javascript
document.addEventListener('DOMContentLoaded', init);
```

Событие `DOMContentLoaded` срабатывает, когда HTML разобран и DOM готов. Только после этого можно искать элементы на странице.

Функция `init` вызывается один раз — при загрузке страницы.

### `init()`

```javascript
function init() {
  $$('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.dataset.nav));
  });
}
```

1. Находит все элементы с атрибутом `data-nav`.
2. На каждый навешивает обработчик клика.
3. При клике вызывает `navigate` с значением `data-nav`.

`btn.dataset.nav` — чтение `data-nav` через DOM API. Все `data-*` атрибуты доступны через `element.dataset`.

### `navigate(screen)`

```javascript
function navigate(screen) {
  $$('.screen').forEach((s) => s.classList.remove('screen--active'));

  document.getElementById('screen-' + screen)?.classList.add('screen--active');

  $$('.topnav__item').forEach((b) =>
    b.classList.toggle('topnav__item--active', b.dataset.nav === screen)
  );
}
```

Три действия:

**1. Снять активность со всех экранов.**  
Удаляется класс `.screen--active` у всех элементов с классом `.screen`. Все экраны скрываются.

**2. Показать нужный экран.**  
По `id` (`"screen-" + screen`) находится секция и ей добавляется `.screen--active`.

Знак `?.` — опциональная цепочка. Если элемента с таким `id` нет, код не вызовет ошибку, просто ничего не сделает.

**3. Обновить подсветку в меню.**  
У всех пунктов `.topnav__item` класс `.topnav__item--active` включается, если `dataset.nav` равен имени открытого экрана, иначе — выключается.

`classList.toggle(класс, условие)` — если условие `true`, класс добавляется, если `false` — удаляется.

---

## Последовательность при клике

Пример: пользователь кликает `<button data-nav="clubs">`.

1. Срабатывает обработчик `click`, вызывается `navigate("clubs")`.
2. У всех `.screen` удаляется класс `.screen--active` — все экраны скрыты.
3. У элемента `#screen-clubs` добавляется `.screen--active` — экран «Клубы» показан.
4. У `.topnav__item`:
   - «Чаты» → `dataset.nav === "clubs"` → false → класс снят.
   - «Поиск» → false → снят.
   - «Клубы» → true → класс добавлен.

---

## Элементы с `data-nav`

В разметке `data-nav` установлен на:

| Элемент | `data-nav` | Экран |
|---|---|---|
| Логотип в шапке | `chats` | Чаты |
| Вкладка «Чаты» | `chats` | Чаты |
| Вкладка «Поиск» | `search` | Поиск |
| Вкладка «Клубы» | `clubs` | Клубы |
| Аватар в шапке | `profile` | Профиль |
| Иконка-шестерёнка | `settings` | Настройки |

Все они работают через один и тот же механизм.

---

## Использованные возможности JavaScript

| Возможность | Где применяется |
|---|---|
| IIFE | Обёртка всего модуля |
| Строгий режим (`'use strict'`) | Внутри IIFE |
| Стрелочные функции | Хелпер `$$`, обработчики |
| `addEventListener` | Навешивание событий |
| `dataset` | Чтение `data-nav` |
| `classList.add/remove/toggle` | Управление классами |
| Опциональная цепочка (`?.`) | В `navigate` |
| `DOMContentLoaded` | Ожидание готовности DOM |

---

## Связанные файлы

- `index.html` — источник элементов с `data-nav` и `id="screen-*"`.
- `css/screens.css` — стили классов `.screen`, `.screen--active`, `.topnav__item--active`.