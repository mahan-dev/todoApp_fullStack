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

  const dataFetcher = async () => {
    if (!isReady) return;
    try {
      const res = await axios.get(`/api/${todoId}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      const { data: receivedData } = res.data;
      setData(receivedData);
    } catch (error) {
    }
  };

  useEffect(() => {
    dataFetcher();
  }, [isReady]);
  if (data) return <TodoEdit data={data} />;
};

export default TodoId;