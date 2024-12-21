import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("connected to MongoDb..."))
    .catch((err) => {
      console.error("failed to connect with MongoDb...");
      console.error(err);
    });
};

export default connectDB;
