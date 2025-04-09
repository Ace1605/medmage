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
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React, { useState } from "react";
import AuthBasic from "layouts/AuthBasic";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "hooks/api/auth/useResetPassword";
import { toast } from "sonner";

function ResetCover() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const { handleResetPassword, isLoading } = useResetPassword();

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
          {/* <Text
            fontWeight="regular"
            textAlign="center"
            color="gray.400"
            mb="35px"
          >
            You will receive an e-mail in maximum 60 seconds.
          </Text> */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={() => {
                handleResetPassword(
                  `${param.id}${location.search}`,
                  {
                    password,
                    confirm_password,
                  },
                  (res) => {
                    if (res.status === 200) {
                      toast.success("Password reset successfully");
                      navigate("/auth/authentication/sign-in");
                    } else {
                      toast.error(res?.message);
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
            >
              {isLoading ? <Spinner w="18px" h="18px" /> : "RESET"}
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default ResetCover;
