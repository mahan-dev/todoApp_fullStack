import React, { useEffect, useState } from "react";
import ProfileForm from "../module/ProfileForm";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const { name, lastName, password } = form;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <section>
      <ProfileForm
        name={name}
        lastName={lastName}
        password={password}
        form={form}
        changeHandler={changeHandler}
      />
    </section>
  );
};

export default ProfilePage;
