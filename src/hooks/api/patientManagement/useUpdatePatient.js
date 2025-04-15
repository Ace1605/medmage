import { useTMutation } from "../useMutation";

export const useUpdatePatient = (token) => {
  const { mutate } = useTMutation({
    url: "patients",
    method: "post",
    token: token,
  });

  const handleUpdatePatient = async (
    id,
    payload,
    onSuccess,
    onError,
    setLoading
  ) => {
    try {
      setLoading(true);
      const res = await mutate.mutateAsync({ id, payload });
      if (onSuccess) {
        onSuccess(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
      setLoading(false);
    }
  };
  return {
    handleUpdatePatient,
  };
};
