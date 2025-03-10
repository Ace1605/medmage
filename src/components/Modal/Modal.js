import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const Modal = ({ label, children, handleCloseModal }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Box
      onClick={handleCloseModal}
      position="fixed"
      zIndex="10"
      inset="0"
      w="full"
      h="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"#00000033"}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        px="0"
        w={{ base: "5/6", sm: "75%", lg: "full" }}
        maxW="717px"
        p={{ base: "5", sm: "7" }}
      >
        <CardHeader>
          {label && (
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              {label}
            </Text>
          )}
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </Box>
  );
};

export default Modal;
