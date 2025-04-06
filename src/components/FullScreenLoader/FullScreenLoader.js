import { Box, Image } from "@chakra-ui/react";
import { Spinner } from "components/svgs/Icons";
import logoFullColor from "assets/logos/logo_full colour.png";

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
      <div style={{ position: "relative" }}>
        <Image className="animate-bounce" src={logoFullColor} w="100px" />
        <div
          style={{
            position: "absolute",
            background: "#EBEEF1",
            width: "100px",
            height: "1px",
            bottom: "-5px",
          }}
        />
      </div>
    </Box>
  );
}
