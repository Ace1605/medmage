import { useTQuery } from "hooks/api/useQuery";

export const useGetUserRoles = (token) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "users/roles",
    token: token,
    queryKey: "user_roles",
  });

  return {
    data,
    isFetching,
    refetch,
    error,
    isLoading,
  };
};
