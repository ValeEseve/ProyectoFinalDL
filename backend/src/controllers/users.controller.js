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

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profile_img_url } = req.body;

    if (!profile_img_url) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const { rows } = await pool.query(
      `
      UPDATE users
      SET profile_img_url = $1
      WHERE id = $2
      RETURNING id, profile_img_url
      `,
      [profile_img_url, userId]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile image" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { username, profile_img_url, name, is_artist } = req.body;

    const { rows } = await pool.query(
      `
      UPDATE users
      SET
        username = COALESCE($1, username),
        profile_img_url = COALESCE($2, profile_img_url),
        name = COALESCE($3, name),
        is_artist = COALESCE($4, is_artist)
      WHERE id = $5
      RETURNING id, email, name, username, profile_img_url, is_artist
      `,
      [username, profile_img_url, name, is_artist, userId]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

