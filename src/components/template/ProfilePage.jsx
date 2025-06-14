import React, { useEffect, useState } from "react";
import ProfileForm from "../module/ProfileForm";
import axios from "axios";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const [userDetails, setUserDetails] = useState([]);

  const { name, lastName, password } = form;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dataFetcher = async () => {
    try {
      const res = await axios("/api/profile");
      const { data } = res.data;
      setUserDetails(data);
      return data;
    } catch (error) {
      const message = error.status === 500;
      if (message) toast.error("error to connect db🙁", { duration: 2000 });
    }
  };

  useEffect(() => {
    dataFetcher();
  }, []);

  const { name: userName, lastName: userLastName } = userDetails || "";

  return (
    <section>
      {userName || userLastName ? (
        <section className="flex justify-between items-center">
          <h2>
            hi, {userName} {userLastName}
          </h2>
          <Button
            onClick={() => signOut()}
            variant="contained"
            sx={{ fontSize: "1rem" }}
          >
            signOut
          </Button>
        </section>
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          form={form}
          changeHandler={changeHandler}
        />
      )}
    </section>
  );
};

export default ProfilePage;

export const getServerSideProps = async () => {
  const res = await axios("/api/profile");
  const data = res.data;
  if (data) {
    console.log(data);
  }
  return {
    props: {},
  };
};
