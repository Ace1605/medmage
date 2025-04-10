import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BasicImage from "assets/img/BasicImage.png";
import AuthBasic from "layouts/AuthBasic";
import { useNavigate } from "react-router-dom";
function ConfirmAccount() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  return (
    <AuthBasic image={BasicImage}>
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb="60px"
        mt={{ base: "60px", md: "0px" }}
      >
        <Flex
          zIndex="2"
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "20px", md: "100px" }}
          mb={{ base: "20px", md: "auto" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          <Text
            fontWeight="bold"
            color={textColor}
            textAlign="center"
            mb="10px"
            fontSize={{ base: "3xl" }}
          >
            Confirm Account
          </Text>
          <Text
            fontWeight="regular"
            textAlign="center"
            color="gray.400"
            mb="15px"
          >
            Please click on the button to confirm you account
          </Text>
          <FormControl>
            <Button
              onClick={() => navigate("/auth/authentication/sign-in")}
              fontSize="14px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              my="24px"
            >
              Confirm
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default ConfirmAccount;
