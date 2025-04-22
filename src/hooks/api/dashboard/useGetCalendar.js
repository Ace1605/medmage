import { useTQuery } from "../useQuery";

export const useGetCalendar = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "dashboad/calendar",
    token: token,
    queryKey: "dashboardCalendar",
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
