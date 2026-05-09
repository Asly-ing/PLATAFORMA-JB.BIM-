import express from 'express';
const router = express.Router();
import { protect, restrictTo } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import * as courseController from '../controllers/courseController.js';
import courseRoutes from './src/routes/courseRoutes.js';

app.use('/api/courses', courseRoutes);

// Rutas publicas
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Rutas protegidas solo para administradores
router.post('/', protect, restrictTo('admin'), upload.single('thumbnail'), courseController.createCourse);
router.delete('/:id', protect, restrictTo('admin'), courseController.deleteCourse);

export default router;