import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  userId: { type: String, required: true }, // will connect to User
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
