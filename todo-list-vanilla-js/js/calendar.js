const calendar = document.getElementById('calendar');
let selectedDate = null;

const holidays = [
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-03', name: '개천절' },
];

let requests = [];

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();
  
    calendar.innerHTML = '';
  
    for (let i = 0; i < startDay; i++) {
      calendar.innerHTML += '<div></div>';
    }
  
    for (let day = 1; day <= lastDate; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
      const div = document.createElement('div');
      div.className = 'day';
      div.textContent = day;
  
      // 공휴일 표시
      const holiday = holidays.find(h => h.date === dateStr);
      if (holiday) {
        div.classList.add('holiday');
        const tag = document.createElement('div');
        tag.className = 'request';
        tag.textContent = holiday.name;
        div.appendChild(tag);
      }
  
      // 신청 상태 표시
      const req = requests.find(r => r.date === dateStr);
      if (req) {
        if (req.type === '재택') {
          div.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
        } else if (req.type === '연차') {
          div.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
        }
  
        const tag = document.createElement('div');
        tag.className = 'request';
        tag.textContent = `${req.type} (${req.status || '대기중'})`;
        div.appendChild(tag);
      }
  
      div.addEventListener('click', () => {
        selectedDate = dateStr;
        openPopup(dateStr);
      });
  
      calendar.appendChild(div);
    }
  }
  

  function openPopup(dateStr) {
    fetch('./components/calendarPopup.html')
    .then(res => {
      if (!res.ok) throw new Error('팝업 HTML 로드 실패');
      return res.text();
    })
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      const popup = wrapper.querySelector('.popup-overlay');

      if (!popup) {
        console.error('popup-overlay 요소를 찾을 수 없습니다.');
        return;
      }

      document.body.appendChild(popup);

      const popupDateEl = popup.querySelector('#popup-date');
      if (!popupDateEl) {
        console.error('#popup-date 요소를 찾을 수 없습니다.');
        return;
      }

      popupDateEl.textContent = `신청일: ${selectedDate}`;

      // ✅ 신청 버튼
      popup.querySelector('#confirm').onclick = () => {
        const type = popup.querySelector('input[name="type"]:checked')?.value;
        const reason = popup.querySelector('#reason').value;

        if (!type) {
          alert('신청 유형을 선택하세요');
          return;
        }

        requests = requests.filter(r => r.date !== selectedDate); // 중복 제거
        requests.push({
          date: selectedDate,
          type,
          reason,
          status: '대기중',
        });

        document.body.removeChild(popup);
        generateCalendar(2025, 7);
      };

      // ✅ 취소 버튼
      popup.querySelector('#cancel').onclick = () => {
        requests = requests.filter(r => r.date !== selectedDate);
        document.body.removeChild(popup);
        generateCalendar(2025, 7);
      };
    })
    .catch(err => console.error('팝업 불러오기 에러:', err));
}


// 초기 렌더
generateCalendar(2025, 7);
