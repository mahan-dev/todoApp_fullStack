import axios from "axios";
import toast from "react-hot-toast";
export const editHandler = async (router, value, todoData) => {
  if (value === "" || value.length < 3) {
    toast.error("fill-out form carefully 😀", { duration: 2000 });
  }
  try {
    const res = await axios.patch(`/api/${todoData._id}`, { data: value });
    return res;
  } catch (error) {
    console.error("Error updating todo", error);
    return;
  } finally {
    toast.success("update");
    await new Promise((resolver) => setTimeout(resolver, 2000));
    router.push("/");
  }
};
