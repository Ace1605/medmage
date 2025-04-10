import { useTMutation } from "../useMutation";

export const useConfirmAccount = () => {
  const { mutate } = useTMutation({ url: "confirm-account", method: "post" });
  const handleConfirmAccount = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload, id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return { handleConfirmAccount, isLoading: mutate.isPending };
};
