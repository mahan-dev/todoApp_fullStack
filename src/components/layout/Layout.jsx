import Link from "next/link";
import React from "react";
import styles from "./layout.module.css";

// icons
import { FaListUl } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";
import { getSession } from "next-auth/react";

const Layout = ({ children }) => {
  return (
    <>
      <header className={`${styles.header}`}>
        <p className=" flex-grow">
          <Link href="/">Todo App</Link>
        </p>

        <Link href={"/sign-up"}>signUp</Link>
      </header>
      <section className="flex">
        <section className={`${styles.sidebar}`}>
          <aside className={`${styles.sidebar__container}`}>
            <p>Welcome 👋</p>
            <ul className={`${styles.container__list}`}>
              <li>
                <FaListUl />
                <Link href={"/todos"}>Todos</Link>
              </li>
              <li>
                <CgAddR />
                <Link href={"add-todo"}>Add-Todo</Link>
              </li>
              <li>
                <IoPersonCircle />
                <Link href={"/profile"}>Profile</Link>
              </li>
            </ul>
          </aside>
        </section>
        <main className="w-full p-4"> {children}</main>
      </section>

      <footer>footer</footer>
    </>
  );
};

export default Layout;
export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
