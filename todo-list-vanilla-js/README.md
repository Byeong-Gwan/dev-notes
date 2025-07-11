# A simple to do list in a pure vanilla javascript

[DEMO PAGE HERE, I hope you like :)](http://expalmer.github.io/todo-list-vanilla-js/)


## 필요한 개념(공부)
- 실행 컨텍스트
- 클로저, 스코프


; (function(context) {})(this); 구조로 사용하는 이유

- 전역 변수 오염을 막고, 필요한 값만 전역에 노출하려고 쓰는 고전적인 안전 패턴

✔ function(context) { ... } → 함수를 선언하고
✔ (this) → 즉시 실행하면서 this 값을 context로 넘김
✔ 맨 앞에 ; → 혹시 모를 이전 코드의 문법 오류 방지 (필수는 아님, 관습적)