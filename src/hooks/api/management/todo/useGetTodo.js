import { useTQuery } from "hooks/api/useQuery";

export const useGetTodoById = (token, id) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "todos",
    id: id,
    token: token,
    queryKey: `todo, ${id}`,
    params: {},
    enabled: !!token && !!id,
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
