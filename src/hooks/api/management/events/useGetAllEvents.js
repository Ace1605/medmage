import { useTQuery } from "hooks/api/useQuery";

export const useGetAllEvents = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "events",
    token: token,
    queryKey: "events",
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
