import { useTQuery } from "../useQuery";

export const useGetProfile = () => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "profile",
    token: localStorage.getItem("medmage_token"),
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
