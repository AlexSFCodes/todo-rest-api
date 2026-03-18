import { Router } from "express"
import { register, login } from "./auth.controller"           // auth
import { getTasks, createTask, deleteTask } from "../tasks/tasks.controller"  // tareas
import { verifyToken } from "../../middlewares/auth.middleware"

const router = Router()

// ── PUBLIC ROUTES ──────────────────
router.post("/auth/register", register)
router.post("/auth/login",    login)

// ── PROTECTED ROUTES ────────────────
router.get("/tasks",       verifyToken, getTasks)
router.post("/tasks",      verifyToken, createTask)
router.delete("/tasks/:id",verifyToken, deleteTask)

export default router