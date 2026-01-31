import { pool } from "../db/connection.js";

export const generateProvisionalSlug = (username) => {
  const base = username
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

  const random = Math.floor(10000 + Math.random() * 90000);
  return `${base}-${random}`;
};

const slugExists = async (slug) => {
  const { rows } = await pool.query("SELECT 1 FROM artists WHERE slug = $1", [
    slug,
  ]);
  return rows.length > 0;
};

export const createUniqueSlug = async (username) => {
  let slug;
  let exists = true;

  while (exists) {
    slug = generateProvisionalSlug(username);
    exists = await slugExists(slug);
  }

  return slug;
};
