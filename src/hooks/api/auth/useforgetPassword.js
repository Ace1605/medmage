import { useTMutation } from "../useMutation";

export const useforgetPassword = () => {
  const { mutate } = useTMutation({ url: "forget-password", method: "post" });
  const handleForgetPassword = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return { handleForgetPassword, isLoading: mutate.isPending };
};
