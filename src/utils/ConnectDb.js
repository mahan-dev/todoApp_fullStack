import { mongoose } from "mongoose";

const connectDb = async () => {
  const BASE_URL = process.env.MONGO_URI;
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(BASE_URL);
  } catch (error) {
    console.log("can not connect to db", error);
  }
};
export default connectDb;
