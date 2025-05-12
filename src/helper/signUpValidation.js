import { toast } from "react-hot-toast";
import { validEmail } from "./validEmail";
const signUpValidation = (form) => {
  const duration = {
    duration: 2000,
  };
  const { email, password } = form;
  console.log(form);
  console.log(email);

  if (!email || !password) {
    toast.error("Invalid Data", duration);
    return false;
  }

  if (email) {
    const validate = validEmail(email);
    if (!validate) {
      toast.error("email is not correct", duration);
      return false;
    }
  }
  if (password.length < 4) {
    toast.error("weak password", duration);
    return false;
  }
  return true;
};

export { signUpValidation };
