import { Stores } from './../stores.js';
import { showOptionPopup } from './../../components/option/optionPopup.js';

const API_BASE = 'http://localhost:8088/api/menus';

class MenuApp {
  constructor() {
    this.$menuList = document.getElementById('menu-list');
    this.$menuName = document.getElementById('menu-name');
    this.$addBtn = document.getElementById('menu-add-btn');

    this.$addBtn.addEventListener('click', this.addMenu.bind(this));
    this.render();
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
      const res = await fetch(API_BASE);
      const items = await res.json();
      this.$menuList.innerHTML = '';

      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="menu-text">${item.name}</span>
          <span class="menu-quantity">
            <button class="plus">+</button>
            <span class="count">${item.count}</span>
            <button class="minus">-</button>
          </span>
        `;

        li.querySelector('.plus').onclick = async () => {
          await this.updateCount(item.id, item.count + 1);
        };

        li.querySelector('.minus').onclick = async () => {
          if (item.count <= 1) {
            await this.deleteMenu(item.id);
          } else {
            await this.updateCount(item.id, item.count - 1);
          }
        };

        this.$menuList.appendChild(li);
      });
    } catch (err) {
      console.error('메뉴 로딩 실패:', err);
    }
  }

  async updateCount(id, newCount) {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
