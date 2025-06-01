import { sortedTodos } from "@/helper/sortedTodo";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import connectDb from "@/utils/ConnectDb";

const handler = async (req, res) => {
  const get = req.method === "GET";
  const post = req.method === "POST";
  const patch = req.method === "PATCH";

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
  } else if (patch) {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(422).json({
        status: "Failed",
        message: "Data is Invalid",
      });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    console.log(result)
    return res.status(200).json({status:"Success", message: "Changed 😃"})
  }
};
export default handler;
