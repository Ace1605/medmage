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
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Stack,
  Switch,
  Table,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Grid,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import {
  AtlassianLogo,
  InvisionLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import React, { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsArrowRight, BsCircleFill, BsToggleOn } from "react-icons/bs";
import { FaCube, FaUser } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { IoIosArrowUp, IoIosRocket, IoMdNotifications } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdPowerSettingsNew } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { Element, Link } from "react-scroll";

function Settings() {
  const bgHoverLinks = useColorModeValue("gray.100", "navy.900");
  const secondaryColor = useColorModeValue("gray.500", "white");
  const bgVerificationCard = useColorModeValue("gray.100", "navy.700");
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("white", "white");
  const bgSkillsInput = useColorModeValue("white", "navy.900");
  const bgSkill = useColorModeValue("gray.700", "blue.500");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const borderTableColor = useColorModeValue("gray.200", "gray.600");

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [activeButtons, setActiveButtons] = useState({
    Profile: true,
    basicInfo: false,
    changePassword: false,
    twoFactorAuth: false,
    notifications: false,
    deleteAccount: false,
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

  const scrollContainerRef = useRef(null);

  const handleScrollToId = (id) => {
    const container = scrollContainerRef.current;
    const targetElement = document.getElementById(id);
    if (container && targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        container.scrollTop -
        container.getBoundingClientRect().top -
        22;

      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex direction="column" pt={{ sm: "70px", lg: "75px" }}>
      <Box w="100%" pb="20px">
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          spacing={{ sm: "8px", lg: "30px" }}
          w={{ sm: "100%", lg: null }}
        >
          <Button
            spy={true}
            smooth={true}
            duration={500}
            variant={
              activeButtons.Profile
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.Profile
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.Profile && "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("profile");
              setActiveButtons({
                Profile: true,
                basicInfo: false,
                changePassword: false,
                towFactorAuth: false,
                notifications: false,
                deleteAccount: false,
              });
            }}
          >
            <Icon
              as={FaUser}
              me="8px"
              w="18px"
              h="18px"
              color={activeButtons.Profile && !isDark ? "black" : iconColor}
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.Profile && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              PROFILE
            </Text>
          </Button>

          <Button
            variant={
              activeButtons.basicInfo
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.basicInfo
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.basicInfo && "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("info");
              setActiveButtons({
                Profile: false,
                basicInfo: true,
                changePassword: false,
                towFactorAuth: false,
                notifications: false,
                deleteAccount: false,
              });
            }}
          >
            <Icon
              as={IoDocumentText}
              me="8px"
              w="18px"
              h="18px"
              color={activeButtons.basicInfo && !isDark ? "black" : iconColor}
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.basicInfo && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              BASIC INFO
            </Text>
          </Button>
          <Button
            variant={
              activeButtons.changePassword
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.changePassword
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.changePassword &&
                "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("change-password");
              setActiveButtons({
                Profile: false,
                basicInfo: false,
                changePassword: true,
                towFactorAuth: false,
                notifications: false,
                deleteAccount: false,
              });
            }}
          >
            <Icon
              as={FaCube}
              me="8px"
              w="18px"
              h="18px"
              color={
                activeButtons.changePassword && !isDark ? "black" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.changePassword && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              CHANGE PASSWORD
            </Text>
          </Button>

          <Button
            variant={
              activeButtons.twoFactorAuth
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.twoFactorAuth
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.twoFactorAuth &&
                "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("2fa");
              setActiveButtons({
                Profile: false,
                basicInfo: false,
                changePassword: false,
                twoFactorAuth: true,
                notifications: false,
                deleteAccount: false,
              });
            }}
          >
            <Icon
              as={BsToggleOn}
              me="8px"
              w="18px"
              h="18px"
              color={
                activeButtons.twoFactorAuth && !isDark ? "black" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.twoFactorAuth && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              2FA
            </Text>
          </Button>
          <Button
            variant={
              activeButtons.notifications
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.notifications
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.notifications &&
                "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("notifications");
              setActiveButtons({
                Profile: false,
                basicInfo: false,
                changePassword: false,
                towFactorAuth: false,
                notifications: true,
                deleteAccount: false,
              });
            }}
          >
            <Icon
              as={IoMdNotifications}
              me="8px"
              w="18px"
              h="18px"
              color={
                activeButtons.notifications && !isDark ? "black" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.notifications && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              NOTIFICATIONS
            </Text>
          </Button>
          <Button
            variant={
              activeButtons.deleteAccount
                ? colorMode === "light"
                  ? "light"
                  : "primary"
                : "no-effects"
            }
            boxShadow={
              activeButtons.deleteAccount
                ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                : "none"
            }
            transition="all .5s ease"
            w={{ sm: "100%", lg: "95%" }}
            h="35px"
            _focus={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
            _active={{
              boxShadow:
                activeButtons.deleteAccount &&
                "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
            }}
            onClick={() => {
              handleScrollToId("delete-account");
              setActiveButtons({
                Profile: false,
                basicInfo: false,
                changePassword: false,
                towFactorAuth: false,
                notifications: false,
                deleteAccount: true,
              });
            }}
          >
            <Icon
              as={AiFillDelete}
              me="8px"
              w="18px"
              h="18px"
              color={
                activeButtons.deleteAccount && !isDark ? "black" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.deleteAccount && "white"}
              fontWeight="bold"
              fontSize="xs"
            >
              DELETE ACCOUNT
            </Text>
          </Button>
        </Grid>
      </Box>

      <Box
        ref={scrollContainerRef}
        height={{
          sm: "calc(100svh - 255px)",
          md: "calc(100vh - 216px)",
          lg: "calc(100vh - 188px)",
        }}
        overflowY={{ sm: "scroll", xl: "scroll" }}
        sx={{
          "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
          "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
          "scrollbar-width": "none", // Hide scrollbar in Firefox
        }}
      >
        <Stack
          direction="column"
          spacing="24px"
          mt="20px"
          align={{ lg: "flex-end" }}
          justify={{ lg: "flex-end" }}
          w="100%"
        >
          <Card
            w={{ sm: "100%", lg: "100%" }}
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
            w={{ sm: "100%", lg: "100%" }}
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
                <Stack direction="column" spacing="20px" w="100%">
                  <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        First Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Michael"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Last Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Jackson"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <FormControl w="40%">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        I'm
                      </FormLabel>
                      <Select
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
                    <Stack
                      direction="row"
                      spacing={{ sm: "24px", lg: "30px" }}
                      w="100%"
                      align="flex-end"
                    >
                      <FormControl minW={{ sm: "35%", lg: null }}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Birth Date
                        </FormLabel>
                        <Select
                          variant="main"
                          color="gray.400"
                          fontSize="sm"
                          defaultValue="option1"
                          onChange={() => {}}
                        >
                          <option value="option1">January</option>
                          <option value="option2">February</option>
                          <option value="option3">March</option>
                          <option value="option4">April</option>
                          <option value="option5">May</option>
                          <option value="option6">June</option>
                          <option value="option7">July</option>
                          <option value="option8">August</option>
                          <option value="option9">September</option>
                          <option value="option10">October</option>
                          <option value="option11">November</option>
                          <option value="option12">December</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Select
                          variant="main"
                          color="gray.400"
                          placeholder="1"
                          fontSize="xs"
                          defaultValue="option1"
                          onChange={() => {}}
                        >
                          <option value="option2">2</option>
                          <option value="option3">3</option>
                          <option value="option4">4</option>
                          <option value="option5">5</option>
                          <option value="option6">6</option>
                          <option value="option7">7</option>
                          <option value="option8">-</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Select
                          variant="main"
                          color="gray.400"
                          placeholder="2010"
                          fontSize="xs"
                          defaultValue="option1"
                          onChange={() => {}}
                        >
                          <option value="option2">2011</option>
                          <option value="option3">2012</option>
                          <option value="option4">2013</option>
                          <option value="option5">2014</option>
                          <option value="option6">2015</option>
                          <option value="option7">2016</option>
                          <option value="option8">2018</option>
                          <option value="option8">2019</option>
                          <option value="option8">2020</option>
                          <option value="option8">2022</option>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Email Address
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. esthera@address.com"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Confirmation Email
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. esthera@address.com"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={{ sm: "24px", lg: "30px" }}>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Your Location
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. Bucharest"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Phone Number
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="eg. +40 941 353 292"
                        fontSize="xs"
                        readOnly
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Language
                      </FormLabel>
                      <Select
                        variant="main"
                        placeholder="English"
                        color="gray.400"
                        fontSize="xs"
                        isReadOnly
                      >
                        <option value="option1">French</option>
                        <option value="option2">Spanish</option>
                        <option value="option3">Romanian</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Skills
                      </FormLabel>
                      <Flex
                        direction="row"
                        p="12px"
                        wrap="wrap"
                        bg={bgSkillsInput}
                        borderRadius="8px"
                        border="1px solid"
                        borderColor={borderColor}
                        minH="60px"
                        cursor="text"
                      >
                        {skills.map((skill) => {
                          return (
                            <Tag
                              minW="80px"
                              fontSize="xs"
                              h="25px"
                              mb="6px"
                              me="6px"
                              key={skill.id}
                              borderRadius="12px"
                              variant="solid"
                              bg={bgSkill}
                            >
                              <TagLabel w="100%">{skill.name}</TagLabel>
                              <TagCloseButton
                                justifySelf="flex-end"
                                onClick={() =>
                                  setSkills([
                                    ...skills.filter(
                                      (element) => element.id !== skill.id
                                    ),
                                  ])
                                }
                              />
                            </Tag>
                          );
                        })}
                        <Input
                          border="none"
                          p="0px"
                          onKeyDown={(e) => keyPress(e)}
                          fontSize="xs"
                          readOnly
                        />
                      </Flex>
                    </FormControl>
                  </Stack>
                </Stack>
              </CardBody>
            </Element>
          </Card>
          <Card
            w={{ sm: "100%", lg: "100%" }}
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            <Element id="change-password" name="change-password">
              <CardHeader mb="40px">
                <Text color={textColor} fontSize="lg" fontWeight="semibold">
                  Change Password
                </Text>
              </CardHeader>
              <CardBody>
                <Stack direction="column" spacing="20px" w="100%">
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Current Password
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Current Password"
                      fontSize="xs"
                      readOnly
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      New Password
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="New Password"
                      fontSize="xs"
                      readOnly
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Confirm New Password
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Confirm New Password"
                      fontSize="xs"
                      readOnly
                    />
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
                        <Text
                          color="gray.500"
                          fontWeight="normal"
                          fontSize="xs"
                        >
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
                        <Text
                          color="gray.500"
                          fontWeight="normal"
                          fontSize="xs"
                        >
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
                        <Text
                          color="gray.500"
                          fontWeight="normal"
                          fontSize="xs"
                        >
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
                        <Text
                          color="gray.500"
                          fontWeight="normal"
                          fontSize="xs"
                        >
                          Change it often
                        </Text>
                      </Flex>
                    </Stack>
                    <Button
                      variant="dark"
                      w="150px"
                      h="35px"
                      alignSelf="flex-end"
                    >
                      UPDATE PASSWORD
                    </Button>
                  </Flex>
                </Stack>
              </CardBody>
            </Element>
          </Card>
          <Card
            w={{ sm: "100%", lg: "100%" }}
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            <Element id="2fa" name="2fa">
              <CardHeader mb="32px">
                <Flex justify="space-between" w="100%">
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    Two-Factor Authentication
                  </Text>
                  <Badge
                    bg={colorMode === "light" ? "green.100" : "green.400"}
                    color={colorMode === "light" ? "green.400" : "white"}
                    borderRadius="12px"
                    p="12px"
                    alignSelf={{ sm: "flex-start", lg: null }}
                  >
                    ENABLED
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack direction="column" spacing="22px" w="100%">
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      color="gray.400"
                      fontWeight="bold"
                      fontSize="sm"
                      alignSelf={{ sm: "center", lg: null }}
                      mb={{ sm: "12px", lg: null }}
                    >
                      Security keys
                    </Text>
                    <Flex align="center">
                      <Text
                        color="gray.500"
                        fontWeight="normal"
                        fontSize="sm"
                        me="28px"
                      >
                        No Security keys
                      </Text>
                      <Button
                        variant="outline"
                        colorScheme="dark"
                        w="90px"
                        h="35px"
                        fontSize="10px"
                      >
                        ADD
                      </Button>
                    </Flex>
                  </Flex>
                  <HSeparator />
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      color="gray.400"
                      fontWeight="bold"
                      fontSize="sm"
                      alignSelf={{ sm: "center", lg: null }}
                      mb={{ sm: "12px", lg: null }}
                    >
                      SMS Number
                    </Text>
                    <Flex align="center">
                      <Text
                        color="gray.500"
                        fontWeight="normal"
                        fontSize="sm"
                        me="28px"
                      >
                        +40 941 264 232
                      </Text>
                      <Button
                        variant="outline"
                        colorScheme="dark"
                        w="90px"
                        h="35px"
                        fontSize="10px"
                      >
                        EDIT
                      </Button>
                    </Flex>
                  </Flex>
                  <HSeparator />
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      color="gray.400"
                      fontWeight="bold"
                      fontSize="sm"
                      alignSelf={{ sm: "center", lg: null }}
                      mb={{ sm: "12px", lg: null }}
                    >
                      Authenticator App
                    </Text>
                    <Flex align="center">
                      <Text
                        color="gray.500"
                        fontWeight="normal"
                        fontSize="sm"
                        me="28px"
                      >
                        Not Configured
                      </Text>
                      <Button
                        variant="outline"
                        colorScheme="dark"
                        w="90px"
                        h="35px"
                        fontSize="10px"
                      >
                        SET UP
                      </Button>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Element>
          </Card>

          <Card
            pb="0px"
            w={{ sm: "100%", lg: "100%" }}
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            <Element id="notifications" name="notifications">
              <CardHeader mb="40px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="semibold"
                    mb="4px"
                  >
                    Notifications
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Choose how you receive notifications. These notification
                    settings apply to the things you’re watching.
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody overflowX={{ sm: "scroll", lg: "hidden" }}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th
                        color="gray.400"
                        fontSize="md"
                        fontWeight="normal"
                        ps="0px"
                        textTransform="capitalise"
                        borderColor={borderTableColor}
                      >
                        Activity
                      </Th>
                      <Th
                        color="gray.400"
                        fontSize="md"
                        fontWeight="normal"
                        textTransform="capitalise"
                        borderColor={borderTableColor}
                      >
                        Email
                      </Th>
                      <Th
                        color="gray.400"
                        fontSize="md"
                        fontWeight="normal"
                        textTransform="capitalise"
                        borderColor={borderTableColor}
                      >
                        Push
                      </Th>
                      <Th
                        color="gray.400"
                        fontSize="md"
                        fontWeight="normal"
                        textTransform="capitalise"
                        borderColor={borderTableColor}
                      >
                        SMS
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td
                        borderColor={borderTableColor}
                        ps="0px"
                        minW={{ sm: "300px" }}
                      >
                        <Flex direction="column">
                          <Text
                            color={textColor}
                            fontWeight="normal"
                            fontSize="sm"
                            mb="4px"
                          >
                            Mentions
                          </Text>
                          <Text
                            color="gray.400"
                            fontSize="xs"
                            fontWeight="normal"
                          >
                            Notify when another user mentions you in a comment
                          </Text>
                        </Flex>
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        borderColor={borderTableColor}
                        ps="0px"
                        minW={{ sm: "300px" }}
                      >
                        <Flex direction="column">
                          <Text
                            color={textColor}
                            fontWeight="normal"
                            fontSize="sm"
                            mb="4px"
                          >
                            Comments
                          </Text>
                          <Text
                            color="gray.400"
                            fontSize="xs"
                            fontWeight="normal"
                          >
                            Notify when another user comments your item.
                          </Text>
                        </Flex>
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch colorScheme="blue" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        borderColor={borderTableColor}
                        ps="0px"
                        minW={{ sm: "300px" }}
                      >
                        <Flex direction="column">
                          <Text
                            color={textColor}
                            fontWeight="normal"
                            fontSize="sm"
                            mb="4px"
                          >
                            Follows
                          </Text>
                          <Text
                            color="gray.400"
                            fontSize="xs"
                            fontWeight="normal"
                          >
                            Notify when another user follows you.
                          </Text>
                        </Flex>
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor}>
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        borderColor={borderTableColor}
                        border="none"
                        ps="0px"
                        py="24px"
                        minW={{ sm: "300px" }}
                      >
                        <Flex direction="column">
                          <Text
                            color={textColor}
                            fontWeight="normal"
                            fontSize="xs"
                            mb="4px"
                          >
                            Log in from a new device
                          </Text>
                        </Flex>
                      </Td>
                      <Td borderColor={borderTableColor} border="none">
                        <Switch colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor} border="none">
                        <Switch defaultIsChecked colorScheme="blue" />
                      </Td>
                      <Td borderColor={borderTableColor} border="none">
                        <Switch colorScheme="blue" />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </CardBody>
            </Element>
          </Card>

          <Card
            w={{ sm: "100%", lg: "100%" }}
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
          </Card>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Settings;
