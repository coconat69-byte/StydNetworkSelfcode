# Структура проекта

Назначение каждой папки и файла.

---

## Дерево

```
studnet/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── screens.css
├── js/
│   └── app.js
└── docs/
    ├── README.md
    ├── structure.md
    ├── html-guide.md
    ├── css-guide.md
    ├── js-guide.md
    └── conventions.md
```

---

## `index.html`

Единственная HTML-страница проекта. Содержит всю разметку: шапку, пять секций-экранов и футер.

Экраны находятся в DOM одновременно. Видимым является только тот, у которого есть класс `.screen--active`. Остальные скрыты через `display: none`.

Один файл вместо нескольких — потому что переключение экранов выполняется без перезагрузки страницы, а разметка шапки и футера не дублируется.

---

## `css/`

Папка со стилями. Разделена на четыре файла по слоям.

| Файл | Содержимое |
|---|---|
| `variables.css` | CSS-переменные (цвета, размеры), темы |
| `base.css` | Глобальный сброс и базовые стили |
| `components.css` | Переиспользуемые компоненты (кнопки, аватары, бейджи) |
| `screens.css` | Макет страницы и стили экранов |

**Порядок подключения в HTML:**

```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/screens.css">
```

Порядок важен из-за каскада CSS. Более поздние файлы могут переопределять правила более ранних при равной специфичности.

---

### `css/variables.css`

Содержит два блока:

- `:root { ... }` — значения по умолчанию (светлая тема).
- `[data-theme="dark"] { ... }` — переопределение переменных для тёмной темы.

Все остальные CSS-файлы используют цвета и размеры через `var(--имя-переменной)`.

---

### `css/base.css`

Глобальные правила:

- `* { box-sizing: border-box; margin: 0; padding: 0; }` — сброс.
- `html { font-size: 15px; }` — база для `rem`.
- `body { ... }` — фон, цвет текста, шрифт.
- Правила для кнопок, инпутов, ссылок, картинок.
- Классы `.icon`, `.icon--lg` — размеры SVG-иконок.
- Условное скрытие иконок темы по атрибуту `[data-theme]`.

---

### `css/components.css`

Стили для повторно используемых элементов:

- `.logo`, `.logo__icon`, `.logo__text` — логотип.
- `.btn`, `.btn--primary`, `.btn--icon` — кнопки.
- `.icon-btn`, `.icon-btn--sm` — иконки-кнопки.
- `.avatar`, `.avatar--sm`, `.avatar--md` — аватары.
- `.badge`, `.badge--unread` — счётчики.
- `.chat-type--channel / --group / ...` — бейджи типов чатов.
- `.reaction` — реакции на сообщения.

---

### `css/screens.css`

Макет и стили конкретных экранов:

- `.app`, `.main-content`, `.screen` — общая обёртка.
- `.topbar` — шапка.
- `.chat-layout`, `.chat-sidebar`, `.chat-main`, `.chat-info` — трёхколоночный мессенджер.
- `.chat-item`, `.chat-messages`, `.message` — элементы чата.
- `.chat-input`, `.chat-input__notice`, `.chat-input__form` — поле ввода и плашка над ним.
- `.cards-screen`, `.cards-grid`, `.card` — макет экранов с карточками.
- `.settings-list`, `.settings-item`, `.switch` — список настроек.
- `.search-bar`, `.user-grid`, `.user-card` — экран поиска людей.
- `.footer`, `.footer__disclaimer`, `.footer__authors`, `.author-chip` — футер.

---

## `js/`

Один файл: `app.js`.

### `js/app.js`

Реализует переключение экранов. Логика:

1. Находит все элементы с атрибутом `data-nav`.
2. Навешивает на них обработчик клика.
3. При клике вызывает `navigate(значение data-nav)`.
4. `navigate()` снимает класс `.screen--active` со всех экранов, добавляет его нужному, обновляет подсветку в шапке.

Других задач у скрипта нет.

---

## `docs/`

Текстовые файлы с документацией. В разметку не подключаются. Служат справочником по проекту.

---

## Связи между файлами

```
index.html
   ├── css/variables.css      ← переменные
   ├── css/base.css           ← сброс + база
   ├── css/components.css     ← компоненты
   ├── css/screens.css        ← макет + экраны
   └── js/app.js              ← навигация
```