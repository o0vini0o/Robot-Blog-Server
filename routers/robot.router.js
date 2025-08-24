import { Router } from "express";
import {
  createRobot,
  getAllRobots,
  getRobotById,
  updateRobot,
  deleteRobot,
} from "../controllers/robot.controller.js";
import validatePostBody from "../middlewares/validatePostBody.js";
const robotRouter = Router();
robotRouter.post("/", validatePostBody, createRobot);

robotRouter.get("/", getAllRobots);

robotRouter.get("/:id", getRobotById);
robotRouter.put("/:id", validatePostBody, updateRobot);
robotRouter.delete("/:id", deleteRobot);
export default robotRouter;
