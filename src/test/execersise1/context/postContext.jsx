import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export const PostContext = createContext([]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    console.log("useeffect mounts");
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        if (axios.isCancel(err))
          console.log("successfully aborted previous request");
      });

    return () => {
      cancelToken.cancel();
      console.log("useeffect UN-mounts");
    };
  }, []);


