import { useTMutation } from "../useMutation";

export const useCompleteAccount = () => {
  const { mutate } = useTMutation({ url: "complete-account", method: "post" });
  const handleCompleteAccount = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload, id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return { handleCompleteAccount, isLoading: mutate.isPending };
};
