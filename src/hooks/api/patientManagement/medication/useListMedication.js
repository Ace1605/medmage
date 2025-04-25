import { useTQuery } from "hooks/api/useQuery";

export const useListMedications = (token, page, size) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "medications",
    token: token,
    queryKey: "medications",
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
