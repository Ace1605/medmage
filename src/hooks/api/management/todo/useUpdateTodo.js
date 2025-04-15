import { useTMutation } from "hooks/api/useMutation";

export const useUpdateTodo = (token) => {
  const { mutate } = useTMutation({
    url: "todos",
    method: "put",
    token: token,
  });

  const handleUpdateTodo = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id, payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleUpdateTodo,
    isLoading: mutate.isPending,
  };
};
