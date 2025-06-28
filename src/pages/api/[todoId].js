import User from "@/models/User";
import connectDb from "@/utils/ConnectDb";

const handler = async (req, res) => {
  const get = req.method === "GET";
  const patch = req.method === "PATCH";

  try {
    await connectDb();
  } catch (error) {
    return res.status(500).json({ message: "Database connection failed" });
  }

  if (get) {
    const { todoId } = req.query;
    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const user = await User.findOne({ "todos._id": todoId }, { "todos.$": 1 });
    if (!user) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo found", data: user.todos[0] });
  } else if (patch) {
    const { todoId } = req.query;
    const { data } = req.body;

  
    const result = await User.updateOne(
      { "todos._id": todoId },
      {
        $set: { "todos.$.title": data },
      }
    );
    if (!result)
      return res
        .status(404)
        .json({ status: "Failed", message: "todo not found" });
    console.log(result);

    return res.status(200).json({ message: "Todo updated", todoId });
  }
};

export default handler;
