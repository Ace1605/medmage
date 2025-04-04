import { baseUrl } from "baseUrl/baseUrl";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useTMutation = ({ url, token, method = "post" }) => {
  const mutate = useMutation({
    mutationFn: ({ payload, id }) => {
      // Use the method prop to determine whether to make a POST or PATCH request
      const endpoint = id ? `${baseUrl}/${url}/${id}` : `${baseUrl}/${url}`;

      return axios({
        url: endpoint,
        method: method,
        data: payload,
        withCredentials: true,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }).then((res) => res);
    },
  });

  return {
    mutate,
  };
};
