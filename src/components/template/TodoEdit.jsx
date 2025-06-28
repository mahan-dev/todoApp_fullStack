import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TodoEdit = (props) => {
  const { data: todoData } = props;
  const { title } = todoData || {};
  const [value, setValue] = useState(title);

  const changeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const router = useRouter();
  const sendHandler = async (e) => {
    e.preventDefault();

    if (value === "" || value.length < 3) {
      toast.error("fill-out form carefully 😀", { duration: 2000 });
    }
    try {
      const res = await axios.patch(`/api/${todoData._id}`, { data: value });
      return res;
    } catch (error) {
      console.error("Error updating todo", error);
      return;
    } finally {
      toast.success("update");
      await new Promise((resolver) => setTimeout(resolver, 2000));
      router.push("/");
    }
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: ["todoEdit"],
    queryFn: () => sendHandler,
  });

  if (isFetching) {
    return (
      <section className="flex flex-col  justify-center h-[90vh]">
        <p className="text-center">Loading...</p>
      </section>
    );
  }

  return (
    <form onSubmit={sendHandler} className="flex flex-col gap-3 items-start">
      {isError && (
        <h2 className="text-center m-auto">something went wrong 🙁</h2>
      )}
      {data && (
        <>
          <input
            className="outline-none rounded-lg"
            type="text"
            value={value}
            onChange={changeHandler}
          />

          <Button variant="contained" sx={{ fontSize: "1rem" }} type="submit">
            submit
          </Button>
        </>
      )}
    </form>
  );
};

export default TodoEdit;
