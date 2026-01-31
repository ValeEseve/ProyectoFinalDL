import { pool } from '../db/connection.js';

export const getPrints = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM prints
      JOIN artists ON artists.id = prints.artist_id
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in getPrints' });
  }
};

export const createPrint = async (req, res) => {
  const { title, descr, width, height, imgUrl, price } = req.body;
  const artistId = req.user.id; 

  try {
    const { rows } = await pool.query(
      `INSERT INTO prints (title, description, width, height, img_url, price, artist_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, descr, width, height, imgUrl, price, artistId ]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear print' });
  }
};