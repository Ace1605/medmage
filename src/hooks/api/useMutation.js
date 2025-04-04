import { baseUrl } from "baseUrl/baseUrl";

export const useTMutation = ({ url, token, method = "post", isAuth }) => {
  const mutate = useTMutation({
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
