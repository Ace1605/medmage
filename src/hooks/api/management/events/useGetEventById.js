import { useTQuery } from "hooks/api/useQuery";

export const useGetEventById = (token, id) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "events",
    id: id,
    token: token,
    queryKey: `events, ${id}`,
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
