

export const createOrder = async (req, res) => {
  const { } = req.body;
  const userId = req.user.id; 

  try {
    const { rows } = await pool.query(
      `INSERT INTO orders (title, description, width, height, img_url, price, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, descr, width, height, imgUrl, price, userId ]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};