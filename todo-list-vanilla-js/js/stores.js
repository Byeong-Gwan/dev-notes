/**
 
  * Create → save()

  * Read → find(), findAll()

  * Update → save() (id 있으면 업데이트)

  * Delete → destroy(), drop()

 */

export class Stores {
  // 생성자를 통해 초기값 셋팅
  constructor (key) {
    this.key = key;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }

  find (id, cb) {
    // localStorage 에 저장 된 문자열을 배열 및 객체로 변환해서 가져온다.
    const items = JSON.parse(localStorage.getItem(this.key));
    // 배열 및 객체로 가져운 items 에서 id 값과 인자로 받은 id 값을 비교한다.
    const item = items.find(item => item.id === id); // 없으면 undefined 반환
    cb?.call(this, item || {}); // item 값이 undefined 이면 빈 객체로 반환
  }

  findAll (cb) {
    // 전체 localStorage있는 데이터 찾는 로직
    let items = JSON.parse(localStorage.getItem(this.key));
    cb?.call(this, items);
  }

  save (item, cb, options) {
    // localStorage 데이터에 있는 값을 배열로 담는다.
    let items = JSON.parse(localStorage.getItem(this.key));

    // item에 id 값이 있으면 
    if (item.id) {
      // Update
      items = items.map(x => {
        // id 값이 같으면 
        if (x.id === item.id) {
          // 구조 분해를 통해 덮어씌운다.
          return {...x, ...item}; // 구조 분해로 병합
        }
        return x;
      });
    } else {
      // Insert
      // item.id = new Date().getTime() 이전 방식보다 간단히 처리
      // 같은 값이 없으면 새로 추가해준다.
      item.id = Date.now();
      items.push(item);
    }
    // 새로 저장해줌
    localStorage.setItem(this.key, JSON.stringify(items));
    // 콜백 함수가 있으면(cb가 정의돼 있으면), this를 바인딩해서 실행
    cb?.call(this, item);
  }

  destroy (id, cb) {
    let items = JSON.parse(localStorage.getItem(this.key));
    // id 값이 다른 값들만 남기고 items에 담아준다.(같은 값 제외)
    items = items.filter(x => x.id !== id);
    localStorage.setItem(this.key, JSON.stringify(items));
    cb?.call(this, true);
  }

  drop (cb) {
    localStorage.setItem(this.key, JSON.stringify([]));
    this.findAll(cb);
  }
}