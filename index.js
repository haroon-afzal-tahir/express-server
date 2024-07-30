import express from "express";
import bodyParser from "body-parser";
import { initializeConfigurations } from "./config/index.js";

initializeConfigurations();

const app = express();

const PORT = process.env.PORT || 3000

import { ErrorMiddleware } from "./middlewares/error.js";

import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import templateRouter from "./routes/templates.js"

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/templates", templateRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(ErrorMiddleware.errorHandler);

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
