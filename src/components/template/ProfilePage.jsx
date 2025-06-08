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

        <ProfileForm name={name} lastName={lastName} password={password} changeHandler={changeHandler} />

        
      {/* <form  className="form-profile">
        <input name="name" type="text" value={name} onChange={changeHandler} />
        <input name="lastName" type="text" value={lastName} onChange={changeHandler} />
        <input name="password" type="password" value={password} onChange={changeHandler} />
      </form> */}
    </section>
  );
};

export default ProfilePage;
