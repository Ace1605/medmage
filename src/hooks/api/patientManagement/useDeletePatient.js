import { useTMutation } from "../useMutation";

export const useDeletePatient = (token) => {
  const { mutate } = useTMutation({
    url: "patients",
    method: "delete",
    token: token,
  });

  const handleDeletePatient = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeletePatient,
    isLoading: mutate.isPending,
  };
};
