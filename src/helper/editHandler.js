import axios from "axios";
import toast from "react-hot-toast";
export const editHandler = async (value, todoData) => {
  if (value === "" || value.length < 3) {
    toast.error("fill-out form carefully 😀", { duration: 2000 });
    return;
  }
  try {
    const res = await axios.patch(`/api/${todoData._id}`, { data: value });
    return res;
  } catch (error) {
    console.error("Error updating todo", error);
    return;
  }
};
