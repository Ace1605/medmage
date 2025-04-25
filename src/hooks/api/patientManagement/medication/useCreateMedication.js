import { useTMutation } from "hooks/api/useMutation";

export const useCreateMedication = (token) => {
  const { mutate } = useTMutation({
    url: "medications",
    method: "post",
    token: token,
  });
  const handleCreateMedication = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreateMedication,
    isLoading: mutate.isPending,
  };
};
