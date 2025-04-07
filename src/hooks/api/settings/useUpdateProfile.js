import { useTMutation } from "../useMutation";
import { useContext } from "react";
import { AppContext } from "contexts/AppContext";

export const useUpdateProfile = () => {
  const { token } = useContext(AppContext);
  const { mutate } = useTMutation({
    url: "profile",
    method: "post",
    token: token,
  });

  const handleUpdateProfile = async (payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };

  return {
    handleUpdateProfile,
    isLoading: mutate.isPending,
  };
};
