import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: { strategy: "jwt", maxAge: 1 * 60 * 60 * 24 },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDb();
        } catch {
          return {
            message: "can not connectDb",
            status: 500,
          };
        }

        if (!email || !password) throw new Error("Invalid Data");
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("user doesn't exist");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("password is valid");

        return {
          email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
