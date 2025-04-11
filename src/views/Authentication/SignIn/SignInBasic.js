// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React, { useContext, useState } from "react";
import AuthBasic from "layouts/AuthBasic";
import { useNavigate } from "react-router-dom";
import { useLogin } from "hooks/api/auth/useLogin";
import { Spinner } from "components/svgs/Icons";
import { emailRegex } from "utils/regex";
import { toast } from "sonner";
import { AppContext } from "contexts/AppContext";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";

function SignInCover() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const forgotPasswordColor = useColorModeValue("blue.400", "blue");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { setToken } = useContext(AppContext);
  const { handleLogin, isLoading } = useLogin();

  const isValid =
    email.trim() !== "" &&
    emailRegex.test(email.trim()) &&
    password.trim() !== "";

  return (
    <AuthBasic
      title="Welcome!"
      description="Sign in to your account to get started"
      image={BasicImage}
    >
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb="22px"
        px="16px"
        mt={{ base: "40px", md: "0px" }}
      >
        <Flex
          zIndex="2"
          direction="column"
          maxW="388px"
          w="full"
          background="transparent"
          borderRadius="15px"
          p="30px"
          mx={{ base: "auto" }}
          mb={{ base: "20px", md: "auto" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          <Text
            fontSize={{ base: "3xl" }}
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="10px"
          >
            Sign In
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
            <FormControl position="relative">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type={isVisible ? "text" : "password"}
                placeholder="Your password"
                mb="24px"
                size="lg"
                pr="35px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box
                position="absolute"
                top="43px"
                right="11px"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Icon as={BsEyeFill} color="#b0b4ba" cursor="pointer" />
                ) : (
                  <Icon as={BsEyeSlash} color="#b0b4ba" cursor="pointer" />
                )}
              </Box>
            </FormControl>

            <Button
              disabled={!isValid}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
                _hover: { bg: "gray.700" },
              }}
              onClick={() =>
                handleLogin(
                  { email: email.trim(), password: password.trim() },
                  (res) => {
                    if (res.status === 200) {
                      setToken(res?.data.data.token);
                      navigate("/admin/dashboard");
                      toast.success("User login successful");
                    } else {
                      toast.error(res?.message);
                    }
                  },
                  (err) => {
                    toast.error(
                      err?.response?.data?.message || "Something went wrong"
                    );
                  }
                )
              }
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="14px"
            >
              {isLoading ? <Spinner /> : "SIGN IN"}
            </Button>
          </FormControl>
          <Text
            onClick={() => navigate("/auth/authentication/forgot-password")}
            cursor="pointer"
            textAlign="middle"
            fontSize="14px"
            color={forgotPasswordColor}
            fontWeight="medium"
          >
            Forgot password?
          </Text>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default SignInCover;
