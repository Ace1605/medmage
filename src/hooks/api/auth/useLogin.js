const { useTMutation } = require("../useMutation");

const useLogin = () => {
  const { mutate } = useTMutation({ url: "login", method: "post" });

  const handleLogin = () => {};
};
