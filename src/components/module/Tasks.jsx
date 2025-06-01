import React from "react";

const Tasks = ({ data, next, back, dataFetcher }) => {
  const patchHandler = async (id) => {
    console.log(id);
  };

  return (
    <section className="tasks">
      {data.map((item) => (
        
          <div key={item._id} className="tasks__card">
            <span className={item.status}></span>
            <span>{item.title}</span>
            <div className="flex justify-between mx-3 mb-2">
              {back && (
                <button
                  className="bg-red-500 rounded-lg px-2 text-white"
                  onClick={() => patchHandler(back)}
                >
                  back
                </button>
              )}
              {next && (
                <button
                  className="bg-green-600 rounded-lg px-2 text-white"
                  onClick={() => patchHandler(next)}
                >
                  next
                </button>
              )}
            </div>
          </div>
        
      ))}
    </section>
  );
};

export default Tasks;
