import pool from '../../database/connection.js';
import path from 'path';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

// Utilidad para generar slugs
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// ==================== OBTENER TODOS LOS CURSOS ====================
export const getAllCourses = async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT 
        c.id,
        c.title,
        c.slug,
        c.subtitle,
        c.description,
        c.level,
        c.price,
        c.discount_price,
        c.status,
        c.image_url,
        c.duration_minutes,
        c.created_at,
        u.name as instructor,
        cat.name as category,
        (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as students,
        (SELECT COALESCE(AVG(rating), 0) FROM course_reviews WHERE course_id = c.id) as rating,
        COALESCE((SELECT COUNT(*) FROM enrollments WHERE course_id = c.id), 0) * c.price as revenue
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.created_at DESC
    `);

    res.json({
      success: true,
      courses: courses.map(course => ({
        id: course.id.toString(),
        title: course.title,
        slug: course.slug,
        subtitle: course.subtitle || '',
        description: course.description || '',
        instructor: course.instructor || 'Sin instructor',
        category: course.category || 'Sin categoría',
        level: course.level,
        price: parseFloat(course.price) || 0,
        discountPrice: parseFloat(course.discount_price) || 0,
        status: course.status,
        thumbnail: course.image_url || '',
        duration: course.duration_minutes,
        students: parseInt(course.students) || 0,
        rating: parseFloat(course.rating) || 0,
        revenue: parseFloat(course.revenue) || 0,
        createdAt: course.created_at
      }))
    });
  } catch (error) {
    console.error('Error obteniendo cursos:', error);
    res.status(500).json({ message: 'Error al obtener los cursos' });
  }
};

// ==================== OBTENER UN CURSO INDIVIDUAL ====================
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [courseRows] = await pool.query(`
      SELECT 
        c.*,
        u.name as instructor_name,
        cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = ?
    `, [id]);

    if (courseRows.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const course = courseRows[0];

    const [sections] = await pool.query(
      'SELECT * FROM course_sections WHERE course_id = ? ORDER BY position ASC',
      [id]
    );

    const sectionsWithLessons = [];
    for (const section of sections) {
      const [lessons] = await pool.query(
        'SELECT * FROM lecciones WHERE section_id = ? ORDER BY position ASC',
        [section.id]
      );
      sectionsWithLessons.push({
        id: section.id.toString(),
        title: section.title,
        position: section.position,
        lessons: lessons.map(l => ({
          id: l.id.toString(),
          title: l.title,
          videoUrl: l.video_url,
          duration: l.duration_minutes,
          position: l.position
        }))
      });
    }

    res.json({
      success: true,
      course: {
        id: course.id.toString(),
        title: course.title,
        slug: course.slug,
        shortDescription: course.short_description,
        description: course.description,
        instructor: course.instructor_name,
        category: course.category_name,
        categoryId: course.category_id,
        level: course.level,
        price: parseFloat(course.price),
        discountPrice: parseFloat(course.discount_price),
        status: course.status,
        thumbnail: course.image_url,
        modules: sectionsWithLessons
      }
    });
  } catch (error) {
    console.error('Error obteniendo curso:', error);
    res.status(500).json({ message: 'Error al obtener el curso' });
  }
};

// ==================== VISTA PREVIA DEL CURSO ====================
export const getCoursePreview = async (req, res) => {
  try {
    const { id } = req.params;

    const [courseRows] = await pool.query(`
      SELECT 
        c.*,
        u.name as instructor_name,
        cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = ?
    `, [id]);

    if (courseRows.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const course = courseRows[0];

    const [sections] = await pool.query(
      'SELECT * FROM course_sections WHERE course_id = ? ORDER BY position ASC',
      [id]
    );

    const sectionsWithLessons = [];
    for (const section of sections) {
      const [lessons] = await pool.query(
        'SELECT * FROM lecciones WHERE section_id = ? ORDER BY position ASC',
        [section.id]
      );
      sectionsWithLessons.push({
        id: section.id.toString(),
        title: section.title,
        position: section.position,
        lessons: lessons.map(l => ({
          id: l.id.toString(),
          title: l.title,
          videoUrl: l.video_url,
          duration: l.duration_minutes,
          position: l.position
        }))
      });
    }

    const [studentsResult] = await pool.query('SELECT COUNT(*) as count FROM enrollments WHERE course_id = ?', [id]);
    const [ratingResult] = await pool.query('SELECT COALESCE(AVG(rating), 0) as avg_rating FROM course_reviews WHERE course_id = ?', [id]);

    res.json({
      success: true,
      course: {
        id: course.id.toString(),
        title: course.title,
        slug: course.slug,
        shortDescription: course.short_description || course.description?.substring(0, 150) || '',
        description: course.description,
        instructor: course.instructor_name,
        category: course.category_name,
        level: course.level,
        price: parseFloat(course.price),
        discountPrice: parseFloat(course.discount_price),
        status: course.status,
        image: course.image_url,
        students: studentsResult[0].count,
        rating: parseFloat(ratingResult[0].avg_rating),
        lessons: sectionsWithLessons.reduce((acc, curr) => acc + curr.lessons.length, 0),
        duration: `${course.duration_minutes} min`,
        requirements: course.requirements ? course.requirements.split('\n') : [],
        objectives: course.learning_objectives ? course.learning_objectives.split('\n') : [],
        modules: sectionsWithLessons
      }
    });
  } catch (error) {
    console.error('Error obteniendo vista previa del curso:', error);
    res.status(500).json({ message: 'Error al obtener la vista previa' });
  }
};

// ==================== CREAR CURSO ====================
export const createCourse = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { title, shortDescription, description, category_id, level, price, discountPrice, status, modules } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const instructorId = req.user ? req.user.id : 1;

    // 1. Generar Slug
    let slug = generateSlug(title);
    let isUnique = false;
    let counter = 1;
    while (!isUnique) {
      const [existingSlug] = await connection.query('SELECT id FROM courses WHERE slug = ?', [slug]);
      if (existingSlug.length > 0) {
        slug = `${generateSlug(title)}-${counter}`;
        counter++;
      } else {
        isUnique = true;
      }
    }

    // 2. Manejo de Categorías
    let finalCategoryId = null;
    if (category_id) {
      const [existingCat] = await connection.query('SELECT id FROM categories WHERE name = ?', [category_id]);
      if (existingCat.length > 0) {
        finalCategoryId = existingCat[0].id;
      } else {
        const [newCat] = await connection.query('INSERT INTO categories (name) VALUES (?)', [category_id]);
        finalCategoryId = newCat.insertId;
      }
    }

    // 3. Subir Imagen a Cloudinary
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      // Usamos upload_stream para buffers (multer memory storage)
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'courses' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    // 4. Insertar Curso Principal
    const [courseResult] = await connection.query(
      `INSERT INTO courses 
       (title, slug, short_description, description, instructor_id, category_id, level, price, discount_price, status, image_url, image_public_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        shortDescription || null,
        description || null,
        instructorId,
        finalCategoryId,
        level || 'beginner',
        parseFloat(price) || 0,
        parseFloat(discountPrice) || 0,
        status || 'draft',
        imageUrl,
        imagePublicId
      ]
    );

    const courseId = courseResult.insertId;

    // 5. Insertar Módulos y Lecciones
    if (modules) {
      const parsedModules = typeof modules === 'string' ? JSON.parse(modules) : modules;

      for (let i = 0; i < parsedModules.length; i++) {
        const module = parsedModules[i];
        if (!module.title) continue;

        const [sectionResult] = await connection.query(
          `INSERT INTO course_sections (course_id, title, position) VALUES (?, ?, ?)`,
          [courseId, module.title, i + 1]
        );

        const sectionId = sectionResult.insertId;

        if (module.lessons && module.lessons.length > 0) {
          for (let j = 0; j < module.lessons.length; j++) {
            const lesson = module.lessons[j];
            if (!lesson.title) continue;

            let durationMinutes = 0;
            if (lesson.duration) {
              const parts = lesson.duration.split(':');
              if (parts.length >= 2) {
                durationMinutes = parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
              } else {
                durationMinutes = parseInt(lesson.duration) || 0;
              }
            }

            await connection.query(
              `INSERT INTO lecciones 
               (section_id, title, video_url, duration_minutes, position) 
               VALUES (?, ?, ?, ?, ?)`,
              [
                sectionId,
                lesson.title,
                lesson.videoUrl || '',
                durationMinutes,
                j + 1
              ]
            );
          }
        }
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      courseId: courseId,
      slug: slug
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error creando curso:', error);
    res.status(500).json({ message: 'Error al crear el curso', error: error.message });
  } finally {
    connection.release();
  }
};

// ==================== ACTUALIZAR CURSO ====================
export const updateCourse = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;
    await connection.beginTransaction();

    const { title, shortDescription, description, category_id, level, price, discountPrice, status, modules } = req.body;

    const [existingCourse] = await connection.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existingCourse.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    let finalCategoryId = null;
    if (category_id) {
      const [existingCat] = await connection.query('SELECT id FROM categories WHERE name = ?', [category_id]);
      if (existingCat.length > 0) {
        finalCategoryId = existingCat[0].id;
      } else {
        const [newCat] = await connection.query('INSERT INTO categories (name) VALUES (?)', [category_id]);
        finalCategoryId = newCat.insertId;
      }
    }

    let imageUrl = existingCourse[0].image_url;
    let imagePublicId = existingCourse[0].image_public_id;

    if (req.file) {
      // Eliminar imagen anterior en Cloudinary
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'courses' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    await connection.query(
      `UPDATE courses SET 
        title = ?, short_description = ?, description = ?, category_id = ?, level = ?, price = ?, discount_price = ?, status = ?, image_url = ?, image_public_id = ?
       WHERE id = ?`,
      [
        title || existingCourse[0].title,
        shortDescription !== undefined ? shortDescription : existingCourse[0].short_description,
        description !== undefined ? description : existingCourse[0].description,
        finalCategoryId !== null ? finalCategoryId : existingCourse[0].category_id,
        level || existingCourse[0].level,
        price !== undefined ? parseFloat(price) : existingCourse[0].price,
        discountPrice !== undefined ? parseFloat(discountPrice) : existingCourse[0].discount_price,
        status || existingCourse[0].status,
        imageUrl,
        imagePublicId,
        id
      ]
    );

    // Simplificación de actualización de módulos: eliminar existentes y recrear
    if (modules) {
      await connection.query('DELETE FROM course_sections WHERE course_id = ?', [id]);

      const parsedModules = typeof modules === 'string' ? JSON.parse(modules) : modules;

      for (let i = 0; i < parsedModules.length; i++) {
        const module = parsedModules[i];
        if (!module.title) continue;

        const [sectionResult] = await connection.query(
          `INSERT INTO course_sections (course_id, title, position) VALUES (?, ?, ?)`,
          [id, module.title, i + 1]
        );

        const sectionId = sectionResult.insertId;

        if (module.lessons && module.lessons.length > 0) {
          for (let j = 0; j < module.lessons.length; j++) {
            const lesson = module.lessons[j];
            if (!lesson.title) continue;

            let durationMinutes = 0;
            if (lesson.duration) {
              const parts = lesson.duration.split(':');
              if (parts.length >= 2) {
                durationMinutes = parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
              } else {
                durationMinutes = parseInt(lesson.duration) || 0;
              }
            }

            await connection.query(
              `INSERT INTO lecciones 
               (section_id, title, video_url, duration_minutes, position) 
               VALUES (?, ?, ?, ?, ?)`,
              [
                sectionId,
                lesson.title,
                lesson.videoUrl || '',
                durationMinutes,
                j + 1
              ]
            );
          }
        }
      }
    }

    await connection.commit();

    res.json({
      success: true,
      message: 'Curso actualizado exitosamente'
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error actualizando curso:', error);
    res.status(500).json({ message: 'Error al actualizar el curso', error: error.message });
  } finally {
    connection.release();
  }
};

// ==================== ELIMINAR CURSO ====================
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [course] = await pool.query('SELECT image_public_id, image_url, thumbnail FROM courses WHERE id = ?', [id]);

    if (course.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Borrar de Cloudinary
    if (course[0].image_public_id) {
      await cloudinary.uploader.destroy(course[0].image_public_id);
    } else if (course[0].thumbnail || course[0].image_url) {
      // Legacy thumbnail removal if needed
      const oldImage = course[0].thumbnail || course[0].image_url;
      if (oldImage.startsWith('/uploads')) {
        const imagePath = path.join(process.cwd(), 'public', oldImage);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    await pool.query('DELETE FROM courses WHERE id = ?', [id]);

    res.json({ success: true, message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando curso:', error);
    res.status(500).json({ message: 'Error al eliminar el curso' });
  }
};

// ==================== ACTUALIZAR ESTADO DEL CURSO ====================
export const updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    await pool.query('UPDATE courses SET status = ? WHERE id = ?', [status, id]);

    res.json({ success: true, message: `Curso actualizado a "${status}"` });
  } catch (error) {
    console.error('Error actualizando estado:', error);
    res.status(500).json({ message: 'Error al actualizar el estado' });
  }
};