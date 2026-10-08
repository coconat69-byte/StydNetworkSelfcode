/**
 * Данные для макета СтудСеть
 */

const MOCK_DATA = {
  currentUser: {
    id: 1,
    name: 'Яша Кузнецов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasha',
    role: 'student',
  },

  users: [
    { id: 1, name: 'Яша Кузнецов',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasha',  group: 'исп341' },
    { id: 2, name: 'Мария Козлова',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',  group: 'исп341' },
    { id: 3, name: 'Дмитрий Волков', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', group: 'ат231' },
    { id: 4, name: 'Елена Новикова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',  group: 'э1031' },
    { id: 5, name: 'Игорь Петров',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Igor',   group: 'тм241' },
    { id: 6, name: 'Ольга Сидорова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',   group: '—', role: 'teacher' },
  ],

  chatTypes: {
    channel:   { label: 'Канал',       readonly: true  },
    group:     { label: 'Группа',      readonly: false },
    direction: { label: 'Направление', readonly: false },
    course:    { label: 'Курс',        readonly: false },
    flood:     { label: 'Флудилка',    readonly: false },
    dm:        { label: 'ЛС',          readonly: false },
  },

  chats: [
    { id: 1, type: 'channel',   icon: '📢', name: 'Объявления ОАТК',    members: 980, unread: 2, lastMessage: 'Расписание занятий на следующую…', lastTime: '10:30', description: 'Официальные объявления колледжа.' },
    { id: 2, type: 'group',     icon: '👥', name: 'исп341',             members: 25,  unread: 3, lastMessage: 'Мария: Кто сделал лабу по HTML?',  lastTime: '11:42', description: 'Чат группы исп341.' },
    { id: 3, type: 'direction', icon: '🎓', name: 'ИСиП — направление', members: 124, unread: 0, lastMessage: 'Преподаватель: Материалы к занят…', lastTime: '09:15', description: 'Общий чат направления ИСиП.' },
    { id: 4, type: 'course',    icon: '📚', name: '1 курс',             members: 280, unread: 1, lastMessage: 'Елена: Завтра экскурсия на базу!',  lastTime: '08:00', description: 'Чат всех студентов 1 курса.' },
    { id: 5, type: 'flood',     icon: '💬', name: 'Флудилка ОАТК',      members: 650, unread: 7, lastMessage: 'Игорь: Кто смотрел матч вчера?',  lastTime: '12:01', description: 'Свободное общение.' },
    { id: 6, type: 'dm',        icon: '👤', name: 'Мария Козлова',      members: 2,   unread: 1, lastMessage: 'Скинешь домашку по CSS?',       lastTime: '11:55', description: 'Личная переписка.' },
    { id: 7, type: 'dm',        icon: '👤', name: 'Дмитрий Волков',     members: 2,   unread: 0, lastMessage: 'Спасибо за помощь!',              lastTime: 'Вчера', description: 'Личная переписка.' },
  ],

  messages: {
    1: [
      { userId: 6, text: 'Уважаемые студенты! Расписание на следующую неделю опубликовано на портале ОАТК.', time: '10:30', reactions: [{ emoji: '👍', count: 18 }] },
      { userId: 6, text: '15 сентября — день открытых дверей для абитуриентов. Приглашаем!',                time: '09:00', reactions: [{ emoji: '👍', count: 12 }] },
    ],
    2: [
      { userId: 2, text: 'Кто сделал лабу по HTML?',         time: '11:42', reactions: [] },
      { userId: 1, text: 'Я почти доделал, могу помочь',     time: '11:45', reactions: [{ emoji: '🔥', count: 2 }] },
      { userId: 2, text: 'Дедлайн — пятница до 23:59',       time: '11:50', reactions: [{ emoji: '😱', count: 3 }] },
    ],
    3: [
      { userId: 6, text: 'Материалы к занятию выложены в личном кабинете.', time: '09:15', reactions: [{ emoji: '👍', count: 8 }] },
      { userId: 1, text: 'Спасибо!',                                        time: '09:20', reactions: [] },
    ],
    4: [
      { userId: 4, text: 'Завтра экскурсия на базу!', time: '08:00', reactions: [] },
    ],
    5: [
      { userId: 5, text: 'Кто смотрел матч вчера?', time: '12:01', reactions: [{ emoji: '👀', count: 5 }] },
      { userId: 4, text: 'Ещё нет, жду выходных',    time: '12:03', reactions: [{ emoji: '😂', count: 2 }] },
    ],
    6: [
      { userId: 2, text: 'Привет, Яша! Скинешь домашку по CSS?', time: '11:50', reactions: [] },
      { userId: 1, text: 'Конечно, сейчас отправлю',              time: '11:52', reactions: [{ emoji: '👍', count: 1 }] },
    ],
  },
};