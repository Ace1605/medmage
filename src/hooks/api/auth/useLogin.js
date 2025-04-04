const { useTMutation } = require("../useMutation");

export const useLogin = () => {
  const { mutate } = useTMutation({ url: "login", method: "post" });

  const handleLogin = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };

  return {
    handleLogin,
    isLoading: mutate.isPending,
  };
};
