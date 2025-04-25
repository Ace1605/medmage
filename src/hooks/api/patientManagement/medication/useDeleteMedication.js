import { useTMutation } from "hooks/api/useMutation";

export const useDeleteMedication = (token) => {
  const { mutate } = useTMutation({
    url: "medications",
    method: "delete",
    token: token,
  });

  const handleDeleteMedication = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeleteMedication,
    isLoading: mutate.isPending,
  };
};
