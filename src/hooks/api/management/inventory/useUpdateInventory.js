import { useTMutation } from "hooks/api/useMutation";

export const useUpdateInventory = (token) => {
  const { mutate } = useTMutation({
    url: "inventory",
    method: "patch",
    token: token,
  });

  const handleUpdateInventory = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id, payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleUpdateInventory,
    isLoading: mutate.isPending,
  };
};
