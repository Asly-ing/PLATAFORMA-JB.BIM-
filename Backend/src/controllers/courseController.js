import pool from '../config/database.js';

// Obtener todos los cursos (panel admin)
export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.name as instructor_name, cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo cursos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener un curso individual
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await pool.query(`
      SELECT c.*, u.name as instructor_name, cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = ?
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const course = courses[0];

    // Cargar secciones y lecciones
    const [sections] = await pool.query(`
      SELECT * FROM course_sections 
      WHERE course_id = ? 
      ORDER BY position ASC
    `, [id]);

    for (const section of sections) {
      const [lessons] = await pool.query(`
        SELECT * FROM lecciones 
        WHERE section_id = ? 
        ORDER BY position ASC
      `, [section.id]);
      section.lessons = lessons;
    }

    course.sections = sections;

    res.json(course);
  } catch (error) {
    console.error('Error obteniendo curso:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Crear nuevo curso
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id,
      level,
      price,
      status,
      modules
    } = req.body;

    // Si se subio una imagen
    let thumbnail = null;
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    // Crear curso principal
    const [result] = await pool.query(`
      INSERT INTO courses 
      (title, description, instructor_id, category_id, level, price, status, thumbnail)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      description,
      req.user.id,
      category_id,
      level,
      price,
      status,
      thumbnail
    ]);

    const courseId = result.insertId;

    // Crear secciones y lecciones
    const modulesParsed = JSON.parse(modules);
    for (const [position, module] of Object.entries(modulesParsed)) {
      const [sectionResult] = await pool.query(`
        INSERT INTO course_sections (course_id, title, description, position)
        VALUES (?, ?, ?, ?)
      `, [courseId, module.title, module.description, position]);

      const sectionId = sectionResult.insertId;

      for (const [lessonPosition, lesson] of Object.entries(module.lessons)) {
        await pool.query(`
          INSERT INTO lecciones (section_id, title, video_url, duration_minutes, position)
          VALUES (?, ?, ?, ?, ?)
        `, [sectionId, lesson.title, lesson.videoUrl, lesson.duration, lessonPosition]);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Curso creado correctamente',
      courseId: courseId
    });

  } catch (error) {
    console.error('Error creando curso:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Eliminar curso
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ success: true, message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando curso:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};