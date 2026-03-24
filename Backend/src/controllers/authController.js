import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModel.js';
import * as emailService from '../services/emailService.js';
import crypto from 'crypto'
import { sendVerificationEmail, sendResetEmail } from '../services/emailService.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user.id);
  
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.email_verified
      }
    });
};

// ==================== REGISTRO ====================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Por favor proporciona todos los campos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const user = await userModel.createUser({ name, email, password });
    
    if (!user.google_id) {
      await emailService.sendVerificationEmail(email, user.verification_token, name);
    }

    await userModel.createSubscription(user.id, 'basic');

    res.status(201).json({
      success: true,
      message: 'Usuario creado. Por favor verifica tu email.',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor proporciona email y contraseña' });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (!user.password_hash) {
      return res.status(401).json({ message: 'Esta cuenta usa Google. Usa el botón de Google.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (!user.email_verified) {
      return res.status(401).json({ 
        message: 'Por favor verifica tu email antes de iniciar sesión' 
      });
    }

    await userModel.updateLastLogin(user.id);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ==================== VERIFICAR EMAIL ====================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await userModel.verifyEmail(token);
    
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    await emailService.sendWelcomeEmail(user.email, user.name);
    
    res.json({ success: true, message: 'Email verificado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ==================== LOGOUT ====================
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};
// ==================== OBTENER USUARIO ACTUAL ====================
export const getMe = async (req, res) => {
  try {
    const subscription = await userModel.getUserSubscription(req.user.id);
    res.json({
      success: true,
      user: req.user,
      subscription
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ==================== GOOGLE CALLBACK ====================
export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    const redirectPath = user.role === 'admin' ? '/home' : '/home';
    res.redirect(`${process.env.FRONTEND_URL}${redirectPath}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

// ======================OLVIDE CONTRASEÑA ===================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findByEmail(email)

    if (!user) {
      return res.status(200).json({ message: 'Si el correo existe, recibirás un enlace.' })
    }

    // Genera token seguro
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Guarda el token hasheado en la BD
    await userModel.saveResetToken(user.id, resetTokenHash, resetTokenExpiry)

    // Envía el email con el token sin hashear
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    await sendResetEmail(user.email, user.name, resetUrl)

    res.status(200).json({ message: 'Si el correo existe, recibirás un enlace.' })
  } catch (error) {
    console.error('forgotPassword error:', error)
    res.status(500).json({ message: 'Error al procesar la solicitud' })
  }
}

// Resetear contraseña con el token
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    // Hashea el token recibido para comparar con el de la BD
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex')

    const user = await userModel.findByResetToken(resetTokenHash)

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' })
    }

    // Actualiza la contraseña y limpia el token
    await userModel.updatePassword(user.id, password)
    await userModel.clearResetToken(user.id)

    res.status(200).json({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    console.error('resetPassword error:', error)
    res.status(500).json({ message: 'Error al resetear la contraseña' })
  }
}