import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "baseUrl/baseUrl";

export const useTQuery = ({ url, queryKey, token, params, enabled = true }) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/${url}`, {
        params,
        withCredentials: true,
        headers: {
          "X-CHANNEL": "CUSTOMER_APP",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled,
  });

  return { data, error, isLoading, isFetching, refetch };
};
