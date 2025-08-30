import { Stores } from './../stores.js';
import { showOptionPopup } from './../../components/option/optionPopup.js';

const API_BASE = '/api/menus';
const COMPOSE_API = '/api/external/compose/menus';

class MenuApp {
  constructor() {
    this.$menuList = document.getElementById('menu-list');
    this.$menuName = document.getElementById('menu-name');
    this.$addBtn = document.getElementById('menu-add-btn');
    this.me = null; // { username, role }
    this.injectComposePicker();

    this.$addBtn.addEventListener('click', this.addMenu.bind(this));
    this.loadMe().then(() => this.render());
  }

  placeholderFor(name) {
    const text = (name || 'Menu').slice(0, 8);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
  <defs>
    <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0%' stop-color='#43404a'/>
      <stop offset='100%' stop-color='#2d2a32'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' font-family='sans-serif' fill='#b3ffb3'>${text}</text>
 </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  async loadMe() {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) return;
      this.me = await res.json();
    } catch {}
  }

  async injectComposePicker() {
    const container = document.createElement('div');
    container.className = 'compose-block';
    container.innerHTML = `
      <div id="compose-gallery" class="compose-gallery"></div>
    `;
    this.$menuList.before(container);

    const $gallery = container.querySelector('#compose-gallery');

    const loadGallery = async () => {
      $gallery.innerHTML = '<div class="compose-loading">불러오는 중...</div>';
      try {
        const res = await fetch(COMPOSE_API);
        const data = await res.json();
        $gallery.innerHTML = '';
        data.items.forEach(item => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'compose-card';

          const img = document.createElement('img');
          img.src = item.image || this.placeholderFor(item.name);
          img.alt = item.name || '';
          img.className = 'compose-card__img';
          card.appendChild(img);

          const label = document.createElement('div');
          label.textContent = item.name || '이름 없음';
          label.className = 'compose-card__label';
          card.appendChild(label);

          card.onclick = () => {
            this.$menuName.value = item.name || '';
            this.addMenu();
          };

          $gallery.appendChild(card);
        });
      } catch (e) {
        $gallery.innerHTML = '<div class="compose-error">불러오기 실패</div>';
      }
    };

    loadGallery();
  }

  async addMenu() {
    const name = this.$menuName.value.trim();
    if (!name) return;

    showOptionPopup(async (optionData) => {
      const optionText = `(${optionData.temp}, ${optionData.size}${optionData.extras.length ? ', ' + optionData.extras.join(', ') : ''})`;

      const newItem = {
        name: `${name} ${optionText}`,
        options: optionData,
        count: 1
      };

      try {
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(newItem)
        });
        this.$menuName.value = '';
        this.render();
      } catch (err) {
        console.error('메뉴 추가 실패:', err);
      }
    });
  }

  async render() {
    try {
      const res = await fetch(API_BASE, { credentials: 'include' });
      const items = await res.json();
      this.$menuList.innerHTML = '';

      items.forEach(item => {
        const li = document.createElement('li');
        const pickedNames = Array.isArray(item.pickedBy) ? item.pickedBy : [];
        const pickedLabel = pickedNames.length ? `<div class="picked-by">${pickedNames.join(', ')}</div>` : '';
        li.innerHTML = `
          <div class="menu-main">
            <span class="menu-text">${item.name}</span>
            ${pickedLabel}
          </div>
          <span class="menu-quantity">
            <button class="plus">+</button>
            <span class="count">${item.count}</span>
            <button class="minus">-</button>
          </span>
        `;

        const userDisplay = (this.me && (this.me.name || this.me.username)) ? (this.me.name || this.me.username) : null;
        const hasMine = userDisplay ? pickedNames.includes(userDisplay) : false;

        const plusBtn = li.querySelector('.plus');
        const minusBtn = li.querySelector('.minus');

        plusBtn.onclick = async () => {
          await this.updateCountAction(item.id, 'increment');
        };

        minusBtn.disabled = !hasMine;
        minusBtn.title = hasMine ? '' : '내가 선택한 항목이 없습니다';
        minusBtn.onclick = async () => {
          if (minusBtn.disabled) return;
          await this.updateCountAction(item.id, 'decrement');
        };

        this.$menuList.appendChild(li);
      });
    } catch (err) {
      console.error('메뉴 로딩 실패:', err);
    }
  }

  async updateCountAction(id, action) {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action })
      });
      this.render();
    } catch (err) {
      console.error('수정 실패:', err);
    }
  }

  async updateCount(id, newCount) {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ count: newCount })
      });
      this.render();
    } catch (err) {
      console.error('수량 업데이트 실패:', err);
    }
  }

  async deleteMenu(id) {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      this.render();
    } catch (err) {
      console.error('메뉴 삭제 실패:', err);
    }
  }
}

export default MenuApp;
