import { useTMutation } from "hooks/api/useMutation";

export const useUpdateUserRoles = (token) => {
  const { mutate } = useTMutation({ url: "users", method: "post", token });

  const handleRoleUpdate = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload, id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };

  return {
    handleRoleUpdate,
    isLoading: mutate.isPending,
  };
};
