import pool from '../../database/connection.js';
import ExcelJS from 'exceljs';

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        'active' as status,
        DATE_FORMAT(u.created_at, '%d %b %Y') as joined,
        DATE_FORMAT(u.updated_at, 'Hace %h horas') as lastActive,
        (SELECT COUNT(*) FROM enrollments e WHERE e.user_id = u.id) as enrolled
      FROM users u
      ORDER BY u.created_at DESC
    `);
    
    // Convert id to string and replace "Hace 0 horas" if needed
    const formattedUsers = users.map(user => ({
      ...user,
      id: String(user.id),
      lastActive: user.lastActive.replace('Hace 0 horas', 'Recientemente')
    }));

    res.json({ success: true, users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Enrollments are deleted automatically via CASCADE
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
};

export const getUserCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const [courses] = await pool.query(`
      SELECT c.id, c.title, e.enrolled_at
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.user_id = ?
    `, [id]);
    res.json({ success: true, courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

export const enrollUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'El ID del curso es requerido' });
    }

    // Check duplicate
    const [existing] = await pool.query('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?', [id, courseId]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'El usuario ya está inscrito en este curso' });
    }

    await pool.query('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [id, courseId]);
    res.json({ success: true, message: 'Usuario inscrito correctamente' });
  } catch (error) {
    console.error('Error enrolling user:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

export const unenrollUser = async (req, res) => {
  try {
    const { id, courseId } = req.params;
    await pool.query('DELETE FROM enrollments WHERE user_id = ? AND course_id = ?', [id, courseId]);
    res.json({ success: true, message: 'Usuario removido del curso' });
  } catch (error) {
    console.error('Error unenrolling user:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

export const downloadUsersReport = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role,
        'active' as status,
        DATE_FORMAT(u.created_at, '%Y-%m-%d %H:%i:%s') as join_date,
        (SELECT COUNT(*) FROM enrollments e WHERE e.user_id = u.id) as total_courses
      FROM users u
      ORDER BY u.created_at DESC
    `);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'JP.BIM Admin';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Usuarios');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre del Estudiante', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Rol', key: 'role', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
      { header: 'Cursos Inscritos', key: 'total_courses', width: 20 },
      { header: 'Fecha de Registro', key: 'join_date', width: 25 }
    ];

    // Estilo cabecera
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF000000' } // negro o usa un color de tailwind
    };

    users.forEach(user => {
      sheet.addRow(user);
    });

    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `Reporte_Usuarios_${dateStr}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ success: false, message: 'Error generando reporte excel' });
  }
};
