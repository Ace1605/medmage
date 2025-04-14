import { useTMutation } from "hooks/api/useMutation";

export const useCreateEvent = (token) => {
  const { mutate } = useTMutation({
    url: "events",
    method: "post",
    token: token,
  });

  const handleCreateEvent = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreateEvent,
    isLoading: mutate.isPending,
  };
};
