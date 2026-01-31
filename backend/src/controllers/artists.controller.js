import { pool } from "../db/connection.js";
import { createUniqueSlug } from "../utils/slug.utils.js";

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


export const createArtist = async (req, res) => {
  try {
    const user = req.user; 

    if (user.is_artist) {
      return res.status(400).json({ message: "El usuario ya es artista" });
    }

    const slug = await createUniqueSlug(user.username);

    await pool.query("BEGIN");

    await pool.query(
      "UPDATE users SET is_artist = true WHERE id = $1",
      [user.id]
    );

    await pool.query(
      `
      INSERT INTO artists (user_id, slug, bio, img_url)
      VALUES ($1, $2, '', $3)
      `,
      [user.id, slug, user.img_url]
    );

    await pool.query("COMMIT");

    res.status(201).json({
      message: "Artist profile created!",
      slug,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Error creating artist profile" });
  }
};

