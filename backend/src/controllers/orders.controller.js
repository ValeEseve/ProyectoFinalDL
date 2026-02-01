import { pool } from '../db/connection.js';

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `
      SELECT 
        o.id,
        o.user_id,
        o.shipping_address,
        o.total_price,
        o.status,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'print', json_build_object(
              'id', p.id,
              'title', p.title,
              'img_url', p.img_url,
              'price', p.price
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN prints p ON oi.print_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { rows } = await pool.query(
      `
      SELECT 
        o.id,
        o.user_id,
        o.shipping_address,
        o.total_price,
        o.status,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'print', json_build_object(
              'id', p.id,
              'title', p.title,
              'img_url', p.img_url,
              'price', p.price,
              'description', p.descr
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN prints p ON oi.print_id = p.id
      WHERE o.id = $1 AND o.user_id = $2
      GROUP BY o.id
      `,
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

export const createOrder = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const userId = req.user.id;
    const { shipping_address_id, items, total_price } = req.body;

    if (!shipping_address_id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        message: 'Missing required fields: shipping_address_id and items' 
      });
    }

    let calculatedTotal = 0;
    const printPrices = [];

    for (const item of items) {
      const { rows } = await client.query(
        'SELECT price FROM prints WHERE id = $1',
        [item.print_id]
      );

      if (rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ 
          message: `Print with id ${item.print_id} not found` 
        });
      }

      const printPrice = Number(rows[0].price);
      printPrices.push({ print_id: item.print_id, price: printPrice });
      calculatedTotal += printPrice * item.quantity;
    }

    await client.query('BEGIN');

    const { rows: orderRows } = await client.query(
      `
      INSERT INTO orders (user_id, shipping_address, total_price, status)
      VALUES ($1, $2, $3, 'pending')
      RETURNING id, user_id, shipping_address, total_price, status, created_at
      `,
      [userId, shipping_address_id, calculatedTotal]
    );

    const order = orderRows[0];

    const orderItemsPromises = items.map((item, index) => {
      const unitPrice = printPrices[index].price;
      
      return client.query(
        `
        INSERT INTO order_items (order_id, print_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4)
        RETURNING id, order_id, print_id, quantity, unit_price
        `,
        [order.id, item.print_id, item.quantity, unitPrice]
      );
    });

    const orderItemsResults = await Promise.all(orderItemsPromises);
    const orderItems = orderItemsResults.map(result => result.rows[0]);

    await client.query('COMMIT');

    const { rows: completeOrder } = await client.query(
      `
      SELECT 
        o.id,
        o.user_id,
        o.shipping_address,
        o.total_price,
        o.status,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'print', json_build_object(
              'id', p.id,
              'title', p.title,
              'img_url', p.img_url
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN prints p ON oi.print_id = p.id
      WHERE o.id = $1
      GROUP BY o.id
      `,
      [order.id]
    );

    res.status(201).json(completeOrder[0]);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  } finally {
    client.release();
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
      });
    }

    const { rows } = await pool.query(
      `
      UPDATE orders 
      SET status = $1 
      WHERE id = $2 
      RETURNING id, status, updated_at
      `,
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};