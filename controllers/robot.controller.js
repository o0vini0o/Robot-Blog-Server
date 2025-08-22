import Robots from "../models/Robots.js";

const createRobot = async (req, res) => {
  const { title, content, cover } = req.body;
  try {
    const robot = await Robots.create({ title, content, cover });
    res.status(201).json({ data: robot });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      res.status(400).json({ msg: error.errors[0].message });
      return;
    }
    res.status(500).json({ msg: "Server error!" });
  }
};
const getAllRobots = async (req, res) => {
  try {
    const robot = await Robots.findAll();
    res.json({ results: robot });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
};
const getRobotById = async (req, res) => {
  const { id } = req.params;
  try {
    const robot = await Robots.findByPk(id);
    if (!robot) {
      res.status(404).json({ msg: "Robot not found!" });
      return;
    }
    res.json({ results: robot });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
};
const updateRobot = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover } = req.body;
  try {
    const [rowCount, robot] = await Robots.update(
      { title, content, cover },
      { where: { id }, returning: true }
    );
    if (!rowCount) {
      res.status(404).json({ msg: "Robot not found!" });
      return;
    }
    res.json(robot[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
};
const deleteRobot = async (req, res) => {
  const { id } = req.params;
  try {
    const rowCount = await Robots.destroy({ where: { id } });
    if (!rowCount) {
      res.status(404).json({ msg: "Robot not found!" });
      return;
    }
    res.status(204).json({ msg: "Robot deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
};
export { createRobot, getAllRobots, getRobotById, updateRobot, deleteRobot };
