const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const db = mysql.createConnection({
  host: '172.17.1.8',
  user: 'root', 
  password: '1234', 
  database: 'to-do_sva', 
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  db.query('INSERT INTO tasks (text, completed) VALUES (?, ?)', [text, false], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json({ id: results.insertId, text, completed: false });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({ id, completed });
  });
});


app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({ id });
  });
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});