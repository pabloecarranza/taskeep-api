import { Router } from "express";
import {
  getList,
  getLists,
  updateList,
  getListTask,
} from "../controllers/list.controller.js";
import { createList, deleteList } from "./../controllers/list.controller.js";
import { verifyToken } from "./../middlewares/authjwt.js";
verifyToken;
const router = Router();

router.get("/lists", getLists);
router.get("/list/:id", getList);
router.get("/list/:id/tasks", getListTask);
router.post("/list", /* verifyToken, */ createList);
router.put("/list/:id", /* verifyToken,  */ updateList);
router.delete("/list/:id", /* verifyToken, */ deleteList);

export default router;

//verificar el token mediante localstorage
