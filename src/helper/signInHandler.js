import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const SignInHandler = async (form, setLoading) => {
  const { email, password } = form;

  const duration = {
    duration: 2000,
  };
  if (!email || !password) return toast.error("please fill-out form", duration);

  setLoading(true);
  try {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    const success = res?.status === 200;
    const errorMessage = "something went wrong";
    const connectionErrorDb = res.error
      ? res?.error?.includes("ECONNRESET") || res?.error?.includes("timed out")
      : "";

    if (success) {
      toast.success("loggedIn", duration);
      return true;
    } else if (connectionErrorDb) {
      toast.error("can not connect to db", duration);
    } else toast.error(errorMessage, duration);
  } catch (error) {
    return false;
  } finally {
    setLoading(false);
  }
};
