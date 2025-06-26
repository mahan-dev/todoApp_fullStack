import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./layout.module.css";

// icons
import { FaListUl } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";
import { getSession } from "next-auth/react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const SidebarHandler = (isOpen, setIsOpen, buttonRef, sidebarRef) => {
  const closeHandler = () => {
    if (!isOpen) return;
    const clickOutsideHandler = (event) => {
      const target = event.target;
      if (
        buttonRef &&
        !buttonRef.current.contains(target) &&
        sidebarRef &&
        !sidebarRef.current.contains(target)
      ) {
        setIsOpen(false);
        document.body.style.overflowY = "visible";
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => document.removeEventListener("click", clickOutsideHandler);
  };
  useEffect(() => {
    closeHandler();
    return () => closeHandler();
  }, [isOpen]);
};
const clickHandler = ({ isOpen, setIsOpen }) => {
  if (!isOpen) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
  }
  setIsOpen(!isOpen);
};

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const sidebarRef = useRef();

  //! Handle sidebar open/close
  //? and close on click outside

  SidebarHandler(isOpen, setIsOpen, buttonRef, sidebarRef);
  const menuHandler = (e) => {
    const target = e.target;
    if (target.closest("li")) setIsOpen(false);
  };

  return (
    <>
      <header className={`${styles.header}`}>
        <div className="flex flex-col flex-grow">
          <p>
            <Link href="/">Todo App</Link>
          </p>
          <button
            className={`${styles.burger_button} ${isOpen ? "" : "static"}`}
            ref={buttonRef}
            onClick={() => clickHandler({ isOpen, setIsOpen })}
          >
            <IoMenu
              className={` ${
                !isOpen ? styles.activeMenu : styles.deActiveMenu
              }`}
            />
            <IoClose
              className={`${isOpen ? styles.activeMenu : styles.deActiveMenu}`}
            />
          </button>
        </div>

        <Link href={"/sign-up"}>signUp</Link>
      </header>
      <section className="flex">
        <section
          className={`${styles.sidebar} ${
            isOpen ? `${styles.openMenu}  ` : styles.closeMenu
          } `}
        >
          <aside className={`${styles.sidebar__container}  `} ref={sidebarRef}>
            <p>Welcome 👋</p>
            <ul className={`${styles.container__list}`} onClick={menuHandler}>
              <li>
                <FaListUl />
                <Link href={"/"}>Todos</Link>
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
