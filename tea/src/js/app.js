import { $, qsa, each, pluralization, on, delegate, parent, nodeListEach, showLoading, hideLoading } from './helpers.js';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class App {
  constructor() {
    this.apiBase = '/api/todos';
    this.currentId = 0;
    this.items = []; // ✅ local state 저장

    this.$insert = $('#js-insert');
    this.$toggleAll = $('#js-toggle-all');
    this.$bar = $('#js-bar');
    this.$list = $('#js-list');
    this.$clearCompleted = $('#js-clear-completed');
    this.$total = $('#js-total');
    this.$filters = $('#js-filters');

    this.addEventListeners();
    this.init();
  }

  async init() {
    // 💥 URL에 해시 없으면 기본값 '#/all'로 설정
    if (!document.location.hash) {
      document.location.hash = '#/all';
    }
    this.items = await this.fetchTodos();
    this.render();
  }

  addEventListeners() {
    on(this.$insert, 'keypress', this.onInsert.bind(this));
    on(this.$toggleAll, 'click', this.onToggleAll.bind(this));
    delegate(this.$list, '.toggle', 'click', this.onToggle.bind(this));
    delegate(this.$list, '.destroy', 'click', this.onDestroy.bind(this));
    on(this.$clearCompleted, 'click', this.onClearCompleted.bind(this));
    delegate(this.$filters, '.button', 'click', this.onFilter.bind(this));
    delegate(this.$list, 'span', 'dblclick', this.onStartEditing.bind(this));
    delegate(this.$list, '.edit', 'keyup', this.onEditingCancel.bind(this));
    delegate(this.$list, '.edit', 'keypress', this.onEditingDone.bind(this));
    delegate(this.$list, '.edit', 'blur', this.onEditingLeave.bind(this));
  }

  async fetchTodos() {
    const res = await fetch(this.apiBase);
    return res.json();
  }

  async saveTodo(item) {
    const method = item.id ? 'PUT' : 'POST';
    const url = item.id ? `${this.apiBase}/${item.id}` : this.apiBase;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  }

  async deleteTodo(id) {
    await fetch(`${this.apiBase}/${id}`, { method: 'DELETE' });
  }

  render() {
    const filter = this.filter();
    let filteredItems = [...this.items];

    if (filter === 'completed') {
      filteredItems = filteredItems.filter(item => item.completed);
    } else if (filter === 'active') {
      filteredItems = filteredItems.filter(item => !item.completed);
    }

    const fragment = document.createDocumentFragment();

    if (filteredItems.length === 0) {
      const li = document.createElement('li');
      li.textContent =
        filter === 'completed'
          ? '완료된 list가 없습니다.'
          : filter === 'active'
          ? '진행 중인 list가 없습니다.'
          : '등록된 list가 없습니다.';
      li.style.color = '#ccc';
      li.style.textAlign = 'center';
      li.style.padding = '1rem';
      fragment.appendChild(li);
    } else {
      filteredItems.forEach(item => {
        fragment.appendChild(this.nodeItem(item));
      });
    }

    this.$list.replaceChildren(fragment);
    this.showControls();
  }

  showControls() {
    const total = this.items.length;
    const completed = this.items.filter(item => item.completed).length;
    const active = total - completed;
    this.$toggleAll.style.display = total ? 'block' : 'none';
    this.$toggleAll.checked = total && total === completed;
    this.$bar.style.display = total ? 'flex' : 'none';
    this.$total.textContent = `${active} ${pluralization(active)}`;
    this.$clearCompleted.style.display = completed ? 'inline-block' : 'none';
  }

  nodeItem(item) {
    const li = document.createElement('li');
    li.setAttribute('data-id', item.id);
    li.className = item.completed ? 'completed' : '';

    const div = document.createElement('div');
    div.className = 'todo';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.className = 'toggle';
    toggle.checked = item.completed;

    const span = document.createElement('span');
    span.textContent = item.text;

    const destroy = document.createElement('button');
    destroy.className = 'destroy';

    const editInput = document.createElement('input');
    editInput.className = 'edit';
    editInput.value = item.text;

    div.append(toggle, span, destroy);
    li.append(div, editInput);

    return li;
  }

  getItemId(element) {
    const li = parent(element, 'li');
    return Number(li.dataset.id);
  }

  getElementByDataId(id) {
    return $(`[data-id="${id}"]`);
  }

  async onInsert(event) {
    const text = event.target.value.trim();
    if (text && event.keyCode === ENTER_KEY) {
      const newItem = { text, completed: false };
      const res = await fetch(this.apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const savedItem = await res.json();
      this.items.push(savedItem);
      event.target.value = '';
      this.render();
    }
  }

  async onToggleAll(event) {
    const checked = event.target.checked;
    this.items.forEach(item => (item.completed = checked));
    this.render();

    showLoading();
    await Promise.all(
      this.items.map(item =>
        this.saveTodo({ id: item.id, completed: item.completed })
      )
    );
    hideLoading();
  }

  async onToggle(event) {
    const id = this.getItemId(event.target);
    const item = this.items.find(i => i.id === id);
    item.completed = event.target.checked;
    this.updateItemUI(item);
    this.showControls();

    showLoading();
    try {
      await this.saveTodo({ id, completed: item.completed });
    } catch (err) {
      console.error('Failed to update todo', err);
    } finally {
      hideLoading();
    }
  }


  async onDestroy(event) {
    const id = this.getItemId(event.target);
    this.items = this.items.filter(item => item.id !== id);
    this.render();

    // background sync
    await this.deleteTodo(id);
  }

  async onClearCompleted() {
    const completedItems = this.items.filter(item => item.completed);
    this.items = this.items.filter(item => !item.completed);
    this.render();

    showLoading();
    await Promise.all(completedItems.map(item => this.deleteTodo(item.id)));
    hideLoading();
  }

  onFilter(event) {
    event.preventDefault();
    const targetHash = event.target.getAttribute('href');
    if (document.location.hash !== targetHash) {
      document.location.hash = targetHash;
    }
    this.render();
  }

  onStartEditing(event) {
    const li = parent(event.target, 'li');
    const input = $('.edit', li);
    this.currentId = Number(li.dataset.id);
    li.classList.add('editing');
    input.focus();
  }

  onEditingCancel(event) {
    if (event.keyCode === ESC_KEY) {
      event.target.dataset.isCanceled = true;
      event.target.blur();
    }
  }

  async onEditingDone(event) {
    if (event.keyCode === ENTER_KEY) {
      event.target.blur();
    }
  }

  async onEditingLeave(event) {
    const input = event.target;
    const id = this.getItemId(input);
    const text = input.value.trim();
    const item = this.items.find(i => i.id === id);
    const li = this.getElementByDataId(id);

    if (text) {
      item.text = text;
      li.querySelector('span').textContent = text;
      li.classList.remove('editing');

      showLoading();
      await this.saveTodo({ id, text });
      hideLoading();
    } else {
      if (input.dataset.isCanceled) {
        li.classList.remove('editing');
      } else {
        await this.onDestroy({ target: input });
      }
    }
  }

  updateItemUI(item) {
    const li = this.getElementByDataId(item.id);
    li.classList.toggle('completed', item.completed);
    li.querySelector('.toggle').checked = item.completed;
  }

  filter() {
    const hash = document.location.hash;
    const buttons = qsa('.button', this.$filters);
    nodeListEach(buttons, button => {
      button.classList.toggle('selected', button.getAttribute('href') === hash);
    });
    const filterHash = hash.split('#/')[1];
    return filterHash !== 'all' ? filterHash : false;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
