import AddTodoPage from "@/components/template/AddTodoPage";
import { getSession } from "next-auth/react";

const AddTodo = () => {
  return <AddTodoPage />;
};

export default AddTodo;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/sign-up",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session
    },
  };
};
