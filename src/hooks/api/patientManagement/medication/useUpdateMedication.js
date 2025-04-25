import { useTMutation } from "hooks/api/useMutation";

export const useUpdateMedication = (token) => {
  const { mutate } = useTMutation({
    url: "medications",
    method: "patch",
    token: token,
  });

  const handleUpdateMedication = async (
    id,
    payload,
    onSuccess,
    onError,
    setLoading
  ) => {
    try {
      const res = await mutate.mutateAsync({ id, payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleUpdateMedication,
    isLoading: mutate.isPending,
  };
};
