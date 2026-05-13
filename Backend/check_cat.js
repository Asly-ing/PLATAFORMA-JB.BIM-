import pool from './database/connection.js';

async function checkCategories() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    console.log('Categorías en BD:', rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkCategories();
