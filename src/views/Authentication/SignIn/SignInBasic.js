/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React from "react";
import AuthBasic from "layouts/AuthBasic";
import { useNavigate } from "react-router-dom";

function SignInCover() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const forgotPasswordColor = useColorModeValue("blue.400", "blue");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
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
          {/* <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            or
          </Text> */}
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
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Your password"
              mb="24px"
              size="lg"
            />
            {/* <FormControl display="flex" alignItems="center" mb="24px">
              <Switch id="remember-login" colorScheme="blue" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl> */}
            <Button
              onClick={() => navigate("/admin/dashboard")}
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="14px"
            >
              SIGN IN
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
          {/* <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Don’t have an account?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                Sign up
              </Link>
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default SignInCover;
