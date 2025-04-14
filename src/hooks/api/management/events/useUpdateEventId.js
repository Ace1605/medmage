import { useTMutation } from "hooks/api/useMutation";

export const useUpdateEventById = (token) => {
  const { mutate } = useTMutation({
    url: "events",
    method: "put",
    token: token,
  });

  const handleUpdateEventById = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id, payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleUpdateEventById,
    isLoading: mutate.isPending,
  };
};
