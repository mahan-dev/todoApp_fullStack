import { useState } from "react";
import Tasks from "../module/Tasks";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  const dataFetcher = async () => {
    try {
      const res = await axios("/api/todos");
      setTodos(res.data.data.todos);
      return res.data.data.todos;
    } catch (error) {
      console.log(error);
      toast.error("failed to fetch todos", {
        duration: 2000,
      });
    }
  };

  const { data, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: dataFetcher,
  });

  return (
    <section className="home-page">
      {data && (
        <>
          <div className="bg-white rounded-lg ">
            <p className="bg-yellow-400 py-1 rounded-t-lg">Todo</p>

            <Tasks data={todos.todo} next="inprogress" dataFetcher={dataFetcher} />
          </div>
          <div>
            <p className="bg-red-600 py-1 rounded-t-lg">In Progress</p>

            <Tasks data={todos.inprogress} next="review" back="todo" dataFetcher={dataFetcher} />
          </div>
          <div className="bg-white rounded-lg ">
            <p className="bg-green-600 py-1 rounded-t-lg">Review</p>
            <Tasks data={todos.review} next="done" back="inprogress" dataFetcher={dataFetcher} />
          </div>
          <div className="bg-white rounded-lg ">
            <p className="bg-orange-600 py-1 rounded-t-lg">Done</p>

            <Tasks data={todos.done} back="review" dataFetcher={dataFetcher} />
          </div>
        </>
      )}
      {isFetching && <h2>is loading...</h2>}
      {error && <h2>something went wrong 🙁</h2>}
    </section>
  );
};

export default HomePage;
