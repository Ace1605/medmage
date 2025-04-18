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
  Grid,
  Tr,
  useColorMode,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UpdatePassword from "components/modules/settings/UpdatePassword";
import { HSeparator } from "components/Separator/Separator";
import { AppContext } from "contexts/AppContext";
import { useGetProfile } from "hooks/api/auth/useGetProfile";
import { useUpdateProfile } from "hooks/api/settings/useUpdateProfile";
import React, { useContext, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCircleFill, BsToggleOn } from "react-icons/bs";
import { FaCube, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { Element, Link } from "react-scroll";
import { toast } from "sonner";
import { months } from "utils/constants";
import { getDaysInMonth } from "utils/generators";
import { getAllYears } from "utils/generators";

function Settings() {
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("black", "white");
  const bgSkillsInput = useColorModeValue("white", "navy.900");
  const bgSkill = useColorModeValue("gray.700", "blue.500");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const borderTableColor = useColorModeValue("gray.200", "gray.600");

  const { colorMode } = useColorMode();
  const { user, token } = useContext(AppContext);
  const isDark = colorMode === "dark";
  // PROFILE
  const { refetch } = useGetProfile(token);
  const [name, setName] = useState({
    firstName: user?.first_name,
    lastName: user?.last_name,
  });
  const [gender, setGender] = useState(user?.gender || "Male");
  const [dob, setDob] = useState({
    day: user?.birth_date?.slice(-2) ?? "1",
    month: user?.birth_date?.slice(-5, -3) ?? "01",
    year: user?.birth_date?.slice(0, 4) ?? "1900",
  });

  const years = getAllYears();
  const daysInSelectedMonth = getDaysInMonth(dob.month);
  const daysArray = Array.from(
    { length: daysInSelectedMonth },
    (_, i) => i + 1
  );

  const [email, setEmail] = useState({
    email: user?.email ?? "",
    confirmationEmail: user?.confirmation_email ?? "",
  });

  const [location, setLocation] = useState({
    address: user?.address ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
  });
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number ?? "");
  const [language, setLangage] = useState(user?.language ?? "English");

  const [skills, setSkills] = useState(() => {
    return (user?.skills || []).map((skill, index) => ({
      name: skill,
      id: index + 1,
    }));
  });

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

  const { handleUpdateProfile, isLoading } = useUpdateProfile();
  const updateProfile = () => {
    handleUpdateProfile(
      {
        first_name: name.firstName,
        last_name: name.lastName,
        birth_date: `${dob.year}-${dob.month}-${dob.day}`,
        email: email.email,
        confirmation_email: email.confirmationEmail,
        gender: gender,
        phone_number: phoneNumber,
        address: location.address,
        city: location.city,
        state: location.state,
        language: language,
        skills: skills.map((skill) => skill.name),
      },
      (res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          refetch();
        } else {
          toast.error(res?.message);
        }
      }
    );
  };
  const [activeButtons, setActiveButtons] = useState({
    Profile: true,
    basicInfo: false,
    changePassword: false,
    twoFactorAuth: false,
    notifications: false,
    deleteAccount: false,
  });

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
              color={activeButtons.Profile && !isDark ? "blue.500" : iconColor}
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.Profile ? "black" : "blue.500"}
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
              color={
                activeButtons.basicInfo && !isDark ? "blue.500" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.basicInfo ? "black" : "blue.500"}
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
                activeButtons.changePassword && !isDark ? "blue.500" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.changePassword ? "black" : "blue.500"}
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
                activeButtons.twoFactorAuth && !isDark ? "blue.500" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.twoFactorAuth ? "black" : "blue.500"}
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
                activeButtons.notifications && !isDark ? "blue.500" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.notifications ? "black" : "blue.500"}
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
                activeButtons.deleteAccount && !isDark ? "blue.500" : iconColor
              }
              display={{ sm: "none", lg: "block" }}
            />
            <Text
              color={!activeButtons.deleteAccount ? "black" : "blue.500"}
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
          lg: "calc(100vh - 145px)",
        }}
        overflowY={{ sm: "scroll", xl: "scroll" }}
      >
        <Stack
          sx={{
            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
            "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
            "scrollbar-width": "none", // Hide scrollbar in Firefox
          }}
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
                        {user?.first_name} {user?.last_name}
                      </Text>
                      <Text color="gray.400" fontWeight="normal" fontSize="sm">
                        {user?.email}
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
                        readOnly={false}
                        value={name.firstName}
                        onChange={(e) =>
                          setName((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
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
                        readOnly={false}
                        value={name.lastName}
                        onChange={(e) =>
                          setName((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    <FormControl w="40%">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Gender
                      </FormLabel>
                      <Select
                        cursor="pointer"
                        variant="main"
                        color="gray.400"
                        fontSize="xs"
                        value={gender}
                        isReadOnly={false}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                          cursor="pointer"
                          variant="main"
                          color="gray.400"
                          fontSize="sm"
                          value={dob.month}
                          onChange={(e) =>
                            setDob((prev) => ({
                              ...prev,
                              month: e.target.value,
                            }))
                          }
                        >
                          {months.map((month) => {
                            // console.log("val", month.value);
                            return (
                              <option value={month.value}>{month.key}</option>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Select
                          cursor="pointer"
                          variant="main"
                          color="gray.400"
                          value={dob.day}
                          fontSize="xs"
                          onChange={(e) =>
                            setDob((prev) => ({
                              ...prev,
                              day: e.target.value,
                            }))
                          }
                        >
                          {daysArray.map((day) => {
                            return <option value={day}>{day}</option>;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Select
                          variant="main"
                          color="gray.400"
                          fontSize="xs"
                          value={dob.year}
                          onChange={(e) =>
                            setDob((prev) => ({
                              ...prev,
                              year: e.target.value,
                            }))
                          }
                        >
                          {years.map((year) => {
                            return <option value={year}>{year}</option>;
                          })}
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
                        placeholder="Enter email"
                        fontSize="xs"
                        readOnly={false}
                        value={email.email}
                        onChange={(e) =>
                          setEmail((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Confirmation Email
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter confirmation email "
                        fontSize="xs"
                        readOnly={false}
                        value={email.confirmationEmail}
                        onChange={(e) =>
                          setEmail((prev) => ({
                            ...prev,
                            confirmationEmail: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={{ sm: "24px", lg: "24px" }}>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Phone Number
                      </FormLabel>
                      <Input
                        type="number"
                        variant="main"
                        placeholder="Enter Phone number"
                        fontSize="xs"
                        readOnly={false}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Address
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter Address"
                        fontSize="xs"
                        value={location.address}
                        onChange={(e) =>
                          setLocation((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        City
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter city"
                        fontSize="xs"
                        value={location.city}
                        onChange={(e) =>
                          setLocation((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
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
                        value={location.state}
                        onChange={(e) =>
                          setLocation((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
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
                        cursor="pointer"
                        variant="main"
                        color="gray.400"
                        fontSize="xs"
                        isReadOnly={false}
                        value={language}
                        onChange={(e) => setLangage(e.target.value)}
                      >
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Romanian">Romanian</option>
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
                          readOnly={false}
                        />
                      </Flex>
                    </FormControl>
                  </Stack>
                </Stack>
                <Flex justify="end" mt="18px">
                  <Button
                    onClick={updateProfile}
                    variant="dark"
                    w="150px"
                    h="35px"
                    alignSelf="flex-end"
                  >
                    {isLoading ? <Spinner w="18px" h="18px" /> : "UPDATE"}
                  </Button>
                </Flex>
              </CardBody>
            </Element>
          </Card>
          <Card
            w={{ sm: "100%", lg: "100%" }}
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            <Element id="change-password" name="change-password">
              <UpdatePassword />
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
            mb="10px"
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
