import React, { useState } from "react";

import { SignUpHandler } from "@/helper/signUpHandler";
import { signUpValidation } from "@/helper/signUpValidation";
import { Button, Typography } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

export const InputForm = (props) => {
  const { name, value, type, placeholder, className, onChange } = props;

  return (
    <>
      <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

const SignUpPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const formFields = [
    {
      name: "email",
      placeholder: "email",
      type: "text",
    },
    {
      name: "password",
      placeholder: "password",
      type: "password",
    },
  ];

  const router = useRouter();

  const sendHandler = async (e) => {
    e.preventDefault();

    const isValid = signUpValidation(form);
    if (!isValid) return;

    const res = await SignUpHandler(form, setLoading);
    if (res) router.push("/sign-in");
  };

  return (
    <section className="flex justify-center ">
      <section
        className=" flex flex-col justify-center mt-8 px-8 py-5 rounded-lg items-center"
        style={{
          boxShadow: "0px 4px 12px rgba(0,0,0,3)",
        }}
      >
        <h2 className="my-3">SignUp</h2>

        <form onSubmit={sendHandler} className="flex flex-col gap-3 w-[300px]">
          {formFields.map((item) => {
            const { name, type, placeholder } = item;

            return (
              <React.Fragment key={name}>
                <InputForm
                  name={name}
                  className="rounded-lg"
                  value={form[name]}
                  type={type}
                  onChange={changeHandler}
                  placeholder={placeholder}
                />
              </React.Fragment>
            );
          })}
          <Button
            sx={{
              borderRadius: "0.5rem",
              fontSize: "0.8em",
            }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Send
          </Button>
          <div className="flex items-center gap-2">
            <Typography
              sx={{ fontSize: "1.2rem", color: "#1976d2" }}
              component={"p"}
            >
              already have an account ?
            </Typography>
            <Link href={"/sign-in"}>signIn</Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default SignUpPage;
