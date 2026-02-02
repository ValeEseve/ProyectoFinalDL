import { pool } from "../db/connection.js";

export const getPrints = async (req, res) => {
  try {
    // FIX: Especificar explícitamente las columnas para evitar conflictos de nombres
    const { rows } = await pool.query(`
      SELECT 
        prints.id,
        prints.title,
        prints.description,
        prints.width,
        prints.height,
        prints.img_url,
        prints.price,
        prints.artist_id,
        prints.created_at,
        artists.slug as artist_slug,
        users.username as artist_username,
        users.name as artist_name
      FROM prints
      JOIN artists ON artists.id = prints.artist_id
      JOIN users ON artists.user_id = users.id
      ORDER BY prints.created_at DESC
    `);
    
    console.log("getPrints - Total prints:", rows.length);
    if (rows.length > 0) {
      console.log("Sample print IDs:", rows.slice(0, 3).map(r => r.id));
    }
    
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getPrints" });
  }
};

export const createPrint = async (req, res) => {
  const { title, descr, width, height, imgUrl, price } = req.body;
  const userId = req.user.id;

  const artistResult = await pool.query(
    "SELECT id FROM artists WHERE user_id = $1",
    [userId],
  );

  if (artistResult.rows.length === 0) {
    return res.status(403).json({ message: "User has not an artist account" });
  }

  const artistId = artistResult.rows[0].id;
  console.log("Artist ID en createPrint: ", artistId)

  try {
    const { rows } = await pool.query(
      `INSERT INTO prints (title, description, width, height, img_url, price, artist_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, descr, width, height, imgUrl, price, artistId],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear print" });
  }
};