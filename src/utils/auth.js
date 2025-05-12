import { compare, hash } from "bcrypt";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};



export { hashPassword, verifyPassword };
