import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { SignInHandler } from "@/helper/signInHandler";
import { useRouter } from "next/router";
import { InputForm } from "./SignUpPage";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const formFields = [
    {
      name: "email",
      type: "text",
      placeholder: "email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const router = useRouter();
  const sendHandler = async (e) => {
    e.preventDefault();
    const signInRes = await SignInHandler(form, setLoading);
    if (signInRes) {
      await new Promise((resolver) => setTimeout(resolver, 2000));
      router.push("/dashboard");
    }
  };
  return (
    <section className="flex justify-center">
      <section
        className="flex flex-col justify-center mt-8 px-8 py-5 rounded-lg items-center"
        style={{
          boxShadow: "0px 4px 12px rgba(0,0,0,3)",
        }}
      >
        <h2 className="my-3">SignIn</h2>

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
              don't have an account ?
            </Typography>
            <Link href={"/sign-up"}>signUp</Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default SignInPage;
