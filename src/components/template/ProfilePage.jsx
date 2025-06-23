import React, { useState } from "react";
import ProfileForm from "../module/ProfileForm";
import axios from "axios";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signOutHandler as signOut } from "@/helper/signoutHandler";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      const res = await axios.get("/api/profile", {
        headers: {
          "cache-control": "no-cache",
        },
      });
      const { data } = res.data;
      setUserDetails(data);
      return data;
    } catch (error) {
      const message = error.status === 500;
      if (message) toast.error("error to connect db🙁", { duration: 2000 });
    }
  };
  const { refetch, isFetching } = useQuery({
    queryKey: ["myProfile"],
    queryFn: dataFetcher,
  });

  const editHandler = async () => {
    const { data } = await refetch();
    const { name, lastName } = data;
    if (name || lastName) {
      setIsEditing(true);
      setForm({
        name: name || "",
        lastName: lastName || "",
        password: password || "",
      });
    }
  };

  const router = useRouter();
  const signOutHandler = async () => {
    const res = await signOut();
    if (res) {
      toast.success("SignedOut!");
      await new Promise((resolver) => setTimeout(resolver, 2000));
      router.replace("/sign-in");
    } else {
      toast.error("something went wrong 🙁 ", { duration: 2000 });
    }
  };

  const { name: userName, lastName: userLastName } = userDetails || {};

  if (isFetching)
    return (
      <section className="flex justify-center">
        <h2>loading data</h2>
      </section>
    );

  if (isEditing)
    return (
      <ProfileForm
        form={form}
        name={name}
        lastName={lastName}
        password={password}
        changeHandler={changeHandler}
      />
    );

  return (
    <section>
      {userName || userLastName ? (
        <section className="flex justify-between items-center">
          <h2>
            hi, {userName} {userLastName}
          </h2>

          <div className="flex gap-4">
            <Button
              onClick={editHandler}
              variant="contained"
              sx={{ fontSize: "1rem" }}
            >
              Edit
            </Button>
            <Button
              onClick={signOutHandler}
              variant="contained"
              sx={{ fontSize: "1rem" }}
            >
              SignOut
            </Button>
          </div>
        </section>
      ) : (
        <ProfileForm form={form} changeHandler={changeHandler} />
      )}
    </section>
  );
};

export default ProfilePage;
