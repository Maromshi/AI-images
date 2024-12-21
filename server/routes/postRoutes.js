// Here we will save the img including name prompt inside DB,
// Can access to pictures in any time

import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create Post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body; // from the client
    if (!photo) {
      return res.status(400).json({ error: "Photo is required" });
    }
    const photoUrl = await cloudinary.uploader.upload(photo); // return url adress

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url, // url adress
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
export default router;
