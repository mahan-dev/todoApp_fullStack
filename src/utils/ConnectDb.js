import { connect, mongoose } from "mongoose";

const connectDb = async () => {
  const BASE_URL = process.env.MONGO_URI;
  mongoose.set('strictQuery', false);
  if (mongoose.connections[0].readyState) return;
  try {
    await connect(BASE_URL);
  } catch (error) {
    console.log("can not connect to db", error);
  }
};
export default connectDb;
