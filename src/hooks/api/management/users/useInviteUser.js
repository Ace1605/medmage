import { useTMutation } from "hooks/api/useMutation";

export const useInviteUser = (token) => {
  const { mutate } = useTMutation({
    url: "users",
    method: "post",
    token: token,
  });

  const handleInviteUser = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return {
    handleInviteUser,
    isLoading: mutate.isPending,
  };
};
