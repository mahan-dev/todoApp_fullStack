import { signUpValidation } from "@/helper/signUpValidation";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const InputForm = (props) => {
  const { name, value, type, placeholder, className } = props;

  return (
    <>
      <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : ""}
        value={value}
      />
    </>
  );
};

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

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
  const duration = {
    duration: 2000,
  };

  const sendHandler = async (e) => {
    e.preventDefault();

    const isValid = signUpValidation(form);
    if (!isValid) return;

    try {
      const res = await axios.post("/api/auth/sign-up", form);
      const data = await res.data;
      const success = data.status === "Success";
      if (success) {
        toast.success(data.message, duration);
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.reload();
      } else {
        toast.error("something went wrong", duration);
      }
    } catch (error) {
      toast.error("something went wrong", duration);
    }
  };

  return (
    <section className="flex flex-col justify-center my-4 items-center">
      <h2 className="my-3">SignUp</h2>

      <form
        onSubmit={sendHandler}
        onChange={changeHandler}
        className="flex flex-col gap-3"
      >
        {formFields.map((item) => {
          const { name, type, placeholder } = item;

          return (
            <React.Fragment key={name}>
              <InputForm
                name={name}
                className="rounded-lg"
                value={form[name]}
                type={type}
                placeholder={placeholder}
              />
            </React.Fragment>
          );
        })}
        <Button
        
        sx={{
          borderRadius:'0.5rem',
          fontSize: "0.8em"
        }}
        type="submit"
        variant="contained"
        
        >
          Send
        </Button>
       
      </form>
    </section>
  );
};

export default SignUp;
