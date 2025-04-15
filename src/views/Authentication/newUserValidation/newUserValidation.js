// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BasicImage from "assets/img/BasicImage.png";
import React, { useState } from "react";
import AuthBasic from "layouts/AuthBasic";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCompleteAccount } from "hooks/api/auth/useCompleteAccount";
import { toast } from "sonner";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";

function NewUserValidation() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const forgotPasswordColor = useColorModeValue("blue.400", "blue");
  const bgForm = useColorModeValue("white", "navy.800");
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleCompleteAccount, isLoading } = useCompleteAccount();

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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
            </Grid>
            <FormControl position="relative">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon as={BsEyeFill} color="#b0b4ba" cursor="pointer" />
                ) : (
                  <Icon as={BsEyeSlash} color="#b0b4ba" cursor="pointer" />
                )}
              </Box>
            </FormControl>
            <FormControl position="relative">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Confirm Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                mb="24px"
                size="lg"
                pr="35px"
                s
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <Box
                position="absolute"
                top="43px"
                right="11px"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Icon as={BsEyeFill} color="#b0b4ba" cursor="pointer" />
                ) : (
                  <Icon as={BsEyeSlash} color="#b0b4ba" cursor="pointer" />
                )}
              </Box>
            </FormControl>
            <Button
              onClick={() => {
                handleCompleteAccount(
                  `${param.id}${location.search}`,
                  {
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    password_confirmation: cPassword,
                  },
                  (res) => {
                    if (res.status === 200) {
                      toast.success("Account creation completed");
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
              mb="14px"
            >
              {isLoading ? <Spinner w="18px" h="18px" /> : "CONTINUE"}
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthBasic>
  );
}

export default NewUserValidation;
