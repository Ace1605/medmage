import { useTQuery } from "hooks/api/useQuery";

export const useListMedications = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "medications",
    token: token,
    queryKey: "medications",
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
