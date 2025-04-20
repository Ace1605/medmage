import { useTMutation } from "hooks/api/useMutation";

export const useDeleteUser = (token) => {
  const { mutate } = useTMutation({
    url: "users",
    method: "delete",
    token: token,
  });

  const handleDeleteUser = async (id, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleDeleteUser,
    isLoading: mutate.isPending,
  };
};
