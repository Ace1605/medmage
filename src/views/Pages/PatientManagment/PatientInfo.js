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
import { InfoIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { PersonIcon } from "components/Icons/Icons";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import { Element, Link } from "react-scroll";

function PatientInfo() {
  const bgHoverLinks = useColorModeValue("gray.100", "navy.900");
  const secondaryColor = useColorModeValue("gray.500", "white");
  const bgVerificationCard = useColorModeValue("gray.100", "navy.700");
  const textColor = useColorModeValue("gray.700", "white");
  const bgSkillsInput = useColorModeValue("white", "navy.900");
  const bgSkill = useColorModeValue("gray.700", "blue.500");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const borderTableColor = useColorModeValue("gray.200", "gray.600");

  const { colorMode } = useColorMode();

  const [activeButtons, setActiveButtons] = useState({
    messages: true,
    social: false,
    notifications: false,
    backup: false,
  });
  const [skills, setSkills] = useState([
    {
      name: "chakra-ui",
      id: 1,
    },
    {
      name: "react",
      id: 2,
    },
    {
      name: "javascript",
      id: 3,
    },
  ]);

  const [toggle, setToggle] = useState(false);

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setSkills([
        ...skills,
        {
          name: e.target.value,
          id: skills.length === 0 ? 1 : skills[skills.length - 1].id + 1,
        },
      ]);
      e.target.value = "";
    }
  };

  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card
        w={{ sm: "100%", lg: "262px", xl: "21%", "2xl": "23.4%" }}
        mt={{ sm: "30px", lg: "0px" }}
        position={{ lg: "fixed" }}
        top={{ lg: "180px" }}
      >
        <CardBody>
          <Stack direction="column" spacing="8px" w="100%" color="gray.500">
            <Link to="profile" spy={true} smooth={true} duration={500}>
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={PersonIcon}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Profile
                  </Text>
                </Flex>
              </Button>
            </Link>
            <Link to="info" spy={true} smooth={true} duration={500}>
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={IoDocumentText}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Basic Info
                  </Text>
                </Flex>
              </Button>
            </Link>
            <Link
              to="emergency-contact"
              spy={true}
              smooth={true}
              duration={500}
            >
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={PhoneIcon}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Emergency contact
                  </Text>
                </Flex>
              </Button>
            </Link>
            <Link to="medical" spy={true} smooth={true} duration={500}>
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={BiPlusMedical}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Medical
                  </Text>
                </Flex>
              </Button>
            </Link>
            <Link to="insurance" spy={true} smooth={true} duration={500}>
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={IoDocumentText}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Insurance
                  </Text>
                </Flex>
              </Button>
            </Link>
            <Link to="additional-info" spy={true} smooth={true} duration={500}>
              <Button
                variant="no-effects"
                _hover={{ bg: bgHoverLinks }}
                w="100%"
              >
                <Flex align="center" justifySelf="flex-start" w="100%">
                  <Icon
                    as={InfoIcon}
                    me="12px"
                    w="18px"
                    h="18px"
                    color={textColor}
                  />
                  <Text color="gray.500" fontWeight="normal" fontSize="xs">
                    Additional Infomation
                  </Text>
                </Flex>
              </Button>
            </Link>
          </Stack>
        </CardBody>
      </Card>
      <Stack
        direction="column"
        spacing="24px"
        mt="40px"
        align={{ lg: "flex-end" }}
        justify={{ lg: "flex-end" }}
        w="100%"
      >
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf={{ lg: "flex-end" }}
          justifySelf={{ lg: "flex-end" }}
        >
          <Element id="profile" name="profile">
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                justify="space-between"
                align="center"
                w="100%"
              >
                <Flex align="center">
                  <Avatar src={avatar4} w="80px" h="80px" me="22px" />
                  <Flex direction="column">
                    <Text color={textColor} fontWeight="bold" fontSize="lg">
                      Esthera Jackson
                    </Text>
                    <Text color="gray.400" fontWeight="normal" fontSize="sm">
                      esthera@simmmple.com
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  align="center"
                  alignSelf={{ sm: "flex-start", lg: null }}
                  mt={{ sm: "16px", lg: null }}
                  ms={{ sm: "6px", lg: null }}
                >
                  <Text
                    color={textColor}
                    fontWeight="normal"
                    me="14px"
                    fontSize="sm"
                  >
                    Switch to {toggle ? "invisible" : "visible"}
                  </Text>
                  <Switch
                    colorScheme="blue"
                    onChange={() => setToggle(!toggle)}
                  />
                </Flex>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element id="info" name="info">
            <CardHeader mb="40px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Basic Info
              </Text>
            </CardHeader>
            <CardBody>
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "1fr",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap="15px"
                spacing={{ sm: "8px", lg: "30px" }}
                w={{ sm: "100%", lg: null }}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    First Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter first name"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Middle Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter middle name"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Last Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter last name"
                    fontSize="xs"
                  />
                </FormControl>

                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Birth Date
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="YYYY-MM-DD"
                    fontSize="xs"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Sex
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    placeholder="Male"
                    color="gray.400"
                    fontSize="xs"
                    isReadOnly
                  >
                    <option value="option1">Male</option>
                    <option value="option2">Female</option>
                  </Select>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Blood Type
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter blood group"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    National Id
                  </FormLabel>
                  <Input
                    variant="main"
                    type="number"
                    placeholder="Enter Id number"
                    fontSize="xs"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Phone
                  </FormLabel>
                  <Input
                    type="number"
                    variant="main"
                    placeholder="Enter phone number"
                    fontSize="xs"
                    readOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Email
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter email address"
                    fontSize="xs"
                    readOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Address
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter home address"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    City
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter city "
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    State
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter state"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Zip Code
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter zip code"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Country
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter country"
                    fontSize="xs"
                  />
                </FormControl>
              </Grid>
              <Flex justify="end" mt="18px">
                <Button variant="dark" w="150px" h="35px" alignSelf="flex-end">
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element id="emergency-contact" name="emergency-contact">
            <CardHeader mb="40px">
              <Text color={textColor} fontSize="lg" fontWeight="semibold">
                Emergency contact
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction="column" spacing="20px" w="100%">
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Name
                  </FormLabel>
                  <Input variant="main" placeholder="" fontSize="xs" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Phone Number
                  </FormLabel>
                  <Input variant="main" placeholder="" fontSize="xs" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Relationship
                  </FormLabel>
                  <Input variant="main" placeholder="" fontSize="xs" />
                </FormControl>
                <Flex justify="end" mt="18px">
                  <Button
                    variant="dark"
                    w="150px"
                    h="35px"
                    alignSelf="flex-end"
                  >
                    UPDATE
                  </Button>
                </Flex>
              </Stack>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element id="medical" name="medical">
            <CardHeader mb="32px">
              <Flex justify="space-between" w="100%">
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Medical
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <FormControl mb="16px">
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Allergies
                </FormLabel>
                <Input variant="main" placeholder="" fontSize="xs" />
              </FormControl>
              <FormControl mb="16px">
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Current Medications
                </FormLabel>
                <Textarea
                  _focus={{
                    borderColor: "gray.300",
                    boxShadow: "none",
                  }}
                  border="1px solid #e2e8f0"
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Medical History
                </FormLabel>
                <Textarea
                  _focus={{
                    borderColor: "gray.300",
                    boxShadow: "none",
                  }}
                  border="1px solid #e2e8f0"
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <Flex justify="end" mt="18px">
                <Button variant="dark" w="150px" h="35px" alignSelf="flex-end">
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element to="insurance" name="insurance">
            <CardHeader mb="40px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="semibold"
                  mb="4px"
                >
                  Insurance
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <FormControl mb="16px">
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Insurance Provider
                </FormLabel>
                <Input variant="main" placeholder="" fontSize="xs" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Insurance Policy Number
                </FormLabel>
                <Input variant="main" placeholder="" fontSize="xs" />
              </FormControl>
              <Flex justify="end" mt="18px">
                <Button variant="dark" w="150px" h="35px" alignSelf="flex-end">
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element to="additional-info" name="additional-info">
            <CardHeader mb="40px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="semibold"
                  mb="4px"
                >
                  Additional Indormation
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <FormControl mb="16px">
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Marita status
                </FormLabel>
                <Input variant="main" placeholder="" fontSize="xs" />
              </FormControl>
              <FormControl mb="16px">
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Occupation
                </FormLabel>
                <Input variant="main" placeholder="" fontSize="xs" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Notes
                </FormLabel>
                <Textarea
                  _focus={{
                    borderColor: "gray.300", // Change to desired color
                    boxShadow: "none", // Remove the glow effect
                  }}
                  border="1px solid #e2e8f0"
                  placeholder="notes"
                  fontSize="xs"
                />
              </FormControl>
              <Flex justify="end" mt="18px">
                <Button variant="dark" w="150px" h="35px" alignSelf="flex-end">
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>

        {/* <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          justifySelf="flex-end"
        >
          <Element id="delete-account" name="delete-account">
            <CardHeader mb="40px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="4px"
                >
                  Delete Account
                </Text>
                <Text color="gray.400" fontWeight="normal" fontSize="sm">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                justify="space-between"
                align="start"
                w="100%"
              >
                <Flex align="center" mb={{ sm: "16px", lg: null }}>
                  <Switch colorScheme="blue" me="22px" />
                  <Flex direction="column">
                    <Text
                      fontSize="sm"
                      color={textColor}
                      mb="4px"
                      fontWeight="semibold"
                    >
                      Confirm
                    </Text>
                    <Text color="gray.400" fontWeight="normal" fontSize="xs">
                      I want to delete my account.
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="center">
                  <Button
                    variant="outline"
                    colorScheme="black"
                    w="120px"
                    h="35px"
                    fontSize="10px"
                    me="14px"
                  >
                    DEACTIVATE
                  </Button>
                  <Button variant="danger" w="150px" h="35px" fontSize="10px">
                    DELETE ACCOUNT
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Element>
        </Card> */}
      </Stack>
    </Flex>
  );
}

export default PatientInfo;
