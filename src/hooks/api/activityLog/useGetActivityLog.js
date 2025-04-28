import { useTQuery } from "../useQuery";

export const useGetActivityLog = (token, page, size) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "activity-logs",
    token: token,
    queryKey: "activityLogs",
    enabled: !!token,
    params: { page, per_page: size },
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
