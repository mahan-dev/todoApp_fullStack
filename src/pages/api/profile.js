import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";
import { data } from "autoprefixer";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  try {
    await connectDb();
  } catch (error) {
    return res.status(500).json({ message: "Database connection failed" });
  }
  const post = req.method === "POST";

  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });

  const { email } = session.user;
  const user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(404)
      .json({ status: "Failed", message: "User not found" });

  if (post) {
    const { name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);

    if (!isValid)
      return res
        .status(422)
        .json({ status: "Failed", message: "Invalid password" });

    user.name = name;
    user.lastName = lastName;
    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Profile has been updated",
      data: {
        name,
        lastName,
        email: email,
      },
    });
  }
};

export default handler;
