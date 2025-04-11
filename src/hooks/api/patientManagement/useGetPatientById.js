import { useTQuery } from "hooks/api/useQuery";

export const useGetPatientById = (token, id) => {
  const { data, isLoading, refetch, error, isFetching } = useTQuery({
    url: "patients",
    id: id,
    token: token,
    queryKey: `patient, ${id}`,
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
