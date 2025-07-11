export function loadNavbar() {
    fetch('./components/navbar.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('navbar').innerHTML = html;
  
        // ✅ CSS 중복 로드 방지
        if (!document.querySelector('link[href="./css/components/navbar.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = './css/components/navbar.css';
          document.head.appendChild(link);
        }
  
        const tabButtons = document.querySelectorAll('.tab-btn');
        const currentPage = window.location.pathname.split('/').pop();
  
        // ✅ active 초기화 후 현재 페이지에만 active 부여
        tabButtons.forEach(btn => {
          btn.classList.remove('active'); // << 기존 active 전부 제거
          if (btn.dataset.target === currentPage) {
            btn.classList.add('active');  // << 현재 페이지만 active
          }
  
          btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active')); // << 클릭 시 전부 제거
            btn.classList.add('active');                            // << 클릭한 것만 active
  
            const target = btn.dataset.target;
            if (target) location.href = target;
          });
        });
      });
  }
  