import express from 'express';
const router = express.Router();
import * as courseController from '../controllers/courseController.js';

// Rutas publicas
router.get('/categories', courseController.getCategories);
router.get('/', courseController.getAllCourses);
router.get('/slug/:slug', courseController.getCourseBySlug);
router.get('/:id', courseController.getCourseById);

export default router;