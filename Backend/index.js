import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from './src/config/passport.js'; 
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js'; 

dotenv.config();

const app = express();

// Seguridad
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});