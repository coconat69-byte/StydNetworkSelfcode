# CSS — организация стилей

Структура CSS: слои, переменные, темы, макет.

---

## Четыре слоя

```
1. variables.css   — переменные (цвета, размеры)
2. base.css        — сброс и базовые стили
3. components.css  — компоненты интерфейса
4. screens.css     — макет и экраны
```

Порядок подключения в HTML определяет приоритет: файлы, подключённые ниже, могут переопределять правила из файлов выше (при равной специфичности).

---

## 1. `variables.css` — переменные

Определены в `:root` (светлая тема) и переопределены в `[data-theme="dark"]` (тёмная тема).

### Группы переменных

**Шрифт:**

```css
--font: 'Inter', system-ui, -apple-system, sans-serif;
```

**Акцентные цвета:**

| Переменная | Назначение |
|---|---|
| `--accent` | Основной акцентный цвет |
| `--accent-hover` | Акцент при наведении |
| `--accent-light` | Светлый фон для активных элементов |
| `--accent-muted` | Приглушённый акцент (рамки) |

**Фоны:**

| Переменная | Назначение |
|---|---|
| `--bg` | Фон страницы |
| `--bg-elevated` | Фон «приподнятых» блоков (шапка, карточки) |
| `--bg-hover` | Фон при наведении |
| `--bg-active` | Фон активного элемента |
| `--border` | Цвет границ |

**Текст:**

| Переменная | Назначение |
|---|---|
| `--text` | Основной текст |
| `--text-secondary` | Второстепенный текст |
| `--text-muted` | Самый бледный текст |

**Цвета типов чатов:**

```
--type-channel    — фиолетовый
--type-group      — синий
--type-direction  — голубой
--type-course     — зелёный
--type-flood      — оранжевый
--type-dm         — розовый
```

Используются в бейджах `.chat-type--*`.

**Размеры:**

| Переменная | Значение | Назначение |
|---|---|---|
| `--topbar-h` | 56px | Высота шапки |
| `--sidebar-w` | 320px | Ширина левой колонки мессенджера |
| `--info-w` | 300px | Ширина правой колонки мессенджера |
| `--radius` | 10px | Основной радиус скругления |
| `--radius-sm` | 6px | Малый радиус |
| `--max-w` | 1440px | Максимальная ширина `.app` |

### Использование

```css
.button {
  background: var(--accent);
  color: var(--text);
  padding: var(--radius-sm);
}
```

Прямое указание цветов (например, `color: #0f172a`) не используется, кроме случаев, когда цвет не меняется между темами (белые иконки внутри акцентных элементов).

---

## 2. `base.css` — база

### Сброс

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

`box-sizing: border-box` — паддинги и границы входят в `width/height`. Упрощает расчёты размеров.

### Базовые элементы

- `html { font-size: 15px }` — база для `rem`.
- `body { font-family, background, color, line-height }`.
- Кнопки, инпуты: `font: inherit`, `color: inherit` — наследуют шрифт от родителя.
- Ссылки: базовый цвет `var(--accent)`.
- Картинки: `display: block; max-width: 100%`.

### Иконки

```css
.icon { width: 20px; height: 20px; flex-shrink: 0; }
.icon--lg { width: 48px; height: 48px; }
```

`.icon` применяется ко всем SVG-иконкам. `flex-shrink: 0` не даёт иконке сжиматься во flex-контейнере.

### Иконки темы

```css
[data-theme="light"] .icon--moon { display: none; }
[data-theme="dark"]  .icon--sun  { display: none; }
```

В шапке две иконки (солнце и луна). Показывается только одна — в зависимости от значения `data-theme` на `<html>`.

---

## 3. `components.css` — компоненты

| Компонент | Классы |
|---|---|
| Логотип | `.logo`, `.logo__icon`, `.logo__text` |
| Кнопка | `.btn`, `.btn--primary`, `.btn--icon` |
| Иконочная кнопка | `.icon-btn`, `.icon-btn--sm` |
| Аватар | `.avatar`, `.avatar--sm`, `.avatar--md`, `.avatar-btn` |
| Бейдж | `.badge`, `.badge--unread` |
| Тип чата | `.chat-type`, `.chat-type--channel`, `.chat-type--group`, `.chat-type--direction`, `.chat-type--course`, `.chat-type--flood`, `.chat-type--dm` |
| Реакция | `.reactions`, `.reaction` |

### Модификаторы

Модификатор (`--`) дополняет базовый блок:

```html
<button class="btn btn--primary">Войти</button>
<img class="avatar avatar--sm">
```

### Цвета типов чатов

```css
.chat-type--channel {
  background: color-mix(in srgb, var(--type-channel) 15%, transparent);
  color: var(--type-channel);
}
```

Функция `color-mix()` смешивает цвет типа с прозрачным — получается полупрозрачный фон в цвет бейджа.

---

## 4. `screens.css` — макет и экраны

### Общая обёртка

```css
.app {
  max-width: var(--max-w);
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

.screen { display: none; width: 100%; }
.screen--active { display: block; }
```

- `.app` — колонка: шапка, контент, футер.
- `.main-content { flex: 1 }` — занимает всё свободное место по вертикали.
- `min-height: 0` — разрешает flex-детям сжиматься. Без него дочерние элементы не могут стать меньше своего содержимого.
- `.screen` скрыт, `.screen--active` показан.

### Шапка

```css
.topbar {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

`position: sticky` фиксирует шапку при прокрутке.

Навигация:

```css
.topnav__item--active {
  background: var(--accent-light);
  color: var(--accent);
}
```

Активный пункт меню подсвечивается фоновым цветом.

### Трёхколоночный макет мессенджера

```css
.chat-layout {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr var(--info-w);
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
```

Grid с тремя колонками. Левая и правая — фиксированные (через переменные), центральная — «резиновая» (`1fr`).

`flex: 1; min-height: 0; overflow: hidden;` — растягивается на доступное место, не даёт содержимому выходить за границы.

Каждая колонка:

```css
.chat-sidebar,
.chat-main,
.chat-info {
  min-height: 0;
  overflow: hidden;
}
```

Скролл внутри колонок отключён, так как содержимое фиксированное.

### Список чатов

```css
.chat-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  transition: background .15s;
}
```

Элемент списка. Активный:

```css
.chat-item--active {
  background: var(--accent-light);
  border-left: 3px solid var(--accent);
}
```

Длинные имена и превью обрезаются с многоточием:

```css
.chat-item__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Сообщения

```css
.message {
  display: flex;
  gap: 12px;
  max-width: 75%;
}
```

Сообщение занимает не более 75% ширины. Собственные сообщения — наоборот:

```css
.message--own {
  align-self: flex-end;
  flex-direction: row-reverse;
}
```

`.message__bubble` — «пузырь» с фоном и рамкой. У собственных — акцентный фон.

### Поле ввода и плашка

```css
.chat-input {
  padding: 12px 20px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

.chat-input__notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: .78rem;
  color: var(--text-secondary);
}

.chat-input__form {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Экраны с карточками

```css
.cards-screen {
  padding: 32px 40px 60px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
```

Две колонки карточек.

### Экран поиска

```css
.user-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .user-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .user-grid { grid-template-columns: 1fr; }
}
```

Сетка карточек пользователей. На узких экранах переходит на 2 или 1 колонку.

### Переключатель

```css
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.switch__slider {
  position: absolute;
  inset: 0;
  background: var(--bg-active);
  border-radius: 999px;
  transition: background .2s;
}

.switch__slider::before {
  content: '';
  position: absolute;
  height: 18px; width: 18px;
  left: 3px; top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform .2s;
}

.switch input:checked + .switch__slider {
  background: var(--accent);
}

.switch input:checked + .switch__slider::before {
  transform: translateX(20px);
}
```

Настоящий чекбокс скрыт (`opacity: 0`). Видимый вид создаёт `.switch__slider`. Состояние `:checked` переключает цвет фона и сдвигает кружок.

Селектор `+` — соседний элемент. `input:checked + .switch__slider` означает «`.switch__slider`, идущий сразу после отмеченного `input`».

### Футер

```css
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  padding: 24px 32px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
```

Две колонки: дисклеймер (слева) и авторы (справа). `flex-shrink: 0` не даёт футеру сжиматься, если контент высокий.

На узких экранах:

```css
@media (max-width: 900px) {
  .footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

Колонки становятся одна под другой.

---

## Тема

Тема управляется атрибутом `data-theme` на `<html>`:

```html
<html data-theme="light">
<html data-theme="dark">
```

CSS реагирует на атрибут через селектор:

```css
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  /* ... */
}
```

Переопределяются только переменные цвета — все стили, использующие `var(--bg)` и `var(--text)`, обновляются автоматически.

Размеры (`--radius`, `--sidebar-w` и т.д.) в тёмной теме не меняются.

---

## Принципы

1. Все цвета — через переменные.
2. Классы именуются по BEM.
3. `box-sizing: border-box` для всех элементов.
4. `transition` — только на `background`, `color`, `border-color`, короткие (`.15s`).
5. Медиа-запросы для сеток (карточки, футер).