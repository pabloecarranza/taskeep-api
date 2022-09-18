import { Router } from "express";
import { verifyToken } from "../middlewares/authjwt.js";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getTasksUser,
} from "./../controllers/users.controller.js";
const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", /* verifyToken, */ updateUser);
router.delete("/user/:id", /* verifyToken, */ deleteUser);
router.get("/user/:id/tasks", /* verifyToken,  */ getTasksUser);

export default router;
