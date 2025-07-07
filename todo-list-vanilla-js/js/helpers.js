
// 선택자(selector)를 기준으로 DOM 요소를 찾는 기능
export function $ ( selector, scope ) {
  return qsa( selector, scope, true );
}

export function qsa ( selector, scope, first ) {
  const elementList = ( scope || document).querySelectorAll( selector );
  return first ? elementList[0] : elementList;
};

export function noop () {};


export function each ( array, cb ) {
  if (!array || !array.length) return;

  for (let i = 0; i < array.length; i++) {
    cb.call(array, array[i], i, array);
  }
};

export function pluralization ( value ) {
  return Number(value) === 1 ? "" : "s";
};

export function on ( target, type, callback, useCapture ) {
  target.addEventListener(type, callback, !!useCapture);
};

export function delegate ( target, selector, type, handler ) {
  function dispatchEvent(event) {
   const potentialMatch = event.target.closest(selector);
   if (potentialMatch && target.contains(potentialMatch)) {
    handler.call(potentialMatch, event);
   }
  }

  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  const useCapture = type === 'blur' || type === 'focus';

  on(target, type, dispatchEvent, useCapture);
};

export function parent ( element, tagName ) {
  while (element && element.parentNode) {
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    element = element.parentNode;
  }
  return null;
};

// Prototype
// NodeList.prototype.each = function( fn ) {
//   const len = this.length;
//   let idx = -1;
//   while( ++idx < len ) {
//     fn.call(this, this[idx], idx, this);
//   }
// }

export function nodeListEach (nodeList, cb) {
  for (let i = 0; i < nodeList.length; i++) {
    cb.call(nodeList, nodeList[i], i, nodeList);
  }
}

