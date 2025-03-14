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

import React, { useState } from "react";

// NEW imports

import {
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  useColorMode,
  FormLabel,
  Input,
  Select,
  Button,
  FormControl,
} from "@chakra-ui/react";
import bgCardReports from "assets/img/background-card-reports.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { FaUser } from "react-icons/fa";
import UsersTable from "components/Tables/UsersTable";
import { Userscolumns } from "variables/columnsData";
import usersData from "variables/usersData.json";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { BiPlus } from "react-icons/bi";

function NewUser() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("white", "black");

  const { colorMode } = useColorMode();

  const [addUser, setAddUser] = useState(false);

  const userRoles = [
    { key: "Super Admin", value: "super admin" },
    { key: "State Admin", value: "state admin" },
    {
      key: "Institution Administrative Staff",
      value: "institution administrative staff",
    },
    { key: "Doctor", value: "doctor" },
    { key: "Nurse", value: "nurse" },
  ];

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Grid templateColumns={{ md: "1fr" }} gap="24px" mb="26px">
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap="24px">
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      1600
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Users Active
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +55%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      357
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Inactive users
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +124%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </Grid>

      <Card px="0px">
        <CardHeader px="22px">
          <Flex
            mb="10px"
            alignItems="center"
            justifyContent="space-between"
            pe="8px"
            px="24px"
          >
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Users
            </Text>{" "}
            <Button
              px="10px"
              fontSize="12px"
              colorScheme="blue"
              fontWeight="bold"
              w="fit"
              h="35"
              onClick={() => setAddUser(true)}
            >
              Add user
              <Icon
                as={BiPlus}
                w="24px"
                h="24px"
                color={iconColor}
                cursor="pointer"
              />
            </Button>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          <UsersTable tableData={usersData} columnsData={Userscolumns} />
        </CardBody>
      </Card>

      {addUser && (
        <Modal
          label="Invite New User"
          handleCloseModal={() => setAddUser(false)}
        >
          <FormControl>
            <FormLabel ms="4px" mt="8px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Enter user's email address"
              mb="24px"
              size="lg"
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Role
            </FormLabel>
            <Select
              variant="main"
              _selected={userRoles[0].key}
              color="gray.400"
              isReadOnly
              fontSize="sm"
              ms="4px"
              type="email"
              mb="24px"
              size="lg"
              cursor="pointer"
            >
              {userRoles.map(({ key, value }, i) => {
                return (
                  <option key={i} value={value} style={{ cursor: "pointer" }}>
                    {key}
                  </option>
                );
              })}
            </Select>

            <Button
              fontSize="16px"
              colorScheme="blue"
              fontWeight="bold"
              w="100%"
              h="50"
              mb="10px"
              onClick={() => {
                setAddUser(false);
                toast.success("New user invited successfully");
              }}
            >
              Invite
            </Button>
          </FormControl>
        </Modal>
      )}
    </Flex>
  );
}

export default NewUser;
