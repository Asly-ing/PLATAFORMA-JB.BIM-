import pool from '../../database/connection.js'; 
import path from 'path';
import fs from 'fs';

// ==================== OBTENER TODOS LOS CURSOS ====================
export const getAllCourses = async (req, res) => {
  try {
    // Consulta perfectamente alineada a tu BD real con cálculo de revenue seguro
    const [courses] = await pool.query(`
      SELECT 
        c.id,
        c.title,
        c.subtitle,
        c.description,
        c.level,
        c.price,
        c.status,
        c.thumbnail,
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
        subtitle: course.subtitle || '',
        description: course.description || '',
        instructor: course.instructor || 'Sin instructor',
        category: course.category || 'Sin categoría',
        level: course.level,
        price: parseFloat(course.price) || 0,
        status: course.status,
        thumbnail: course.thumbnail || '',
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

    // Obtener secciones (módulos)
    const [sections] = await pool.query(
      'SELECT * FROM course_sections WHERE course_id = ? ORDER BY position ASC',
      [id]
    );

    // Obtener lecciones de cada sección
    const sectionsWithLessons = [];
    for (const section of sections) {
      const [lessons] = await pool.query(
        'SELECT * FROM lecciones WHERE section_id = ? ORDER BY position ASC',
        [section.id]
      );
      sectionsWithLessons.push({
        id: section.id.toString(),
        title: section.title,
        // Eliminamos section.description porque no existe en tu tabla
        position: section.position,
        lessons: lessons.map(l => ({
          id: l.id.toString(),
          title: l.title,
          videoUrl: l.video_url,
          duration: l.duration_minutes ? `${l.duration_minutes}:00` : '',
          position: l.position
        }))
      });
    }

    res.json({
      success: true,
      course: {
        id: course.id.toString(),
        title: course.title,
        description: course.description,
        instructor: course.instructor_name,
        category: course.category_name,
        level: course.level,
        price: parseFloat(course.price),
        status: course.status,
        thumbnail: course.thumbnail,
        modules: sectionsWithLessons 
      }
    });
  } catch (error) {
    console.error('Error obteniendo curso:', error);
    res.status(500).json({ message: 'Error al obtener el curso' });
  }
};

// ==================== CREAR CURSO ====================
export const createCourse = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { title, description, category_id, level, price, status, modules } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    // Usamos el ID del admin logueado (si falla el middleware, usa el ID 1 que es el admin que insertaste)
    const instructorId = req.user ? req.user.id : 1; 

    // 1. Manejo de Categorías
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

    // 2. Manejo de Imagen (Multer la guarda directo, solo guardamos la ruta)
    let thumbnailPath = null;
    if (req.file) {
      thumbnailPath = `/uploads/${req.file.filename}`;
    }

    // 3. Insertar Curso Principal
    const [courseResult] = await connection.query(
      `INSERT INTO courses 
       (title, description, instructor_id, category_id, level, price, status, thumbnail) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, 
        description || null, 
        instructorId, 
        finalCategoryId, 
        level || 'beginner', 
        parseFloat(price) || 0, 
        status || 'draft', 
        thumbnailPath
      ]
    );

    const courseId = courseResult.insertId;
    console.log(`✅ Curso creado con ID: ${courseId}`);

    // 4. Insertar Módulos y Lecciones
    if (modules) {
      const parsedModules = typeof modules === 'string' ? JSON.parse(modules) : modules;

      for (let i = 0; i < parsedModules.length; i++) {
        const module = parsedModules[i];
        if (!module.title) continue;

        // 🔥 CORRECCIÓN DEL ERROR: Insertamos solo course_id, title y position. Ignoramos description.
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
      courseId: courseId
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error creando curso:', error);
    res.status(500).json({ message: 'Error al crear el curso', error: error.message });
  } finally {
    connection.release();
  }
};

// ==================== ELIMINAR CURSO ====================
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [course] = await pool.query('SELECT thumbnail FROM courses WHERE id = ?', [id]);
    
    if (course.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    if (course[0].thumbnail) {
      const imagePath = path.join(process.cwd(), 'public', course[0].thumbnail);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Gracias a tu ON DELETE CASCADE, esto borra curso, secciones y lecciones automáticamente
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