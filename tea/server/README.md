# 서버(backend) 안내

## 개요
- Express.js + SQLite3 기반의 백엔드 서버입니다.
- `express-session`으로 세션 기반 인증을 사용하며, 비밀번호는 `bcryptjs`로 해시 처리합니다.
- 역할 기반 권한(user/admin)을 적용하며, 관리자 전용 미들웨어로 민감한 엔드포인트를 보호합니다.

## 환경설정
- `.env` (예시는 `.env.example` 참고)
  - `SESSION_SECRET`: 세션 암호화 시크릿
  - `NODE_ENV`: `development`일 때 개발 전용 엔드포인트 활성화
- 기본 서버 주소: `http://localhost:8088`

## 주요 기능 및 히스토리
- [인증(Auth)]
  - 로그인/회원가입 시 `username`/`password` 앞뒤 공백을 제거하여(Trim) 오입력 방지
  - `POST /api/auth/login`: 로그인 성공 시 세션에 `{ id, username, role }` 저장
  - `GET /api/auth/me`: 세션 기준 현재 사용자 정보 반환
  - `POST /api/auth/logout`: 세션 종료(로그아웃)
- [관리자(Admin)]
  - 승인 흐름:
    - `GET /api/admin/users?status=pending`: 대기 사용자 목록 조회
    - `POST /api/admin/users/:id/approve`: 사용자 승인 처리
  - 개발 전용 관리자 리셋: `GET|POST /api/dev/reset-admin` (개발 환경에서 기본 관리자 계정 리시드/리셋)
  - 주문 관련 유지보수: `POST /api/admin/archive-now` 등(관리자 전용)
- [요청/캘린더(Requests/Calendar)]
  - `/api/requests` REST API 제공(캘린더 UI에서 사용)
    - `GET /api/requests`: 목록 조회
    - `POST /api/requests`: 생성 `{ date, type, user, reason }`
    - `DELETE /api/requests/:id`: 삭제

## 미들웨어
- `requireAdmin`: `req.session.user.role === 'admin'` 검증으로 관리자 전용 라우트 보호

## 실행 방법
- 의존성 설치: `npm i`
- 개발 실행: `npm run dev` (nodemon)
- 프로덕션 실행: `npm start`

## 참고 사항
- 프론트엔드의 인증 필요한 요청은 반드시 `credentials: 'include'`로 세션 쿠키를 포함해야 합니다.
- 드물게 DB가 잠길 때 `SQLITE_BUSY: database is locked` 로그가 발생할 수 있습니다. 자주 발생 시 재시도/백오프 전략을 고려해 주세요.
