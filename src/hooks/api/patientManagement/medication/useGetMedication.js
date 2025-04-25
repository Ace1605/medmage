import { useTQuery } from "hooks/api/useQuery";

export const useGetMedication = (token, id) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "medications",
    id: id,
    token: token,
    queryKey: `medications, ${id}`,
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
