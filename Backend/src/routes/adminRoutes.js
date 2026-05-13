import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as adminController from '../controllers/adminCourseController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// 1. Asegurar que la carpeta public/uploads exista
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configurar Multer para guardar en memoria (para subir a Cloudinary)
const storage = multer.memoryStorage();

// Límite opcional de tamaño (ej. 5MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Proteger todas las rutas admin
router.use(protect);
router.use(restrictTo('admin'));

// Rutas de cursos
router.get('/courses', adminController.getAllCourses);
router.get('/courses/preview/:id', adminController.getCoursePreview); // Debe ir antes de /:id para que no tome 'preview' como ID
router.get('/courses/:id', adminController.getCourseById);
// Usamos el middleware upload configurado
router.post('/courses', upload.single('thumbnail'), adminController.createCourse);
router.put('/courses/:id', upload.single('thumbnail'), adminController.updateCourse);
router.delete('/courses/:id', adminController.deleteCourse);
router.patch('/courses/:id/status', adminController.updateCourseStatus);

export default router;