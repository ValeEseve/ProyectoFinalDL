import { pool } from "../db/connection.js";
import { createUniqueSlug } from "../utils/slug.utils.js";

export const getAllArtists = async (req, res) => {
  try {
    const { rows } = await pool.query(`
  SELECT
    artists.id,
    artists.slug,
    artists.bio,
    artists.profile_img_url,
    users.username,
    users.name
  FROM artists
  JOIN users ON artists.user_id = users.id
`);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getAllArtists" });
  }
};

export const getArtistBySlug = async (req, res) => {
  try {
    const {slug} = req.params;

    const { rows } = await pool.query(
      `
      SELECT
        artists.id,
        artists.slug,
        artists.bio,
        artists.profile_img_url,
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
}

export const getPrintsBySlug = async (req, res) => {
  const {slug} = req.params;
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

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

export const createArtist = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user.id;
    
    const { rows: userRows } = await client.query(
      "SELECT username, is_artist, name, profile_img_url FROM users WHERE id = $1",
      [userId]
    );
    
    if (!userRows[0]) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { username, is_artist, name, profile_img_url } = userRows[0];
    
    if (is_artist) {
      return res.status(400).json({ message: "User already has an artist account" });
    }

    const slug = await createUniqueSlug(username)
    
    await client.query("BEGIN");
    
    await client.query("UPDATE users SET is_artist = true WHERE id = $1", [userId]);
    
    await client.query(
      `INSERT INTO artists (user_id, slug, bio, profile_img_url, name)
       VALUES ($1, $2, 'Write an amazing bio, do not be shy.', $3, $4)`,
      [userId, slug, profile_img_url, name]
    );
    
    await client.query("COMMIT");
    
    res.status(201).json({
      message: "Artist profile created!",
      slug,
      is_artist: true
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Create artist error:", error);
    res.status(500).json({ message: "Error creating artist account" });
  } finally {
    client.release();
  }
};
export const updateArtistProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { bio, img_url } = req.body;

    if (bio && bio.trim().length < 10) {
      return res.status(400).json({ 
        message: 'Bio must be at least 10 characters' 
      });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (bio !== undefined) {
      updates.push(`bio = $${paramCount}`);
      values.push(bio);
      paramCount++;
    }

    if (img_url !== undefined) {
      updates.push(`img_url = $${paramCount}`);
      values.push(img_url);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        message: 'No fields to update' 
      });
    }

    values.push(userId);

    const { rows } = await pool.query(
      `
      UPDATE artists
      SET ${updates.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING id, user_id, bio, img_url, slug
      `,
      values
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        message: 'Artist profile not found. You need to become an artist first.' 
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating artist profile:', error);
    res.status(500).json({ message: 'Error updating artist profile' });
  }
}
