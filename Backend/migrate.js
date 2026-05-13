import pool from './database/connection.js';

async function runMigration() {
  try {
    console.log('Iniciando migración de la base de datos...');
    
    const columns = [
      { name: 'slug', query: 'ALTER TABLE courses ADD COLUMN slug VARCHAR(255) UNIQUE NULL;' },
      { name: 'short_description', query: 'ALTER TABLE courses ADD COLUMN short_description TEXT NULL;' },
      { name: 'discount_price', query: 'ALTER TABLE courses ADD COLUMN discount_price DECIMAL(10,2) DEFAULT 0;' },
      { name: 'image_url', query: 'ALTER TABLE courses ADD COLUMN image_url VARCHAR(500) NULL;' },
      { name: 'image_public_id', query: 'ALTER TABLE courses ADD COLUMN image_public_id VARCHAR(255) NULL;' }
    ];

    for (const col of columns) {
      try {
        await pool.query(col.query);
        console.log('Columna anadida: ' + col.name);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log('La columna ya existe: ' + col.name);
        } else {
          console.error('Error anadiendo columna ' + col.name + ': ', err.message);
        }
      }
    }

    console.log('Migración completada.');
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    process.exit(0);
  }
}

runMigration();
