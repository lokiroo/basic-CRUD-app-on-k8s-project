const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'cruddb',
  password: 'postgrespass',
  port: 5432
});

app.use(cors());
app.use(express.json());

app.get('/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items');
  res.json(result.rows);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  await pool.query('INSERT INTO items(name) VALUES($1)', [name]);
  res.sendStatus(201);
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await pool.query('UPDATE items SET name=$1 WHERE id=$2', [name, id]);
  res.sendStatus(200);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id=$1', [id]);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
