import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Robots = sequelize.define("robots", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  youtubeURL: {
    type: DataTypes.STRING,
  },
});
Robots.sync({ alter: true });
export default Robots;
