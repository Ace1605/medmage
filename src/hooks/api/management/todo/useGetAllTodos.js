import { useTQuery } from "hooks/api/useQuery";

export const useGetAllTodos = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "todos",
    token: token,
    queryKey: "todos",
    enabled: !!token,
    //params: { start_date, end_date, per_page },
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
