import axios from "axios";
import toast from "react-hot-toast";

export const SignUpHandler = async (form, setLoading) => {
  const duration = {
    duration: 2000,
  };
  setLoading(true);
  try {
    const res = await axios.post("/api/auth/sign-up", form);
    const data = res.data;

    const success = data.status === "Success";
    if (success) {
      toast.success("an Account Created", duration);
      await new Promise((resolver) => setTimeout(resolver, 2000));
    }
    setLoading(false);
    return true;
  } catch (error) {
    const defaultMessage = "something went wrong";
    const message = error.response.data?.message;
    const displayMessage = message ? message : defaultMessage;

    if (error.status === 401) toast.error(displayMessage, duration);
    setLoading(false);
    return false;
  }
};
