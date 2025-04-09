import { useTMutation } from "../useMutation";

export const useUpdatePassword = (token) => {
  const { mutate } = useTMutation({
    url: "profile/password",
    method: "post",
    token: token,
  });
  const handlePasswordUpdate = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };

  return { handlePasswordUpdate, isLoading: mutate.isPending };
};
