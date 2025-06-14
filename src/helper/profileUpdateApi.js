import axios from "axios";
import toast from "react-hot-toast";

export const ProfileApi = async (form) => {
  try {
    const res = await axios.post("/api/profile", form);
    const data = res.data;
    console.log(data);
    if (data.status === "Success") {
      return true;
    }
  } catch (error) {
    const message = error.status === 422;
    if (message) {
      toast.error("password is incorrect", {
        duration: 2000,
      });
    }
    return false;
  }
};
