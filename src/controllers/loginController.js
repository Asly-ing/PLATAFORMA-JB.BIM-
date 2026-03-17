import { connection } from "../models/db.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await connection.query(
      "SELECT * FROM login WHERE email = ? AND password = ?",
      [email, password]
    );

    // 🔥 VALIDACIÓN
    if (rows.length > 0) {
      // ✅ usuario existe
      console.log("Usuario encontrado:", rows[0]);

      res.json({
        success: true,
        user: rows[0]
      });

    } else {
      // ❌ no existe
      console.log("Usuario NO existe");

      res.json({
        success: false,
        message: "Credenciales incorrectas"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};