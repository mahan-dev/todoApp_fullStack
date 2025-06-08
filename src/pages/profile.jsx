import ProfilePage from "@/components/template/ProfilePage";
import { PageNotValidate } from "@/helper/PageValidation";
import { getSession } from "next-auth/react";
import React from "react";

const profile = () => {
  return <ProfilePage />;
};

export default profile;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) return PageNotValidate(session);
  return {
    props: {
      session,
    },
  };
};
