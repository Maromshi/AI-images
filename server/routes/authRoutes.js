import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../mongoDB/models/user.js";

const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // test if user already existing.
    const exisitngUser = await User.findOne({ email });
    if (exisitngUser) {
      res.status(400).json({ message: "User already exisiting" });
    } else {
      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {}
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      const isMatch = await bcrypt.compare(password, userExisting.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
    if (!userExisting) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ id: userExisting._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
export default router;
