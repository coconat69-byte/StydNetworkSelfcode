/**
 * СтудСеть — макет мессенджера
 */

(function () {
  'use strict';

  const $  = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const state = {
    currentUser: MOCK_DATA.currentUser,
    activeChatId: MOCK_DATA.chats[0].id,
    filter: 'all',
  };

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Аватар в шапке
    $('#current-user-avatar').src = state.currentUser.avatar;

    // Навигация по вкладкам
    $$('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });

    // Фильтры чатов
    $$('.chat-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        state.filter = btn.dataset.filter;
        $$('.chat-filter').forEach(b =>
          b.classList.toggle('chat-filter--active', b === btn)
        );
        renderChatList();
      });
    });

    // Отправка сообщения
    $('#send-message').addEventListener('click', sendMessage);
    $('#message-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    renderChatList();
    selectChat(state.activeChatId);
  }

  // ── Навигация ──────────────────────────────
  function navigate(screen) {
    $$('.screen').forEach(s => s.classList.remove('screen--active'));
    $('#screen-' + screen)?.classList.add('screen--active');

    $$('.topnav__item').forEach(b =>
      b.classList.toggle('topnav__item--active', b.dataset.nav === screen)
    );
  }

  // ── Список чатов ───────────────────────────
  function renderChatList() {
    const container = $('#chat-list');

    let chats = MOCK_DATA.chats;
    if (state.filter !== 'all') {
      chats = chats.filter(c => c.type === state.filter);
    }

    container.innerHTML = chats.map(chat => {
      const typeInfo = MOCK_DATA.chatTypes[chat.type];
      return `
        <div class="chat-item ${state.activeChatId === chat.id ? 'chat-item--active' : ''}"
             data-id="${chat.id}">
          <div class="chat-item__avatar">${chat.icon}</div>
          <div class="chat-item__body">
            <div class="chat-item__top">
              <span class="chat-item__name">${chat.name}</span>
              <span class="chat-item__time">${chat.lastTime}</span>
            </div>
            <div class="chat-item__preview">${chat.lastMessage}</div>
            <div class="chat-item__meta">
              <span class="chat-type chat-type--${chat.type}">${typeInfo.label}</span>
              ${chat.unread ? `<span class="badge badge--unread">${chat.unread}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', () => selectChat(+item.dataset.id));
    });
  }

  // ── Открыть чат ────────────────────────────
  function selectChat(chatId) {
    state.activeChatId = chatId;
    const chat = MOCK_DATA.chats.find(c => c.id === chatId);
    if (!chat) return;

    const typeInfo = MOCK_DATA.chatTypes[chat.type];

    // Заголовок
    $('#chat-title').textContent = chat.name;
    $('#chat-meta').textContent  = `${typeInfo.label} · ${chat.members} участников`;

    // Права на запись
    const canWrite = !typeInfo.readonly || state.currentUser.role === 'teacher';
    $('#chat-readonly').hidden    = canWrite;
    $('#chat-input-form').hidden  = !canWrite;

    // Сообщения
    renderMessages(chatId);

    // Информация справа
    renderChatInfo(chat);

    // Обновить выделение в списке
    renderChatList();
  }

  // ── Сообщения ──────────────────────────────
  function renderMessages(chatId) {
    const container = $('#chat-messages');
    const messages = MOCK_DATA.messages[chatId] || [];
    const me = state.currentUser.id;

    if (!messages.length) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center">Нет сообщений</p>';
      return;
    }

    container.innerHTML = messages.map(msg => {
      const user  = MOCK_DATA.users.find(u => u.id === msg.userId);
      const isOwn = msg.userId === me;
      const reactions = (msg.reactions || [])
        .map(r => `<span class="reaction">${r.emoji} ${r.count}</span>`)
        .join('');

      return `
        <div class="message ${isOwn ? 'message--own' : ''}">
          ${!isOwn ? `<img src="${user?.avatar}" class="avatar avatar--sm message__avatar" alt="">` : ''}
          <div class="message__bubble">
            ${!isOwn ? `<div class="message__author">${user?.name || ''}</div>` : ''}
            <div class="message__text">${msg.text}</div>
            <div class="message__time">${msg.time}</div>
            ${reactions ? `<div class="reactions">${reactions}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }

  // ── Информация о чате ──────────────────────
  function renderChatInfo(chat) {
    $('#chat-info-empty').hidden   = true;
    const content = $('#chat-info-content');
    content.hidden = false;

    const typeInfo = MOCK_DATA.chatTypes[chat.type];
    const members = MOCK_DATA.users.slice(0, 5);

    content.innerHTML = `
      <div class="chat-info__title">${chat.name}</div>
      <span class="chat-type chat-type--${chat.type}">${typeInfo.label}</span>
      <p class="chat-info__desc">${chat.description}</p>
      <div class="chat-info__section">
        <h4>Участники (${chat.members})</h4>
        <div class="member-list">
          ${members.map(u => `
            <div class="member-item">
              <img src="${u.avatar}" class="avatar avatar--sm" alt="">
              <div>
                <div class="member-item__name">${u.name}</div>
                <div class="member-item__role">${u.group}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ── Отправка сообщения ─────────────────────
  function sendMessage() {
    const input = $('#message-input');
    const text  = input.value.trim();
    if (!text) return;

    if (!MOCK_DATA.messages[state.activeChatId]) {
      MOCK_DATA.messages[state.activeChatId] = [];
    }

    MOCK_DATA.messages[state.activeChatId].push({
      userId: state.currentUser.id,
      text,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
    });

    // Обновим последнее сообщение в списке
    const chat = MOCK_DATA.chats.find(c => c.id === state.activeChatId);
    if (chat) {
      chat.lastMessage = text;
      chat.lastTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    input.value = '';
    renderMessages(state.activeChatId);
    renderChatList();
  }

})();