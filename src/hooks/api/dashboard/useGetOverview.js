import { useTQuery } from "../useQuery";

export const useGetOverview = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "dashboad/cards",
    token: token,
    queryKey: "dashboardCards",
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
