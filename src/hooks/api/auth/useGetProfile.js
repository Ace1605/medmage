import { useTQuery } from "../useQuery";

export const useGetProfile = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "profile",
    token: token,
    queryKey: "profile",
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
