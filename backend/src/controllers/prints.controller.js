import { pool } from '../db/connection.js';

export const getPrints = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT prints.*, users.email AS artist
      FROM prints
      JOIN users ON users.id = prints.user_id
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener prints' });
  }
};

export const createPrint = async (req, res) => {
  const { title, description, image_url, price } = req.body;
  const userId = req.user.id; 

  try {
    const { rows } = await pool.query(
      `INSERT INTO prints (title, description, image_url, price, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, image_url, price, userId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear print' });
  }
};
