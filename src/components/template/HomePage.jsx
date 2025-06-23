import Tasks from "../module/Tasks";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const dataFetcher = async () => {
    try {
      const res = await axios("/api/todos");
      return res.data?.data?.todos || {};
    } catch (error) {
      const Unauthorized = error?.response.status === 401;
      if (Unauthorized) {
        toast.error("Please login to continue", { duration: 2000 });
      } else {
        toast.error("failed to fetch todos", {
          duration: 2000,
        });
      }

      return {};
    }
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: dataFetcher,
  });

  if (isFetching)
    return (
      <section className="flex justify-center">
        <h2 className="flex items-center min-h-[0vh] "> loading...</h2>
      </section>
    );

  return (
    <section className="home-page">
      {data && (
        <>
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
