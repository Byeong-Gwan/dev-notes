export function showOptionPopup(onConfirm) {
  fetch('./../components/option/option.html')
    .then(res => res.text())
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const popup = wrapper.querySelector('.option-popup-overlay');
      document.body.appendChild(popup);

      // 확인 버튼
      popup.querySelector('#option-confirm').onclick = () => {
        const temp = popup.querySelector('input[name="temp"]:checked');
        const size = popup.querySelector('input[name="size"]:checked');
        const extras = popup.querySelectorAll('input[name="extra"]:checked');

        if (!temp || !size) {
          alert('온도와 사이즈는 필수입니다.');
          return;
        }

        const selectedExtras = Array.from(extras).map(e => e.value);

          // ✅ 기타 옵션 추가
        const customExtra = popup.querySelector('#custom-option').value.trim();
        if (customExtra) {
          selectedExtras.push(customExtra);
        }

        onConfirm({
          temp: temp.value,
          size: size.value,
          extras: selectedExtras
        });

        document.body.removeChild(popup);
      };

      // 취소 버튼
      popup.querySelector('#option-cancel').onclick = () => {
        document.body.removeChild(popup);
      };
    });
}

