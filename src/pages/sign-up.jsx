import SignUpPage from "@/components/template/SignUpPage";
import { PageValidation } from "@/helper/PageValidation";

import { getSession } from "next-auth/react";

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;

export const getServerSideProps = async ({ req }) => {
  console.log("req is here", req);
  const session = await getSession({ req });
  if (session) return PageValidation(session);

  return {
    props: { session },
  };
};
