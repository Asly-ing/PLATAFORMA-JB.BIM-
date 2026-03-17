import { connection } from "../models/db.js";

export const ping = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM login");

    // 👇 ESTO es lo que ves en la TERMINAL
    console.log("Datos de MySQL:");
    console.table(rows);

    // 👇 Esto es lo que ve el navegador (puedes dejarlo simple)
    res.send("Consulta ejecutada, revisa la terminal");
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};