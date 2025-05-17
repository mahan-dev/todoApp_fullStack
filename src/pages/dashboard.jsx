import { PageNotValidate } from "@/helper/PageValidation";
import { getSession } from "next-auth/react";
import React from "react";

const dashboard = () => {
  return (
    <section className="flex justify-center text-center">
      <h1 className="my-3">Dash Page</h1>
    </section>
  );
};

export default dashboard;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) return PageNotValidate(session);
  return {
    props: {
      session,
    },
  };
};
