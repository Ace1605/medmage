import { useTMutation } from "../useMutation";

export const useResendConfirmationEmail = () => {
  const { mutate } = useTMutation({
    url: "resent-confirmation-email",
    method: "post",
  });
  const handleResendConfirmation = async (id, payload, onSuccess, onError) => {
    try {
      const res = await mutate.mutateAsync({ payload, id });
      if (onSuccess) onSuccess(res);
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  };
  return { handleResendConfirmation, isLoading: mutate.isPending };
};
