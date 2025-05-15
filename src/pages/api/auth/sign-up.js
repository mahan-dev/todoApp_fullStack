import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";

const handler = async (req, res) => {
  const Post = req.method === "POST";
  if (!Post)
    return res.status(405).json({
      status: "Failed",
      message: "method not allowed",
    });
  try {
    await connectDb();
  } catch {
    return res.status(500).json({
      status: "Failed",
      message: "error happened to connectDb",
    });
  }

  const { email, password } = req.body;

  const existUser = await User.findOne({ email: email });
  if (existUser) {
    res.status(401).json({
      status: "Failed",
      message: "User already exist's",
    });
    return;
  }
  const encryptedPassword = await hashPassword(password);
  const newUser = await User.create({
    email: email,
    password: encryptedPassword,
  });

  res.status(201).json({
    status: "Success",
    message: "Successfully created",
    data: newUser,
  });
};

export default handler;
