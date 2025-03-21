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
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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

function NewUserValidation() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const forgotPasswordColor = useColorModeValue("blue.400", "blue");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  return (
    <AuthBasic
      title="Welcome!"
      description="Kindly fill out the required information to get started"
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
          maxW="470px"
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
          ></Text>

          <FormControl>
            <Grid
              templateColumns={{ md: "repeat(2, 1fr)" }}
              gap={{ md: "14px" }}
            >
              <Box>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  First Name
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Enter first name"
                  mb="24px"
                  size="lg"
                />
              </Box>
              <Box>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Last Name
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Enter last Name"
                  mb="24px"
                  size="lg"
                />
              </Box>
            </Grid>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Your email address"
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
              placeholder="Your password"
              mb="24px"
              size="lg"
            />
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
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default NewUserValidation;
