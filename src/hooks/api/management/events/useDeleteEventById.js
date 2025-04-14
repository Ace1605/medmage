import { useTMutation } from "hooks/api/useMutation";

export const useDeleteEventById = (token) => {
  const { mutate } = useTMutation({
    url: "events",
    method: "delete",
    token: token,
  });

  const handleDeleteEventById = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeleteEventById,
    isLoading: mutate.isPending,
  };
};
