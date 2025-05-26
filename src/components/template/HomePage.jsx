import React from "react";

const HomePage = () => {
  return (
    <section className="home-page">
      <div>
        <p className="bg-yellow-400 rounded-lg">Todo</p>
      </div>
      <div>
        <p className="bg-red-600 rounded-lg">In Progress</p>
      </div>
      <div>
        <p className="bg-green-600 rounded-lg">Review</p>
      </div>
      <div>
        <p className="bg-orange-600 rounded-lg">Done</p>
      </div>
    </section>
  );
};

export default HomePage;
