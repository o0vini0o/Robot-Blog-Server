import chalk from "chalk";
import express from "express";
import cors from "cors";
import robotRouter from "./routers/robot.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());
app.use("/robots", robotRouter);

// Error Handle
app.use((err, req, res, next) => {
  res.status(err.cause || 500).json({ msg: err.message });
});
app.listen(port, () =>
  console.log(chalk.bgGreen(`Server is running on http://localhost:${port}`))
);
