import Robots from "../models/Robots.js";

const createRobot = async (req, res) => {
  const { title, content, cover } = req.body;
  const robot = await Robots.create({ title, content, cover });
  res.status(201).json(robot);
};
const getAllRobots = async (req, res) => {
  const robot = await Robots.findAll();
  res.json({ results: robot });
};
const getRobotById = async (req, res) => {
  const { id } = req.params;
  const robot = await Robots.findByPk(id);
  if (!robot) throw new Error("Robot not found!", { cause: 404 });
  res.json({ results: robot });
};
const updateRobot = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover } = req.body;

  const [rowCount, robot] = await Robots.update(
    { title, content, cover },
    { where: { id }, returning: true }
  );
  if (!rowCount) throw new Error("Robot not found!", { cause: 404 });
  res.json(robot[0]);
};
const deleteRobot = async (req, res) => {
  const { id } = req.params;
  const rowCount = await Robots.destroy({ where: { id } });
  if (!rowCount) throw new Error("Robot not found!", { cause: 404 });
  res.status(204).json({ msg: "Robot deleted!" });
};
export { createRobot, getAllRobots, getRobotById, updateRobot, deleteRobot };
