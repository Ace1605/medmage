import { useTMutation } from "../useMutation";

export const useCreatePatient = (token) => {
  const { mutate } = useTMutation({
    url: "patients",
    method: "post",
    token: token,
  });

  const handleCreatePatient = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreatePatient,
    isLoading: mutate.isPending,
  };
};
