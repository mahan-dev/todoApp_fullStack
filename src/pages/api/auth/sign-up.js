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

    return res.status(200).json({
      status: "Success",
      message: "DB connected successfully",
    });
  } catch (err) {
    console.error("DB Error:", err);

    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

export default handler;