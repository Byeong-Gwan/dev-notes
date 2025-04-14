/**
 * 🎯 분석 과제
    renderList() 함수는 어떤 역할을 하고, 내부 로직은 어떤 흐름인가요?

    탭 클릭 시 동작하는 방식은 어떤 이벤트 흐름으로 구현되어 있나요?

    리스트를 클릭했을 때 어떻게 상태가 변경되고, 화면이 다시 그려지나요?

    todos 배열은 어떤 구조를 가지며, 어떻게 갱신되나요?

    이 코드의 구조에서 개선할 수 있는 부분은 어떤 게 있을까요?

✍️ 추가 실습 과제 (선택)
    각 함수마다 주석을 추가해보고

    “삭제 버튼”을 추가해서 할 일 삭제 기능을 구현해보세요.

    localStorage 연동하여 새로고침 후에도 유지되도록 개선해보세요.
 */

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
  