import { useTMutation } from "hooks/api/useMutation";

export const useCreateTodo = (token) => {
  const { mutate } = useTMutation({
    url: "todos",
    method: "post",
    token: token,
  });

  const handleCreateTodo = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleCreateTodo,
    isLoading: mutate.isPending,
  };
};
