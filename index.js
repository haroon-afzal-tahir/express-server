import express from "express";
import { initializeConfigurations } from "./config/index.js";

initializeConfigurations();

const app = express();

const PORT = process.env.PORT || 3000

import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"

app.use(express.json())

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
