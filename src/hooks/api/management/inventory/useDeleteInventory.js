import { useTMutation } from "hooks/api/useMutation";

export const useDeleteInventory = (token) => {
  const { mutate } = useTMutation({
    url: "inventory",
    method: "delete",
    token: token,
  });

  const handleDeleteInventory = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeleteInventory,
    isLoading: mutate.isPending,
  };
};
