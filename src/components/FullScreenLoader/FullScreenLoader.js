import { Box } from "@chakra-ui/react";
import { Spinner } from "components/svgs/Icons";

export default function FullScreenLoader() {
  return (
    <Box
      position="fixed"
      zIndex="10"
      inset="0"
      w="full"
      h="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#ffff"
    >
      <Spinner width="40px" height="40px" fill="#3182ce" stroke="#3182ce" />
    </Box>
  );
}
