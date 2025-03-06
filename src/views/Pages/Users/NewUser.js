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

import React, { useRef, useState } from "react";

// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
// Assets
import { BsCircleFill } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";

function NewUser() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgTextarea = useColorModeValue("white", "navy.900");
  const borderColor = useColorModeValue("gray.200", "transparent");
  const placeholderColor = useColorModeValue("gray.300", "gray.400");
  const selectColor = useColorModeValue("gray.700", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const [activeBullets, setActiveBullets] = useState({
    userInfo: true,
    address: false,
    profile: false,
  });

  const userInfoTab = useRef();
  const addressTab = useRef();
  const profileTab = useRef();

  const userRoles = [
    { key: "Super Admin", value: "super admin" },
    { key: "State Admin", value: "state admin" },
    {
      key: "Institution Administrative Staff",
      value: "institution administrative staff",
    },
    { key: "Doctor", value: "doctor" },
    { key: "Nurse", value: "nurse" },
    { key: "Pharmacist", value: "pharmacist" },
    { key: "Medical Assistant", value: "medical assistant" },
  ];

  const [selected, setSelected] = useState(userRoles[0].key);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    providersName: "",
    permissions: selected,
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const disabledButton = Object.entries(userInfo)
    .slice(0, 5)
    .some(([_, value]) => !value);
  const disabledAddressButton = Object.entries(userInfo)
    .slice(7)
    .some(([_, value]) => !value);

  return (
    <Flex
      direction="column"
      minH="89vh"
      align="center"
      pt={{ sm: "90px", md: "60px" }}
    >
      <Tabs
        variant="unstyled"
        mt="24px"
        maxW={{ sm: "300px", md: "800px" }}
        w={{ sm: "100%", md: "100%" }}
      >
        <TabList display="flex" align="center" justifyContent="center">
          <Tab ref={userInfoTab} _focus={{}} w={{ sm: "80px", md: "200px" }}>
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "80px", md: "200px" },
                height: "3px",
                bg: activeBullets.address ? "white" : "blue.300",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.userInfo ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.userInfo ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.userInfo ? "white" : "blue.300"}
                w={activeBullets.userInfo ? "16px" : "12px"}
                h={activeBullets.userInfo ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.userInfo ? "white" : "blue.300"}
                fontWeight={activeBullets.userInfo ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                User Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            isDisabled={disabledButton}
            ref={addressTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "80px", md: "200px" },
                height: "3px",
                bg: activeBullets.profile ? "white" : "blue.300",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.address ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.address ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.address ? "white" : "blue.300"}
                w={activeBullets.address ? "16px" : "12px"}
                h={activeBullets.address ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.address ? "white" : "gray.300"}
                fontWeight={activeBullets.address ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: "white" }}
                display={{ sm: "none", md: "block" }}
              >
                Address
              </Text>
            </Flex>
          </Tab>
          <Tab
            isDisabled={disabledAddressButton}
            ref={profileTab}
            _focus={{}}
            w={{ sm: "80px", md: "200px" }}
          >
            <Flex direction="column" justify="center" align="center">
              <Icon
                zIndex="1"
                as={BsCircleFill}
                color={activeBullets.profile ? "white" : "blue.300"}
                w={activeBullets.profile ? "16px" : "12px"}
                h={activeBullets.profile ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.profile ? "white" : "gray.300"}
                fontWeight={activeBullets.profile ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: "white" }}
                display={{ sm: "none", md: "block" }}
              >
                Profile
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="3px"
                  >
                    Invite New User
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Grid
                    templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                    templateRows={{ md: "repeat(2, 1fr)" }}
                    gap="24px"
                  >
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        First Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter new user's first name"
                        fontSize="xs"
                        name="firstName"
                        onChange={handleonChange}
                        value={userInfo.firstName}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Last Name
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter new user's last name"
                        fontSize="xs"
                        name="lastName"
                        onChange={handleonChange}
                        value={userInfo.lastName}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Email address
                      </FormLabel>
                      <Input
                        variant="main"
                        type="email"
                        placeholder="Enter email address"
                        fontSize="xs"
                        name="emailAddress"
                        onChange={handleonChange}
                        value={userInfo.emailAddress}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Phone Number
                      </FormLabel>
                      <Input
                        type="number"
                        variant="main"
                        placeholder="Enter Phone number"
                        fontSize="xs"
                        name="phoneNumber"
                        onChange={handleonChange}
                        value={userInfo.phoneNumber}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Provider
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter Provider's name"
                        fontSize="xs"
                        name="providersName"
                        onChange={handleonChange}
                        value={userInfo.providersName}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Permissions
                      </FormLabel>
                      <Menu>
                        <MenuButton
                          as={Button}
                          colorScheme=""
                          color={selectColor}
                          textAlign="start"
                          w={"80%"}
                          fontSize="sm"
                          shadow="md"
                          border={borderColor}
                          rightIcon={<ChevronDownIcon />}
                        >
                          {selected}
                        </MenuButton>

                        <MenuList
                          p="16px 8px"
                          bg={menuBg}
                          h="170px"
                          overflowY="scroll"
                          sx={{
                            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
                            "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                            "scrollbar-width": "none", // Hide scrollbar in Firefox
                          }}
                        >
                          <Flex flexDirection="column">
                            {userRoles.map(({ key }, i) => {
                              return (
                                <MenuItem
                                  onClick={() => setSelected(key)}
                                  key={i}
                                  borderRadius="8px"
                                  mb="10px"
                                >
                                  <Text
                                    fontWeight="semibold"
                                    fontSize="14px"
                                    mb="5px"
                                    color={selectColor}
                                  >
                                    {key}
                                  </Text>
                                </MenuItem>
                              );
                            })}
                          </Flex>
                        </MenuList>
                      </Menu>
                    </FormControl>
                  </Grid>
                  <Button
                    variant="dark"
                    alignSelf="flex-end"
                    mt="24px"
                    w="100px"
                    h="35px"
                    disabled={disabledButton}
                    _hover="none"
                    onClick={() => {
                      setActiveBullets({
                        userInfo: true,
                        address: true,
                        profile: false,
                      });
                      addressTab.current.click();
                    }}
                  >
                    NEXT
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Address
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px">
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Address
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter provider's address"
                        fontSize="xs"
                        name="address"
                        onChange={handleonChange}
                        value={userInfo.address}
                      />
                    </FormControl>

                    <Grid
                      templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr" }}
                      gap="30px"
                    >
                      <FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          City
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder=""
                          fontSize="xs"
                          name="city"
                          onChange={handleonChange}
                          value={userInfo.city}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          State
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="..."
                          fontSize="xs"
                          name="state"
                          onChange={handleonChange}
                          value={userInfo.state}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          Country
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder=""
                          fontSize="xs"
                          name="country"
                          onChange={handleonChange}
                          value={userInfo.country}
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="light"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => {
                        setActiveBullets({
                          userInfo: true,
                          address: false,
                          profile: false,
                        });
                        userInfoTab.current.click();
                      }}
                    >
                      PREV
                    </Button>
                    <Button
                      variant="dark"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      isDisabled={disabledAddressButton}
                      onClick={() => {
                        setActiveBullets({
                          userInfo: true,
                          address: true,
                          profile: true,
                        });
                        profileTab.current.click();
                      }}
                    >
                      NEXT
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Confirm Information
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="24px">
                    <Grid
                      templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
                      templateRows={{ md: "repeat(3, 1fr)" }}
                      gap="14px"
                    >
                      {Object.entries(userInfo).map(([key, value], i) => (
                        <GridItem
                          key={key}
                          colSpan={i === 6 ? { sm: 1, md: 3 } : 1} // Address takes full width
                        >
                          <Box p={3}>
                            <Text fontWeight="bold">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (char) => char.toUpperCase())}
                            </Text>
                            <Text
                              p={2}
                              borderBottom="1px solid"
                              borderColor="#e2e8f0"
                              borderRadius="sm"
                            >
                              {value || "N/A"}
                            </Text>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="light"
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => {
                        setActiveBullets({
                          userInfo: true,
                          address: true,
                          profile: false,
                        });
                        addressTab.current.click();
                      }}
                    >
                      PREV
                    </Button>
                    <Button variant="primary" mt="24px" w="100px" h="35px">
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        Create
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default NewUser;
