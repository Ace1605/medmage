import { useTMutation } from "hooks/api/useMutation";

export const useDeleteTodo = (token) => {
  const { mutate } = useTMutation({
    url: "todos",
    method: "delete",
    token: token,
  });

  const handleDeleteTodo = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeleteTodo,
    isLoading: mutate.isPending,
  };
};
