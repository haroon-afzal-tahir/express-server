import express from "express";
import path from "path";
const router = express.Router();

router.get("/login", async (req, res) => {
  res.render(
    path.join(path.resolve(), "views", "login")
  );
})
router.get("/signup", async (req, res) => {
  res.render(
    path.join(path.resolve(), "views", "login")
  );
})

export default router;
