import { pool } from '../db/connection.js';

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, role, name, profile_img_url FROM users'
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
