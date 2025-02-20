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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React from "react";
import AuthBasic from "layouts/AuthBasic";
import { useNavigate } from "react-router-dom";

function ResetCover() {
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
          p="30px"
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
            mb="20px"
            fontSize={{ base: "3xl" }}
          >
            Reset password
          </Text>

          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              New Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="new password"
              mb="24px"
              size="lg"
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Confirm Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Confirm password"
              mb="24px"
              size="lg"
            />
            <Button
              onClick={() => navigate("/auth/authentication/sign-in")}
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
            >
              SEND
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default ResetCover;
