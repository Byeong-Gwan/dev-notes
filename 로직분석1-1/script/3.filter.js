// app.js
(function () {
    const tabs = document.querySelectorAll('.tab');
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
  
    let todos = [];
    let currentTab = 'all';
  
    function renderList() {
      list.innerHTML = '';
      const filtered = todos.filter((todo) => {
        if (currentTab === 'all') return true;
        if (currentTab === 'done') return todo.done;
        if (currentTab === 'todo') return !todo.done;
      });
  
      filtered.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.style.textDecoration = todo.done ? 'line-through' : 'none';
  
        li.addEventListener('click', () => {
          todos[idx].done = !todos[idx].done;
          renderList();
        });
  
        list.appendChild(li);
      });
    }
  
    addBtn.addEventListener('click', () => {
      const value = input.value.trim();
      if (value) {
        todos.push({ text: value, done: false });
        input.value = '';
        renderList();
      }
    });
  
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.type;
        renderList();
      });
    });
  })();
  