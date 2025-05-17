import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const SignInHandler = async (form, setLoading) => {
  const { email, password } = form;

  const duration = {
    duration: 2000,
  };
  if (!email || !password) return toast.error("please fill-out form", duration);

  setLoading(true);
  const res = await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  });

  const success = res?.status === 200;
  const errorMessage = "something went wrong";

  if (success) {
    toast.success("loggedIn", duration);
    return true;
  } else if (res.status === 401)
    toast.error("user or pass is incorrect", duration);
  else toast.error(errorMessage, duration);
  setLoading(false);
};
