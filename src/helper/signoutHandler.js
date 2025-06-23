import { signOut } from "next-auth/react";

export const signOutHandler = async () => {
  try {
    const result = await signOut({
      redirect: false,
    });
    if (result?.url) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
