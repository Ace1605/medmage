import { useTQuery } from "hooks/api/useQuery";

export const useGetPatients = (token, page, size) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: `patients`,
    token: token,
    queryKey: "patients",
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
