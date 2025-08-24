# 프로젝트 로직 파악 가이드

아래 순서대로 보면 전반 흐름을 빠르게 이해할 수 있습니다. 각 단계는 실제 파일 경로와 핵심 확인 포인트를 포함합니다.

## 1) 서버 진입점과 전역 설정
- 파일: `server/server.js`
- 체크리스트
  - Express 앱 생성, 미들웨어 등록 순서(`express.json()`, `express-session`, CORS 등)
  - 정적 파일 서빙(`src/`), 포트(`8088`)
  - SQLite 연결/초기화, 유지보수 작업(있다면)
  - 라우트 마운트 지점(인증/관리자/요청)

## 2) 인증/세션/권한
- 파일: `server/server.js` 내 인증 라우트들
- 체크리스트
  - `POST /api/auth/login`: 입력 trim, 세션 `{ id, username, role }` 저장
  - `GET /api/auth/me`: 세션 조회
  - `POST /api/auth/logout`: 세션 종료
  - `requireAdmin` 미들웨어: `req.session.user?.role === 'admin'`

## 3) 관리자 라우트
- 파일: 관리자 관련 라우트 정의부(동일 파일 또는 모듈)
- 체크리스트
  - `GET /api/admin/users?status=pending`: 대기 사용자 목록
  - `POST /api/admin/users/:id/approve`: 승인 처리
  - (개발 전용) `GET|POST /api/dev/reset-admin`: 기본 관리자 리셋

## 4) 요청/달력(도메인) API
- 파일: 요청 관련 라우트
- 체크리스트
  - `GET /api/requests`: 목록
  - `POST /api/requests`: 생성 `{ date, type, user, reason }`
  - `DELETE /api/requests/:id`: 삭제
  - 데이터 스키마 감 잡기(테이블 컬럼)

## 5) 프론트 전역 초기화
- 파일: `src/js/ui-init.js`
- 체크리스트
  - 문서 로드 → 네비게이션 로딩(`navbar.html` 삽입)
  - 공통 이벤트/초기화 포인트

## 6) 네비게이션(UI) 구조
- 파일: `src/components/navbar/navbar.js`, `navbar.css`, `navbar.html`
- 체크리스트
  - 현재 탭 활성화 로직
  - 로그인/회원가입 ↔ 사용자명+로그아웃 전환
  - 관리자만 `관리자` 탭 표시
  - 모바일(≤768px)에서 상단 스티키 바 전환

## 7) 인증 프론트 유틸
- 파일: `src/js/auth.js`
- 체크리스트
  - `credentials: 'include'` 사용 유무
  - 로그인/로그아웃/세션 조회 함수와 에러 처리

## 8) 페이지 단위 로직
### 관리자 승인 페이지
- 파일: `src/js/admin/approvals.js`
- 흐름
  - DOM 렌더 → `GET /api/admin/users?status=pending` → 승인 버튼(`POST /api/admin/users/:id/approve`) → 목록 갱신

### 캘린더(핵심 UX)
- 파일: `src/components/calendar/calendar.js`, `calendar.css`
- 체크리스트
  - 같은 사용자의 연속 "연차" 구간 빌드
  - 시작일 큰 태그, 중간 연속 마커 렌더
  - 시작일 ❌로 구간 전체 삭제, 더블클릭으로 구간 수정 팝업
  - 월 경계 처리, 다른 타입(오전/오후반차/MOD)은 단건 태그

### 메뉴 페이지
- 파일: `src/pages/menu.html` (+ 관련 스크립트)
- 체크리스트
  - 관리자만 아카이브/리셋 버튼 노출(`/api/auth/me` 역할 기반)

## 9) 전역 테마/레이아웃
- 파일: `src/css/theme.css`, `src/components/navbar/navbar.css`
- 체크리스트
  - 배경/타이틀/컨테이너 폭 규칙
  - `body.with-sidebar`: 데스크톱 `margin-left + padding-left`, 모바일에서 여백 조정

## 10) 문서(README)로 크로스체크
- 파일: `server/README.md`, `src/README.md`
- 체크리스트
  - 위 흐름과 문서 일치 여부, 누락된 엔드포인트 확인

---

# 5분 실습 플로우
1. 서버 실행: `npm run dev` → 브라우저에서 `/api/auth/me`로 비로그인 확인
2. 회원가입/로그인 → 다시 `/api/auth/me`로 세션 확인
3. 일반 유저로 캘린더에서 요청 생성/삭제 → 연차 구간 묶기 동작 확인
4. 관리자 로그인 → 관리자 페이지에서 대기 사용자 승인
5. DevTools 모바일 뷰로 네비 전환(상단 바)과 본문 여백 확인

# 문제 해결 힌트
- `SQLITE_BUSY` 잦을 때: 단순 재시도/백오프, 트랜잭션 범위 축소, 쓰기 경쟁 줄이기
- 인증 오류(401): 입력 trim, 세션 쿠키(`credentials: 'include'`) 확인, 서버 로그 점검

# 부록: 파일 맵
- 서버: `server/server.js`
- 인증 유틸(프론트): `src/js/auth.js`
- 네비: `src/components/navbar/*`
- 캘린더: `src/components/calendar/*`
- 관리자 승인: `src/js/admin/approvals.js`
- 전역 테마: `src/css/theme.css`
- 문서: `server/README.md`, `src/README.md`
