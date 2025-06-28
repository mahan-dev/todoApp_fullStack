import TodoEdit from "@/components/template/TodoEdit";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TodoId = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const {
    isReady,
    query: { todoId },
  } = router;
  console.log(router.query);
  const dataFetcher = async () => {
    try {
      const res = await axios.get(`/api/${todoId}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      const { data: receivedData } = res.data;
      console.log(receivedData);
      setData(receivedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetcher();
  }, [isReady]);
  if (data) return <TodoEdit data={data} />;
};

export default TodoId;

// export const getServerSideProps = async (context) => {
//   const { todoId: id } = context.query;

//   try {
//     await connectDb();
//   } catch (error) {
//     console.log(error, "error in connection");
//   }
//   const todoId = await User.findOne({ _id: id });
//   console.log(todoId, "back");
//   console.log(todoId);
//   if (todoId) {
//     return {
//       props: {
//         data: JSON.parse(JSON.stringify(todoId)),
//       },
//     };
//   }

//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(todoId)),
//     },
//   };
// };
