import Tasks from "../module/Tasks";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const HomePage = () => {
  const dataFetcher = async () => {
    const res = await axios("/api/todos");
    return res.data.data.todos;
  };

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: dataFetcher,
  });

  useEffect(() => {
    toastError();
  }, [error]);

  function toastError() {
    if (error) {
      const unauthorized = error.response?.status === 401;
      if (unauthorized) {
        toast.error("please Login to continue", { duration: 2000 });
      } else {
        toast.error("Something went wrong 🙁", { duration: 2000 });
      }
    }
  }

  if (isFetching) {
    return (
      <section className="flex justify-center">
        <h2 className="flex items-center min-h-[0vh] "> loading...</h2>
      </section>
    );
  }

  if (isError) {
    return <h2 className="text-center">Something went wrong 🙁</h2>;
  }

  return (
    <section className="home-page">
      {data && (
        <>
          {console.log(data)}
          <div className="bg-white rounded-lg ">
            <p className="bg-yellow-400 py-1 rounded-t-lg">Todo</p>

            <Tasks data={data.todo} next="inprogress" dataFetcher={refetch} />
          </div>
          <div className="bg-white rounded-lg">
            <p className="bg-red-600 py-1 rounded-t-lg">In Progress</p>

            <Tasks
              data={data.inprogress}
              next="review"
              back="todo"
              dataFetcher={refetch}
            />
          </div>
          <div className="bg-white rounded-lg ">
            <p className="bg-green-600 py-1 rounded-t-lg">Review</p>
            <Tasks
              data={data.review}
              next="done"
              back="inprogress"
              dataFetcher={refetch}
            />
          </div>
          <div className="bg-white rounded-lg ">
            <p className="bg-orange-600 py-1 rounded-t-lg">Done</p>

            <Tasks data={data.done} back="review" dataFetcher={refetch} />
          </div>
        </>
      )}
      {isError && <h2>something went wrong 🙁</h2>}
    </section>
  );
};

export default HomePage;
