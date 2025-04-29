import { useTQuery } from "hooks/api/useQuery";

export const useGetInventory = (token, id) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "inventory",
    id: id,
    token: token,
    queryKey: `inventory, ${id}`,
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
