import React, { useState } from "react";
import RadioButton from "../element/RadioButton";
import { LuListTodo } from "react-icons/lu";
import { Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddTodoPage = () => {
  const [todo, setTodo] = useState({
    title: "",
    status: "todo",
  });

  const sendHandler = async () => {
    try {
      const res = await axios.post("/api/todos", todo);
      const data = res.data;
      const success = data.status === "Success";
      if (success) {
        setTodo({ title: "", status: "todo" });
        toast.success(data.message);
      }
    } catch (error) {
      const errorMessage = error.response.data.message || "Failed";
      toast.error(errorMessage, {duration: 2000});
    }
  };

  const changeHandler = (e) => {
    const { name } = e.target;

    setTodo({
      title: todo.title,
      status: name,
    });
  };


  const radioButtonLists = [
    {
      status: todo.status,
      value: "todo",
      title: "Todo",
    },
    {
      status: todo.status,
      value: "inprogress",
      title: "In Progress",
    },
    {
      status: todo.status,
      value: "review",
      title: "Review",
    },
    {
      status: todo.status,
      value: "done",
      title: "Done",
    },
  ];

  return (
    <section className="add-form m-2 mt-4">
      <section className="add-form__input">
        <div className="input--first">
          <label htmlFor="title">Title: </label>
          <input
            className="rounded-lg"
            style={{
              boxShadow: "0 0px 10px rgba(187,187,187)",
            }}
            type="text"
            name="title"
            value={todo.title}
            id="title"
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>

        <div className="input--second flex flex-col items-start gap-3 mt-6">
          {radioButtonLists.map(({ title, value, status }) => {
            return (
              <RadioButton
                key={title}
                status={status}
                value={value}
                title={title}
                onChange={changeHandler}
                className="rounded-lg"
              >
                <LuListTodo />
              </RadioButton>
            );
          })}
          <Button
            onClick={sendHandler}
            sx={{
              bgcolor: "#5676ff",
              mt: "1.5em",
            }}
            variant="contained"
          >
            Send
          </Button>
        </div>
      </section>
    </section>
  );
};

export default AddTodoPage;
