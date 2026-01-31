import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser, getUserByUsername } from '../db/queries.js';
import { pool } from '../db/connection.js';


export const register = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;

    if (!email || !password || !name || !username) {
      return res.status(400).json({ message: 'Data required' });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const usernameExists = await getUserByUsername(email);
    if (usernameExists) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword, name, username);

    res.status(201).json({
      message: 'User created',
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name : user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `SELECT id, email, role, name, profile_img_url
       FROM users
       WHERE id = $1`,
      [userId]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};


