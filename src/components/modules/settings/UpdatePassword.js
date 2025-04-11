import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { AppContext } from "contexts/AppContext";
import { useUpdatePassword } from "hooks/api/settings/useUpdatePassword";
import { useContext, useState } from "react";
import { BsCircleFill, BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";

function UpdatePassword() {
  const textColor = useColorModeValue("gray.700", "white");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isValid = password.trim() !== "" && passwordConfirm.trim() !== "";
  const { token } = useContext(AppContext);
  const { handlePasswordUpdate, isLoading } = useUpdatePassword(token);

  const updatePassword = () => {
    handlePasswordUpdate(
      {
        password: password,
        confirm_password: passwordConfirm,
      },
      (res) => {
        if (res.status === 200) {
          toast.success("Password updated successfully");
          setPassword("");
          setPasswordConfirm("");
        } else {
          toast.error(res?.message);
        }
        (err) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
        };
      }
    );
  };
  return (
    <>
      <CardHeader mb="40px">
        <Text color={textColor} fontSize="lg" fontWeight="semibold">
          Change Password
        </Text>
      </CardHeader>
      <CardBody>
        <Stack direction="column" spacing="20px" w="100%">
          {/* <FormControl>
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              Current Password
            </FormLabel>
            <Input
              variant="main"
              placeholder="Current Password"
              fontSize="xs"
              readOnly={false}
            />
          </FormControl> */}
          <FormControl position="relative">
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              New Password
            </FormLabel>
            <Input
              type={showNewPassword ? "text" : "password"}
              variant="main"
              placeholder="New Password"
              fontSize="xs"
              pr="35px"
              readOnly={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box
              position="absolute"
              top="38px"
              right="11px"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <Icon as={BsEyeFill} color="#b0b4ba" cursor="pointer" />
              ) : (
                <Icon as={BsEyeSlash} color="#b0b4ba" cursor="pointer" />
              )}
            </Box>
          </FormControl>
          <FormControl position="relative">
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              Confirm New Password
            </FormLabel>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              variant="main"
              placeholder="Confirm New Password"
              fontSize="xs"
              pr="35px"
              readOnly={false}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Box
              position="absolute"
              top="38px"
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
          <Flex direction="column">
            <Text
              color={textColor}
              fontWeight="bold"
              fontSize="lg"
              mb="4px"
              mt="40px"
            >
              Password Requirements
            </Text>
            <Text color="gray.400" fontWeight="normal" fontSize="sm">
              Please follow this guide for a strong password.
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            justify="space-between"
            w="100%"
          >
            <Stack
              direction="column"
              spacing="6px"
              mb={{ sm: "12px", lg: "0px" }}
            >
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  One special characters
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  Min 6 characters
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  One number (2 are recommended)
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  Change it often
                </Text>
              </Flex>
            </Stack>
            <Button
              disabled={!isValid}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
                _hover: { bg: "#1f2733" },
              }}
              onClick={updatePassword}
              variant="dark"
              w="150px"
              h="35px"
              alignSelf="flex-end"
            >
              {isLoading ? <Spinner w="18px" h="18px" /> : "UPDATE"}
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </>
  );
}
export default UpdatePassword;
