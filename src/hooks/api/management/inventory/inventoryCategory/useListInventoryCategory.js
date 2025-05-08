import { useTQuery } from "hooks/api/useQuery";

export const useListCategory = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "inventory-categories",
    token: token,
    queryKey: "inventory-categories",
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
