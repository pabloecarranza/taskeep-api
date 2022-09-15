import { Router } from "express";
import { verifyToken } from "../middlewares/authjwt.js";
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  hotUpdateTask,
} from "./../controllers/tasks.controller.js";
const router = Router();

router.get("/tasks", getTasks);
router.get("/task/:id", getTask);
router.post("/task/:id", /* verifyToken, */ createTask);
router.put("/task/:id", /* verifyToken, */ updateTask);
router.delete("/task/:id", /* verifyToken, */ deleteTask);

export default router;
