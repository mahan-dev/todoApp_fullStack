import axios from "axios";

export const ProfileApi = async (form) => {
  try {
    const res = await axios.post("/api/profile", form);
    const data = res.data;
    if (data.status === "Success") {
      return true;
    }
  } catch (error) {
    return false;
  }
};
