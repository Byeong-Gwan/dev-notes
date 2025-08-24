## Tea Project (Portfolio Ready)

### Overview
- Simple Todo + Menu/Request management app.
- Stack: Node.js (Express), SQLite3, Vanilla JS.

### Run
1. Install deps
```
npm i
```
2. Start server (serves API + static UI on one port)
```
npm run dev
```
3. Open
```
http://localhost:8088
```

### API
- Todos: `/api/todos` CRUD
- Menus: `/api/menus` CRUD (options stored as JSON)
- Requests: `/api/requests` CRUD

### Notes
- Static files are served from `src/`. Entry pages: `src/pages/index.html`, `menu.html`, `calendar.html`.
- For production, set environment variables and restrict CORS.

