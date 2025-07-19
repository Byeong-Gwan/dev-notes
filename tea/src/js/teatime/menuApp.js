import { Stores } from './../stores.js';
import { showOptionPopup } from './../../components/option/optionPopup.js';

class MenuApp {
  constructor(key) {
    this.store = new Stores(key);
    this.$menuList = document.getElementById('menu-list');
    this.$menuName = document.getElementById('menu-name');
    // this.$menuPrice = document.getElementById('menu-price');
    this.$addBtn = document.getElementById('menu-add-btn');

    this.$addBtn.addEventListener('click', this.addMenu.bind(this));
    this.render();
  }

  addMenu() {
    const name = this.$menuName.value.trim();
    // const price = parseInt(this.$menuPrice.value.trim(), 10);
    if (!name) return;

    showOptionPopup((optionData) => {
      const optionText = `(${optionData.temp}, ${optionData.size}${optionData.extras.length ? ', ' + optionData.extras.join(', ') : ''})`;

      const item = {
        name: `${name} ${optionText}`,
        options: optionData
      };

      this.store.save(item);
      this.$menuName.value = '';
      this.render();
    });
  }

  render() {
    const items = this.store.getAll();
    this.$menuList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      const count = item.count || 1;

      li.innerHTML = `
        <span class="menu-text">${item.name}</span>
        <span class="menu-quantity">
          <button class="plus">+</button>
          <span class="count">${count}</span>
          <button class="minus">-</button>
        </span>
      `;

      li.querySelector('.plus').onclick = () => {
        item.count = count + 1;
        this.store.save(item);
        this.render();
      };

      li.querySelector('.minus').onclick = () => {
        item.count = count - 1;
        if (item.count <= 0) {
          this.store.destroy(item.id, () => this.render());
        } else {
          this.store.save(item);
          this.render();
        }
      };

      this.$menuList.appendChild(li);
    });
  }
}

export default MenuApp;
