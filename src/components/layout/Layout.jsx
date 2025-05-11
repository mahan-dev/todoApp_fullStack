import Link from "next/link";
import React from "react";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={`${styles.header}`}>
        <p className="p-4">Todo App</p>
      </header>
      <section className="flex">
        <section className={`${styles.sidebar}`}>
          <aside className={`${styles.sidebar__container}`}>
            <p>Welcome</p>
            <ul>
              <li >
                <Link href={"/"}>Todos</Link>
              </li>
              <li >
                <Link href={""}>Add-Todo</Link>
              </li>
              <li >
                <Link href={""}>Profile</Link>
              </li>
            </ul>
          </aside>
        </section>
        <main className="mx-2"> hello {children}</main>
      </section>

      {/* <footer>footer</footer> */}
    </>
  );
};

export default Layout;
