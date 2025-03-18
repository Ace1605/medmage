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

  const [toggle, setToggle] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);

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
          display={isSuperAdmin ? "block" : "none"}
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
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    First Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter first name"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Middle Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter middle name"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",

                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter last name"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <FormControl
                  minW={{ sm: "35%", lg: null }}
                  isReadOnly={!isSuperAdmin}
                >
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Birth Date
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="YYYY-MM-DD"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    sx={{ _readOnly: { color: "gray.500" } }}
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                  >
                    Sex
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    placeholder="Male"
                    color="gray.400"
                    fontSize="xs"
                    icon={isSuperAdmin ? "none" : "block"}
                    disabled={!isSuperAdmin}
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  >
                    <option value="option1">Male</option>
                    <option value="option2">Female</option>
                  </Select>
                </FormControl>
                <FormControl
                  minW={{ sm: "35%", lg: null }}
                  isReadOnly={!isSuperAdmin}
                >
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Blood Type
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter blood group"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl
                  minW={{ sm: "35%", lg: null }}
                  isReadOnly={!isSuperAdmin}
                >
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    National Id
                  </FormLabel>
                  <Input
                    variant="main"
                    type="number"
                    placeholder="Enter Id number"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",

                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Phone
                  </FormLabel>
                  <Input
                    type="number"
                    variant="main"
                    placeholder="Enter phone number"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Email
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter email address"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>

                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Address
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter home address"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    City
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter city "
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",

                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    State
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter state"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Zip Code
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter zip code"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Country
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter country"
                    fontSize="xs"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Flex justify="end" mt="18px">
                <Button
                  display={isSuperAdmin ? "block" : "none"}
                  variant="dark"
                  w="150px"
                  h="35px"
                  alignSelf="flex-end"
                >
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
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Name
                  </FormLabel>
                  <Input variant="main" placeholder="" fontSize="xs" />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    variant="main"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",
                        border: 0,
                        pl: 0,
                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                    placeholder=""
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl isReadOnly={!isSuperAdmin}>
                  <FormLabel
                    fontWeight="semibold"
                    fontSize="xs"
                    mb="10px"
                    sx={{ _readOnly: { color: "gray.500" } }}
                  >
                    Relationship
                  </FormLabel>
                  <Input
                    variant="main"
                    sx={{
                      _readOnly: {
                        color: "gray.700",
                        fontWeight: "semibold",

                        border: 0,
                        pl: 0,

                        opacity: 1,
                        cursor: "default",
                      },
                    }}
                    placeholder=""
                    fontSize="xs"
                  />
                </FormControl>
                <Flex justify="end" mt="18px">
                  <Button
                    variant="dark"
                    w="150px"
                    h="35px"
                    alignSelf="flex-end"
                    display={isSuperAdmin ? "block" : "none"}
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
          display={isSuperAdmin ? "block" : "none"}
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
              <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Allergies
                </FormLabel>
                <Input
                  variant="main"
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Current Medications
                </FormLabel>
                <Textarea
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  _focus={{
                    borderColor: "gray.300",
                    boxShadow: "none",
                  }}
                  border="1px solid #e2e8f0"
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Medical History
                </FormLabel>
                <Textarea
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
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
                <Button
                  variant="dark"
                  w="150px"
                  h="35px"
                  alignSelf="flex-end"
                  display={isSuperAdmin ? "block" : "none"}
                >
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          display={isSuperAdmin ? "block" : "none"}
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
              <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Insurance Provider
                </FormLabel>
                <Input
                  variant="main"
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Insurance Policy Number
                </FormLabel>
                <Input
                  variant="main"
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <Flex justify="end" mt="18px">
                <Button
                  variant="dark"
                  w="150px"
                  h="35px"
                  alignSelf="flex-end"
                  display={isSuperAdmin ? "block" : "none"}
                >
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>
        <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end"
          display={isSuperAdmin ? "block" : "none"}
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
              <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Marita status
                </FormLabel>
                <Input
                  variant="main"
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Occupation
                </FormLabel>
                <Input
                  variant="main"
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
                  placeholder=""
                  fontSize="xs"
                />
              </FormControl>
              <FormControl isReadOnly={!isSuperAdmin}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="xs"
                  mb="10px"
                  sx={{ _readOnly: { color: "gray.500" } }}
                >
                  Notes
                </FormLabel>
                <Textarea
                  sx={{
                    _readOnly: {
                      color: "gray.700",
                      fontWeight: "semibold",
                      border: 0,
                      pl: 0,
                      opacity: 1,
                      cursor: "default",
                    },
                  }}
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
                <Button
                  variant="dark"
                  w="150px"
                  h="35px"
                  alignSelf="flex-end"
                  display={isSuperAdmin ? "block" : "none"}
                >
                  UPDATE
                </Button>
              </Flex>
            </CardBody>
          </Element>
        </Card>

        {/* <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end" display={isSuperAdmin ? "block" : "none"}
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
