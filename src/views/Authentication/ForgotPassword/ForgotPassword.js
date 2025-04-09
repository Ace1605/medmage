// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React, { useState } from "react";
import AuthBasic from "layouts/AuthBasic";
import { useNavigate } from "react-router-dom";
import { isValid } from "date-fns";
import { emailRegex } from "utils/regex";
import { useforgetPassword } from "hooks/api/auth/useforgetPassword";
import { toast } from "sonner";

function ForgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isValid = emailRegex.test(email);

  const { handleForgetPassword, isLoading } = useforgetPassword();
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
            Forgot password
          </Text>
          <Text
            fontWeight="regular"
            textAlign="center"
            color="gray.400"
            mb="35px"
          >
            You will receive an e-mail in maximum 60 seconds.
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your email address"
              mb="24px"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => {
                handleForgetPassword(
                  { email: email },
                  (res) => {
                    if (res.status === 200) {
                      toast.success(
                        "Reset instructions sent, please check your email"
                      );
                      navigate("/auth/authentication/reset-password");
                    } else {
                      toast.error(res?.response.data.message);
                    }
                  },
                  (err) => {
                    toast.error(
                      err?.response?.data?.message || "Something went wrong"
                    );
                  }
                );
              }}
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
              disabled={!isValid}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
                _hover: { bg: "#1f2733" },
              }}
            >
              {isLoading ? <Spinner w="18px" h="18px" /> : "SEND"}
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default ForgotPassword;
