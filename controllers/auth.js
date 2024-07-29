import express from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export class AuthController {
  /**
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  static async signup(req, res) {
    try {   
      const user = await User.findOne({ email: req.body.email }).lean().exec();

      if (user) 
        return res.status(409).send({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const accessToken = jwt.sign(
        { ...req.body, password: hashedPassword, }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      )

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        userType: req.body.userType,
        accessToken: accessToken,
      });
      
      res.cookie("id_token", accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        secure: false,
        httpOnly: false,
      });

      res.status(201).send({
        message: "User created successfully",
        body: newUser,
      })
    } catch (error) {
      res.status(500).send({
        message: (error.message || error)
      })
    }
  }
    
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).lean().exec();

      // If user not found
      if (!user) 
        return res.status(404).send({ message: "User not found" });

      // check if the password is correct
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
          { ...user, password: user.password }, 
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "7d" }
        )

        res.cookie("id_token", accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
          maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
          secure: false,
          httpOnly: false,
        });

        return res.status(200).send({
          message: "Login successful",
          body: { ...user, password: undefined, accessToken },
        })
      }

      // If password is incorrect
      return res.status(401).send({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).send({
        message: (error.message || error)
      })
    }
  }
}
