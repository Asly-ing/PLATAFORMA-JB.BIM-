import express from "express";
import cors from "cors";
import router from "./api/endPoints.js";

const app = express();

app.use(cors()); // 🔥 permite conexión con React
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});