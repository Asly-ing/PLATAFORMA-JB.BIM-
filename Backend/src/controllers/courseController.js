import pool from '../../database/connection.js';

// Obtener categorías
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.name as instructor_name, cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.status = 'published'
      ORDER BY c.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo cursos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener un curso por SLUG
export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [courses] = await pool.query(`
      SELECT c.*, u.name as instructor_name, cat.name as category_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.slug = ? AND c.status = 'published'
    `, [slug]);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const course = courses[0];

    const [sections] = await pool.query(`
      SELECT * FROM course_sections 
      WHERE course_id = ? 
      ORDER BY position ASC
    `, [course.id]);

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

// Obtener un curso por ID
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