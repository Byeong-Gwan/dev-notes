const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todosRoutes');

const app = express();
const PORT = 8088;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todosRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
