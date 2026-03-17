import express from "express";
import { ping } from "../controllers/pingController.js";
import { login } from "../controllers/loginController.js"; // ✅ IMPORTAR

const router = express.Router();

router.post("/login", login);
router.get("/ping", ping);

export default router;