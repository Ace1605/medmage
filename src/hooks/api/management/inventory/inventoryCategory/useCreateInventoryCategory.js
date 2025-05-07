import { useTMutation } from "hooks/api/useMutation";

export const useCreateCategory = (token) => {
  const { mutate } = useTMutation({
    url: "inventory-categories",
    method: "post",
    token: token,
  });

  const handleCreateCategory = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreateCategory,
    isLoading: mutate.isPending,
  };
};
