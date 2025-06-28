import axios from "axios";
import Link from "next/link";
import { HiPencil } from "react-icons/hi2";

const Tasks = ({ data, next, back, dataFetcher }) => {
  const changeStatus = async (id, status) => {
    const res = await axios.patch("/api/todos", { id, status });
    const data = res.data;
    if (data.status === "Success") {
      dataFetcher();
    }
  };

  return (
    <section className="tasks">
      {data?.map((item) => (
        <div key={item._id} className="tasks__card">
          <span className={item.status}></span>
          <div className="flex items-center px-3">
            <p className="my-4">{item.title}</p>
            <Link href={`/${item._id}`} className="ml-auto cursor-pointer">
              <HiPencil />
            </Link>
          </div>
          <div className="flex  mx-3 mb-2">
            {back && (
              <button
                className="bg-red-500 rounded-md px-3 text-white"
                onClick={() => changeStatus(item._id, back)}
              >
                back
              </button>
            )}
            {next && (
              <>
                <button
                  className="bg-green-600 rounded-md flex ml-auto px-3 text-white"
                  onClick={() => changeStatus(item._id, next)}
                >
                  next
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Tasks;
