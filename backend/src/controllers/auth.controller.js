import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../db/queries.js';
import { pool } from '../db/connection.js';


export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: 'Usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword, name);

    res.status(201).json({
      message: 'Usuario creado',
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
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name : user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
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


