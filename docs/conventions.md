# Соглашения проекта

Правила именования, оформления кода и коммитов.

---

## Именование классов (BEM)

**BEM** — Block, Element, Modifier.

### Синтаксис

| Часть | Разделитель | Пример |
|---|---|---|
| Блок | — | `user-card` |
| Элемент | `__` | `user-card__name` |
| Модификатор | `--` | `user-card--featured` |

### Пример

```html
<article class="user-card">
  <img class="avatar user-card__avatar" ...>
  <h3 class="user-card__name">Мария</h3>
  <div class="user-card__actions">
    <button class="btn btn--primary">Написать</button>
  </div>
</article>
```

- `user-card` — блок.
- `user-card__avatar`, `user-card__name`, `user-card__actions` — элементы.
- `btn btn--primary` — блок с модификатором.

### Правила

1. Элемент называется в контексте блока: `chat-item__name`, а не `name`.
2. Модификатор дополняет, а не заменяет: класс `btn` остаётся, добавляется `btn--primary`.
3. Элементы не вкладываются: `block__el1__el2` не используется.
4. Классы в нижнем регистре, слова через дефис.

---

## Именование файлов

| Тип | Стиль | Пример |
|---|---|---|
| HTML | `index.html` | `index.html` |
| CSS | kebab-case | `screens.css` |
| JS | camelCase | `app.js` |
| Документация | kebab-case или SCREAMING | `css-guide.md`, `README.md` |

---

## CSS-кодстайл

### Форматирование

```css
/* Правильно */
.user-card {
  padding: 20px;
  border-radius: var(--radius);
}

/* Неправильно */
.user-card{padding:20px;border-radius:var(--radius);}
```

2 пробела, одна декларация на строку, пустая строка между правилами.

### Порядок свойств

1. Позиционирование (`position`, `top`, `left`, `z-index`)
2. Размеры (`width`, `height`, `min-*`, `max-*`)
3. Отступы (`margin`, `padding`)
4. Оформление (`background`, `border`, `border-radius`, `box-shadow`)
5. Типографика (`font`, `color`, `line-height`, `text-align`)
6. Прочее (`transition`, `cursor`, `overflow`)

### Цвета

Через переменные:

```css
color: var(--text);
background: var(--bg-elevated);
border: 1px solid var(--border);
```

Исключение — цвета, которые не зависят от темы (например, `#fff` для иконок на акцентном фоне).

### Комментарии

Заголовок блока:

```css
/* =========================================================
   НАЗВАНИЕ БЛОКА
   ========================================================= */
```

Короткие пояснения внутри — там, где не очевидно назначение:

```css
min-height: 0; /* разрешает flex-детям сжиматься */
```

---

## JS-кодстайл

### Форматирование

- 2 пробела.
- Одинарные кавычки.
- Точка с запятой в конце строк.
- `const` по умолчанию, `let` — если значение меняется.

### Имена

- Функции: глагол + существительное (`navigate`, `renderList`).
- Переменные: существительное (`screenName`, `activeChat`).
- Логические: с `is/has/can` (`isActive`, `hasUnread`).

### Комментарии

Комментарий объясняет **почему**, а не **что**.

```javascript
// Плохо: добавляем класс
el.classList.add('active');

// Хорошо: подсвечиваем текущую вкладку
el.classList.add('active');
```

Над функцией — JSDoc:

```javascript
/**
 * Открывает экран и обновляет подсветку меню.
 * @param {string} screen — имя экрана без префикса
 */
function navigate(screen) { ... }
```

---

## Git-коммиты

Формат — Conventional Commits.

### Схема

```
тип: краткое описание

Тело коммита (опционально).
Списком, если изменений несколько.
```

### Типы

| Тип | Назначение |
|---|---|
| `feat` | новая функциональность |
| `fix` | исправление ошибки |
| `refactor` | изменение кода без смены поведения |
| `style` | оформление (CSS, форматирование) |
| `docs` | документация |
| `chore` | служебные изменения |

### Примеры

```
feat: add user cards to search screen

- Add search bar
- Add 6 user cards in 3-column grid
- Buttons are visual only
```

```
fix: remove scrollbar in chat sidebar

- Replace fixed height with flex: 1 on .chat-layout
- Add min-height: 0 to flex children
```

```
docs: add full project documentation

- README.md — общее описание
- docs/structure.md — структура проекта
- docs/html-guide.md — разбор разметки
- docs/css-guide.md — разбор стилей
- docs/js-guide.md — разбор скрипта
- docs/conventions.md — соглашения
```

### Правила

1. Заголовок до 72 символов.
2. Повелительное наклонение: `add`, `fix`, `remove`.
3. Один коммит — одна задача.
4. Тело — списком, если изменений больше одного.

---

## Разделение ответственности

| Слой | За что отвечает |
|---|---|
| HTML | Структура и содержимое |
| CSS | Оформление и макет |
| JS | Переключение экранов |

- Разметка не содержит инлайн-стилей.
- HTML не содержит обработчиков (`onclick` и т.п.).
- Логика подключается через `data-*` атрибуты и внешний скрипт.