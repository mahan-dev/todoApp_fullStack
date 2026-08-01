import axios from "axios";
import toast from "react-hot-toast";

export const SignUpHandler = async (form, setLoading) => {
  const duration = {
    duration: 2000,
  };
  setLoading(true);

  const data = await axios.post("api/auth/test", {hi: "there"})
  console.log(data)


  return
  try {
    const res = await axios.post("/api/auth/sign-up", form);
    const data = res.data;

    const success = data.status === "Success";
    if (success) {
      toast.success("an Account Created", duration);
      await new Promise((resolver) => setTimeout(resolver, 2000));
    }

    return true;
  } catch (error) {
    const defaultMessage = "something went wrong";
    const message = error.response.data?.message;
    const displayMessage = message ? message : defaultMessage;

    if (error.status === 401) toast.error(displayMessage, duration);

    return false;
  } finally {
    setLoading(false);
  }
};
