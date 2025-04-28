import { useTQuery } from "hooks/api/useQuery";

export const useListInventory = (token, page, size) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "inventory",
    token: token,
    queryKey: "inventory",
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
