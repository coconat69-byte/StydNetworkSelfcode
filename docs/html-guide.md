# HTML — разметка страницы

Разбор `index.html`: структура, семантика, классы, атрибуты.

---

## Общий каркас

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- метаданные, шрифт, подключение CSS -->
</head>
<body>
  <div class="app">
    <header class="topbar">...</header>
    <main class="main-content">...</main>
    <footer class="footer">...</footer>
  </div>
  <script src="js/app.js"></script>
</body>
</html>
```

`.app` — контейнер с ограничением по ширине (`max-width: 1440px`). Ограничение задано в `variables.css` через `--max-w`.

---

## Семантические теги

| Тег | Где используется |
|---|---|
| `<header>` | Верхняя панель `.topbar` |
| `<nav>` | Меню «Чаты / Поиск / Клубы» |
| `<main>` | Обёртка для всех экранов |
| `<section>` | Каждый экран |
| `<aside>` | Левая и правая колонки мессенджера |
| `<article>` | Карточки пользователей, клубов, профиля |
| `<footer>` | Футер страницы и поле ввода сообщения |
| `<h1>–<h3>` | Заголовки блоков |

---

## Атрибут `data-nav`

Ключевой механизм навигации. Любой элемент с `data-nav="..."` переключает экран при клике.

```html
<button class="topnav__item" data-nav="chats">Чаты</button>
<button class="topnav__item" data-nav="search">Поиск</button>
<button class="topnav__item" data-nav="clubs">Клубы</button>
```

JS читает значение и открывает элемент с `id="screen-{значение}"`.  
Пример: `data-nav="clubs"` → `#screen-clubs`.

Используется вместо `onclick` — разделение разметки и логики.

---

## Разбор по блокам

### 1. `<head>`

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=1440">
<title>СтудСеть — соцсеть колледжа</title>
<link href="...Inter..." rel="stylesheet">
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/screens.css">
```

- `charset="UTF-8"` — кодировка для корректного отображения кириллицы.
- `viewport width=1440` — фиксированная ширина макета.
- Inter — шрифт интерфейса.
- Четыре CSS-файла в порядке от общих к частным.

### 2. `<header class="topbar">`

Состоит из трёх блоков:

```html
<div class="topbar__left">   <!-- логотип + навигация -->
<div class="topbar__search"> <!-- поиск -->
<div class="topbar__right">  <!-- тема, аватар, настройки -->
```

Клик по логотипу и аватару также переключает экран (`data-nav="chats"` и `data-nav="profile"`).

### 3. `<main class="main-content">`

Все пять экранов:

```html
<section id="screen-chats"    class="screen screen--active">...</section>
<section id="screen-search"   class="screen">...</section>
<section id="screen-clubs"    class="screen">...</section>
<section id="screen-profile"  class="screen">...</section>
<section id="screen-settings" class="screen">...</section>
```

Активный экран имеет класс `.screen--active`. Переключение — смена этого класса.

### 4. Экран «Чаты»

```html
<div class="chat-layout">
  <aside class="chat-sidebar">...</aside>  <!-- список чатов -->
  <div class="chat-main">...</div>         <!-- переписка -->
  <aside class="chat-info">...</aside>     <!-- информация о чате -->
</div>
```

`.chat-layout` — CSS Grid с тремя колонками:

```css
grid-template-columns: var(--sidebar-w) 1fr var(--info-w);
```

Ширины боковых колонок заданы в `variables.css`.

Внутри `.chat-main`:

- `.chat-header` — название чата и метаданные.
- `.chat-messages` — список сообщений.
- `.chat-input` — поле ввода с плашкой-предупреждением над ним.

### 5. Экран «Поиск»

```html
<div class="cards-screen">
  <h2 class="cards-screen__title">Поиск людей</h2>
  <div class="search-bar">...</div>
  <div class="user-grid">
    <article class="user-card">...</article>
    <article class="user-card">...</article>
    ...
  </div>
</div>
```

`.user-grid` — CSS Grid с тремя колонками. Адаптив: 3 → 2 → 1 колонка при уменьшении ширины окна.

Каждая карточка — `<article class="user-card">` с элементами:

- `.user-card__avatar` — аватар.
- `.user-card__name` — имя.
- `.user-card__meta` — группа и роль.
- `.user-card__text` — краткое описание.
- `.user-card__actions` — кнопки.

### 6. Экран «Клубы»

```html
<div class="cards-grid">
  <article class="card">
    <div class="card__icon">💻</div>
    <h3 class="card__title">Клуб программистов</h3>
    <p class="card__text">...</p>
    <div class="card__footer">...</div>
  </article>
  ...
</div>
```

Четыре карточки в две колонки.

### 7. Экран «Профиль»

Та же структура `.cards-grid`. Четыре карточки: профиль пользователя, группы, клубы, статистика.

### 8. Экран «Настройки»

```html
<div class="settings-list">
  <div class="settings-item">
    <div class="settings-item__info">
      <div class="settings-item__title">Тёмная тема</div>
      <div class="settings-item__desc">...</div>
    </div>
    <label class="switch">
      <input type="checkbox">
      <span class="switch__slider"></span>
    </label>
  </div>
  ...
</div>
```

Переключатель построен на нативном `<input type="checkbox">`. Настоящий чекбокс скрыт (`opacity: 0`), видимый вид задаётся элементом `.switch__slider`. Состояние `:checked` переключает вид через CSS.

### 9. `<footer class="footer">`

```html
<div class="footer__disclaimer">...</div>  <!-- дисклеймер, 2 абзаца -->
<div class="footer__authors">              <!-- авторы -->
  <div class="footer__authors-label">Авторы</div>
  <div class="footer__authors-list">
    <div class="author-chip">...</div>
    <div class="author-chip">...</div>
  </div>
</div>
```

Каждый автор — `.author-chip`: круг с буквой + фамилия в «пилюле».

---

## Система классов

Используется BEM-нотация:

| Синтаксис | Значение | Пример |
|---|---|---|
| `block` | самостоятельный блок | `user-card` |
| `block__element` | часть блока | `user-card__name` |
| `block--modifier` | вариант блока | `chat-item--active` |

Пример:

```html
<article class="user-card">
  <img class="avatar user-card__avatar" ...>
  <h3 class="user-card__name">Мария</h3>
  <div class="user-card__actions">...</div>
</article>
```

Подробнее — в [conventions.md](conventions.md).