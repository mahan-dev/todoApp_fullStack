import { getSession } from "next-auth/react";
import { PageValidation } from "@/helper/PageValidation";
import SignInPage from "@/components/template/SignInPage";

const SignIn = () => {
  return <SignInPage />;
};

export default SignIn;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) return PageValidation(session);

  return {
    props: {
      session,
    },
  };
};
