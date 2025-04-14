import { useTQuery } from "hooks/api/useQuery";

export const useGetAllEvents = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "events",
    token: token,
    queryKey: "events",
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
