import { useTMutation } from "hooks/api/useMutation";

export const useCreateInventory = (token) => {
  const { mutate } = useTMutation({
    url: "inventory",
    method: "post",
    token: token,
  });

  const handleCreateInventory = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreateInventory,
    isLoading: mutate.isPending,
  };
};
