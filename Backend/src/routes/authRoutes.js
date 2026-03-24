import express from 'express';
const router = express.Router();

import passport from '../config/passport.js';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { logout } from '../controllers/authController.js';



// ==================== RUTAS ====================

// Rutas normales
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.get('/logout', authController.logout);
router.get('/me', protect, authController.getMe);
router.post('/logout', logout);

// Rutas de Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login?error=google_failed',
    session: false 
  }),
  authController.googleCallback
);

export default router;