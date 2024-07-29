import express from "express";
import { initializeConfigurations } from "./config/index.js";

initializeConfigurations();

const app = express();

/*
  Falsy Values in JS
  -> false
  -> 0
  -> ""
  -> null
  -> undefined
  -> NaN
*/

/*
REST APIs
  -> GET (Retrieve the data from the server)
  -> POST (Creates a new data in the server/db)
  -> DELETE (Delete the data in the server)
  -> PUT (Update the data in the server)
  -> PATCH (Update the data in the server)
*/
const PORT = process.env.PORT || 3000

import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"

app.use(express.json())

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
