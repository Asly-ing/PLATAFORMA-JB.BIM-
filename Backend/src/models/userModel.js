import pool from '../../database/connection.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// ==================== FUNCIONES DE USUARIO ====================

export const findByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const findById = async (id) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, name, role, email_verified, created_at FROM users WHERE id = ?', 
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
};

export const findByGoogleId = async (googleId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE google_id = ?', [googleId]);
    return rows[0];
  } catch (error) {
    console.error('Error finding user by google id:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  const { email, password, name, role = 'user', googleId = null } = userData;
  
  let passwordHash = null;
  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  const verificationToken = googleId ? null : crypto.randomBytes(32).toString('hex');
  const verificationExpires = googleId ? null : new Date(Date.now() + 24 * 60 * 60 * 1000);

  try {
    const [result] = await pool.query(
      `INSERT INTO users 
       (email, password_hash, name, role, google_id, verification_token, verification_expires, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, passwordHash, name, role, googleId, verificationToken, verificationExpires, googleId ? 1 : 0]
    );

    // Buscamos el usuario completo incluyendo el token
    const [userRows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    const user = userRows[0];
    user.verification_token = verificationToken; // Nos aseguramos de devolver el token

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE verification_token = ? AND verification_expires > NOW()',
      [token]
    );
    
    if (rows.length === 0) return null;
    
    const user = rows[0];

    await pool.query(
      `UPDATE users 
       SET email_verified = 1, verification_token = NULL, verification_expires = NULL 
       WHERE id = ?`,
      [user.id]
    );

    const { password_hash, verification_token, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

export const updateLastLogin = async (userId) => {
  try {
    await pool.query('UPDATE users SET updated_at = NOW() WHERE id = ?', [userId]);
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

// ==================== SUSCRIPCIONES ====================

export const createSubscription = async (userId, type = 'basic') => {
  try {
    const [result] = await pool.query(
      `INSERT INTO subscriptions (user_id, type, status) VALUES (?, ?, 'pending')`,
      [userId, type]
    );
    return { id: result.insertId, user_id: userId, type, status: 'pending' };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const getUserSubscription = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM subscriptions 
       WHERE user_id = ? AND status = 'active' 
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
};
// AGREGA ESTA LINEA AL FINAL ABSOLUTO DE userModel.js
export default { findByEmail, findById, findByGoogleId, createUser, verifyEmail, updateLastLogin, createSubscription, getUserSubscription }