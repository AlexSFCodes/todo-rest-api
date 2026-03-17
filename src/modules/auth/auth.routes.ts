import { Router } from "express";

const router = Router();

router.post("/auth/register", (req, res) => {
  res.send("Register");
});

router.post("/auth/login", (req, res) => {
  res.send("Login");
});

router.get("/tasks", (req, res) => {
  res.send("Get tasks");
});

router.get("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});
router.delete("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});

export default router;