# Java공부 (Console)

간단한 콘솔 출력으로 자바 기초를 학습할 수 있는 폴더입니다.

## 폴더 구조
- `src/` : 자바 소스 코드
  - `basics/` : 기초 예제들 (각 파일마다 `main` 보유)
- `scripts/` : 빌드 및 실행 스크립트
- `out/` : 컴파일 산출물 (자동 생성)

## 빠른 시작
1) 컴파일
```
./scripts/compile.sh
```

2) 실행 (기본: `basics.Hello`)
```
./scripts/run.sh
```

3) 특정 클래스 실행 (예: `basics.Variables`)
```
./scripts/run.sh basics.Variables
```

## 학습 순서 제안
1. `basics.Hello`
2. `basics.Variables` (기본 타입/문자열)
3. `basics.ControlFlow` (if/switch)
4. `basics.Loops` (for/while/향상된 for)
5. `basics.ArraysDemo` (배열)
6. `basics.Methods` (메서드/파라미터/리턴)

원하는 주제 파일을 복사/수정해 새로운 실습을 자유롭게 추가하세요.
