import chalk from "chalk";
import express from "express";
import { Sequelize, DataTypes, ValidationError } from "sequelize";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

const sequelize = new Sequelize(process.env.PG_URI, { logging: false });
const Robots = sequelize.define("robots", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  cover: { type: DataTypes.STRING, allowNull: false },
});
Robots.sync();

// CRUD APIs
app.post("/robots", async (req, res) => {
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
});

app.get("/robots", async (req, res) => {
  try {
    const robot = await Robots.findAll();
    res.json({ results: robot });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
});

app.get("/robots/:id", async (req, res) => {
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
});
app.put("/robots/:id", async (req, res) => {
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
    res.json({ msg: "Robot updated", results: robot });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
});
app.delete("/robots/:id", async (req, res) => {
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
});

app.listen(port, () =>
  console.log(chalk.bgGreen(`Server is running on http://localhost:${port}`))
);
