import { Router } from "express"
import { getTasks } from "./auth.controller"
import { verifyToken } from "../../middlewares/auth.middleware"

const router = Router()

router.get("/tasks", verifyToken, getTasks)


router.post("/auth/register", (req, res) => {
  res.send("Register");
});

router.post("/auth/login", (req, res) => {
  res.send("Login");
});


router.get("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});
router.delete("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});

export default router;