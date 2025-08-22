import { Router } from "express";
import coverMiddleware from "../middlewares/coverMiddleware.js";
import {
  createRobot,
  getAllRobots,
  getRobotById,
  updateRobot,
  deleteRobot,
} from "../controllers/robot.controller.js";
const robotRouter = Router();
robotRouter.post("/", coverMiddleware, createRobot);

robotRouter.get("/", getAllRobots);

robotRouter.get("/:id", getRobotById);
robotRouter.put("/:id", coverMiddleware, updateRobot);
robotRouter.delete("/:id", deleteRobot);
export default robotRouter;
