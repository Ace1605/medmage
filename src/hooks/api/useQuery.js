import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "baseUrl/baseUrl";

export const useTQuery = ({
  url,
  queryKey,
  token,
  params = {},
  enabled,
  staleTime,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/${url}`, {
        params,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    enabled,
    staleTime: staleTime ?? 5 * 60 * 1000, // <- add this for cache retention
  });

  return { data, error, isLoading, isFetching, refetch };
};
