export function $ (selector, scope) {
  return qsa(selector, scope, true);
}

export function qsa (selector, scope, first) {
  const elementList = (scope || document).querySelectorAll(selector);
  return first ? elementList[0] : elementList;
}

export function noop () {}

export function each (array, cb) {
  if (!array || !array.length) return;
  for (let i = 0; i < array.length; i++) {
    cb.call(array, array[i], i, array);
  }
}

export function pluralization (value) {
  return Number(value) === 0 ? " 개" : " 개";
}

export function on (target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}

export function delegate (target, selector, type, handler) {
  function dispatchEvent(event) {
    const potentialMatch = event.target.closest(selector);
    if (potentialMatch && target.contains(potentialMatch)) {
      handler.call(potentialMatch, event);
    }
  }
  const useCapture = type === 'blur' || type === 'focus';
  on(target, type, dispatchEvent, useCapture);
}

export function parent (element, tagName) {
  while (element && element.parentNode) {
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    element = element.parentNode;
  }
  return null;
}

export function nodeListEach (nodeList, cb) {
  for (let i = 0; i < nodeList.length; i++) {
    cb.call(nodeList, nodeList[i], i, nodeList);
  }
}

// ✅ 로딩바 제어 함수 추가
export function showLoading() {
  const bar = $('#loading-bar');
  if (bar) {
    bar.style.display = 'block';
    bar.style.width = '50%';
  }
}

export function hideLoading() {
  const bar = $('#loading-bar');
  if (bar) {
    bar.style.width = '100%';
    setTimeout(() => {
      bar.style.display = 'none';
      bar.style.width = '0%';
    }, 300);
  }
}
