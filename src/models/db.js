import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // tu contraseña de MySQL
  database: "proyect_JB"
});

export default connection;