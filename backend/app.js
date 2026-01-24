import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API ArtistasPrints OK' });
});

app.get('/test-db', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
