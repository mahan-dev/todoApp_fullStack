import Link from "next/link";
import React from "react";
import styles from "./layout.module.css";

// icons
import { FaListUl } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";

const Layout = ({ children }) => {
  return (
    <>
      <header className={`${styles.header}`}>
        <p className=" flex-grow">Todo App</p>

        <Link href={"/sign-up"}>signUp</Link>
      </header>
      <section className="flex">
        <section className={`${styles.sidebar}`}>
          <aside className={`${styles.sidebar__container}`}>
            <p>Welcome</p>
            <ul className={`${styles.container__list}`}>
              <li>
                <FaListUl />
                <Link href={"/todos"}>Todos</Link>
              </li>
              <li>
                <CgAddR />
                <Link href={"add-post"}>Add-Todo</Link>
              </li>
              <li>
                <IoPersonCircle />
                <Link href={"/profile"}>Profile</Link>
              </li>
            </ul>
          </aside>
        </section>
        <main className="w-full mx-2"> {children}</main>
      </section>

      <footer>footer</footer>
    </>
  );
};

export default Layout;
