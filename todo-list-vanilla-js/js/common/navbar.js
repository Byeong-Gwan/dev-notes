// js/common/navbar.js

export function loadNavbar() {
    fetch('./components/navbar.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('navbar').innerHTML = html;
  
        // ✅ CSS 동적 로드 추가
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './css/components/navbar.css';
        document.head.appendChild(link);
  
        // ✅ 버튼 이벤트 설정
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
  
            // ✅ data-target 속성이 있으면 이동
            const target = btn.dataset.target;
            if (target) location.href = target;
          });
        });
      });
  }
  