import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Robots = sequelize.define("robots", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://png.pngtree.com/background/20230410/original/pngtree-robot-blue-light-technology-artificial-intelligence-future-robot-picture-image_2380622.jpg",
  },
});
Robots.sync();
export default Robots;
