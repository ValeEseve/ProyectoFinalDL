import { pool } from './connection.js';

export const getUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const createUser = async (email, password, name) => {
  const query = `
    INSERT INTO users (email, password, name)
    VALUES ($1, $2, $3)
    RETURNING id, email
  `;
  const { rows } = await pool.query(query, [email, password, name]);
  return rows[0];
};


