import { sortedTodos } from "@/helper/sortedTodo";
import User from "@/models/User";
import { getSession } from "next-auth/react";

const { default: connectDb } = require("@/utils/ConnectDb");

const handler = async (req, res) => {
  const get = req.method === "GET";
  const post = req.method === "POST";
  try {
    await connectDb();
  } catch {
    return res.status(500).json({
      status: "Failed",
      message: "error to connect db",
    });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      status: "Failed",
      message: "user doesn't exist",
    });
  }

  const email = session.user.email || "";

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "you are not logged in",
    });
  }

  if (post) {
    const { title, status } = req.body;
    console.log(req.body);

    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "Failed", message: "Invalid data 😞" });
    }

    if (title.length <= 4) {
      return res
        .status(422)
        .json({ status: "Failed", message: "Title is less than 4 🤦‍♂️" });
    }
    user.todos.push({
      title,
      status,
    });
    await user.save();

    res.status(201).json({ status: "Success", message: "Todo created 👏" });
  } else if (get) {
    const sorted = sortedTodos(user.todos);

    res.status(200).json({ status: "Success", data: { todos: sorted } });
  }
};
export default handler;
