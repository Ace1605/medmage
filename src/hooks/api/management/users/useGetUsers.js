import { useTQuery } from "hooks/api/useQuery";

export const useGetUsers = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "users",
    token: token,
    queryKey: "users",
    params: {},
    enabled: !!token,
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
