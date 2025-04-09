import { useTMutation } from "../useMutation";

export const useResetPassword = () => {
  const { mutate } = useTMutation({ url: "change-password", method: "post" });
  const handleResetPassword = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload, id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return { handleResetPassword, isLoading: mutate.isPending };
};
