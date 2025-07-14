let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let requests = JSON.parse(localStorage.getItem('calendar-requests')) || [];
let popup, confirmBtn, cancelBtn;

async function loadPopup() {
  const res = await fetch('./components/calendarPopup.html');
  const html = await res.text();
  document.getElementById('popup-container').innerHTML = html;
  popup = document.querySelector('.popup-overlay');
  confirmBtn = popup.querySelector('#confirm');
  cancelBtn = popup.querySelector('#cancel');
  setupPopupEvents();
}

function renderWeekdays() {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  document.querySelector('.weekdays').innerHTML = weekdays.map(d => `<div>${d}</div>`).join('');
}

function groupByDate(data) {
  const grouped = {};
  data.forEach(r => {
    if (!grouped[r.date]) grouped[r.date] = {};
    if (!grouped[r.date][r.type]) grouped[r.date][r.type] = new Set();
    grouped[r.date][r.type].add(r.user);
  });
  return grouped;
}

function generateCalendar(year, month) {
  document.getElementById('month-title').textContent = `${year}년 ${month + 1}월`;
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarEl.innerHTML += `<div class="day prev-month"></div>`;
  }

  const grouped = groupByDate(requests);

  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'day';
    div.innerHTML = `<div class="day-number">${d}</div><div class="day-tags"></div>`;

    const tagContainer = div.querySelector('.day-tags');

    if (grouped[dateStr]) {
      Object.entries(grouped[dateStr]).forEach(([type, usersSet]) => {
        const users = Array.from(usersSet).join(', ');
        const tag = document.createElement('div');
        tag.className = `tag ${type}`;
        tag.innerHTML = `${type}: ${users} <span class="delete-btn">❌</span>`;
        tag.querySelector('.delete-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          deleteTag(dateStr, type);
        });
        tagContainer.appendChild(tag);
      });
    }

    div.addEventListener('click', () => openPopup('single', dateStr));
    calendarEl.appendChild(div);
  }
}

function openPopup(mode, dateStr) {
  popup.style.display = 'flex';
  popup.dataset.mode = mode;
  popup.dataset.date = dateStr;
  popup.querySelector('#popup-date').textContent = `${dateStr} 신청`;
  popup.querySelector('#popup-start-date').value = dateStr;
  popup.querySelector('#popup-end-date').value = dateStr;
  popup.querySelector('#user').value = '';
  popup.querySelector('#reason').value = '';
  popup.querySelectorAll('input[name="type"]').forEach(i => i.checked = false);
}

function setupPopupEvents() {
  confirmBtn.onclick = () => {
    const type = popup.querySelector('input[name="type"]:checked')?.value;
    const user = popup.querySelector('#user').value.trim();
    const reason = popup.querySelector('#reason').value.trim();
    const start = new Date(popup.querySelector('#popup-start-date').value);
    const end = new Date(popup.querySelector('#popup-end-date').value);

    if (!type || !user || start > end) {
      alert('모든 항목을 올바르게 입력하세요.');
      return;
    }

    let day = new Date(start);
    while (day <= end) {
      const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      requests.push({ id: Date.now() + Math.random(), date: dateStr, type, user, reason });
      day.setDate(day.getDate() + 1);
    }

    localStorage.setItem('calendar-requests', JSON.stringify(requests));
    popup.style.display = 'none';
    generateCalendar(currentYear, currentMonth);
  };

  cancelBtn.onclick = () => {
    popup.style.display = 'none';
  };
}

function deleteTag(dateStr, type) {
  requests = requests.filter(r => !(r.date === dateStr && r.type === type));
  localStorage.setItem('calendar-requests', JSON.stringify(requests));
  generateCalendar(currentYear, currentMonth);
}

document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

(async function init() {
  await loadPopup();
  renderWeekdays();
  generateCalendar(currentYear, currentMonth);
})();
