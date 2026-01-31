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

export const getUserByUsername = async (username) => {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const { rows } = await pool.query(query, [username]);
  return rows[0];
};

export const createUser = async (email, password, name, username) => {
  const query = `
    INSERT INTO users (email, password, name, username)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email
  `;
  const { rows } = await pool.query(query, [email, password, name, username]);
  return rows[0];
};


