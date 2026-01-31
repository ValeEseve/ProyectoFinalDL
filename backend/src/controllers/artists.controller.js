import { pool } from "../db/connection.js";

export const getAllArtists = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, bio, avatar, slug FROM artists",
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getAllArtists" });
  }
};

export const getArtistBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const { rows } = await pool.query(
      `
      SELECT
        artists.id,
        artists.slug,
        artists.bio,
        artists.avatar,
        users.username
      FROM artists
      JOIN users ON artists.user_id = users.id
      WHERE artists.slug = $1
      `,
      [slug],
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

export const getPrintsBySlug = async (req, res) => {
  const slug = req.params;
  try {
    const { rows } = await pool.query(
      `
        SELECT
        prints.*,
        artists.slug,
        users.username AS artist_username
        FROM prints
        JOIN artists ON prints.artist_id = artists.id
        JOIN users ON artists.user_id = users.id
        WHERE artists.slug = $1
        `,
      [slug],
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Prints not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};
