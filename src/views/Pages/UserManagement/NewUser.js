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
// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   GridItem,
//   Icon,
//   Input,
//   Stack,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
//   Textarea,
//   useColorModeValue,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Box,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/Card/Card";
// import CardBody from "components/Card/CardBody";
// import CardHeader from "components/Card/CardHeader";
// // Assets
// import { BsCircleFill } from "react-icons/bs";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { toast } from "sonner";

// NEW imports

import {
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import bgCardReports from "assets/img/background-card-reports.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { CartIcon, RocketIcon } from "components/Icons/Icons";
import TablesReportsRow from "components/Tables/TablesReportsRow";
import { AiFillLike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { tablesReportsData } from "variables/general";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { BsPlusCircleFill } from "react-icons/bs";
import Pagination from "components/Pagination/Pagination";

function NewUser() {
  // const textColor = useColorModeValue("gray.700", "white");
  // const bgTextarea = useColorModeValue("white", "navy.900");
  // const borderColor = useColorModeValue("gray.200", "transparent");
  // const placeholderColor = useColorModeValue("gray.300", "gray.400");
  // const selectColor = useColorModeValue("gray.700", "white");
  // let menuBg = useColorModeValue("white", "navy.800");
  // const [activeBullets, setActiveBullets] = useState({
  //   userInfo: true,
  //   address: false,
  //   profile: false,
  // });

  // const userInfoTab = useRef();
  // const addressTab = useRef();
  // const profileTab = useRef();

  // const userRoles = [
  //   { key: "Super Admin", value: "super admin" },
  //   { key: "State Admin", value: "state admin" },
  //   {
  //     key: "Institution Administrative Staff",
  //     value: "institution administrative staff",
  //   },
  //   { key: "Doctor", value: "doctor" },
  //   { key: "Nurse", value: "nurse" },
  //   { key: "Pharmacist", value: "pharmacist" },
  //   { key: "Medical Assistant", value: "medical assistant" },
  // ];

  // const [selected, setSelected] = useState(userRoles[0].key);
  // const [userInfo, setUserInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   emailAddress: "",
  //   phoneNumber: "",
  //   providersName: "",
  //   permissions: selected,
  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  // });

  // const handledCreateUser = () => {
  //   toast.success("User created successfully");
  //   userInfoTab.current.click();

  //   setUserInfo({
  //     firstName: "",
  //     lastName: "",
  //     emailAddress: "",
  //     phoneNumber: "",
  //     providersName: "",
  //     permissions: selected, // Ensure `selected` is defined
  //     address: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //   });
  // };

  // const handleonChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const disabledButton = Object.entries(userInfo)
  //   .slice(0, 5)
  //   .some(([_, value]) => !value);
  // const disabledAddressButton = Object.entries(userInfo)
  //   .slice(7)
  //   .some(([_, value]) => !value);

  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("blue.900", "blue.500");
  const bgProgress = useColorModeValue("gray.200", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Grid templateColumns={{ md: "1fr" }} gap="24px" mb="24px">
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

      <Card>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            ps="10px"
            color="gray.400"
            fontSize="20px"
            fontWeight="bold"
            borderColor={borderColor}
          >
            Users
          </Text>
          <Flex alignItems="center" gap="5px" justifyContent="between">
            <Text
              fontSize="17px"
              fontWeight="semibold"
              color="gray.400"
              borderColor={borderColor}
            >
              Add user
            </Text>
            <IconBox cursor="pointer" w="35px" h="30px">
              <Icon as={BsPlusCircleFill} w="25px" h="25px" color="blue.600" />
            </IconBox>
          </Flex>
        </Flex>
        <CardBody overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" color="gray.400">
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Id
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Name
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Email
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Role
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Created
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Created By
                </Th>
                <Th color="gray.400" ps="0px" borderColor={borderColor}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody pb="0px">
              {tablesReportsData
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((row, index, arr) => {
                  return (
                    <TablesReportsRow
                      id={row.id}
                      name={row.name}
                      email={row.email}
                      role={row.role}
                      dateCreated={row.dateCreated}
                      createdBy={row.createdBy}
                      isLast={index === arr.length - 1 ? true : false}
                      key={index}
                    />
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Pagination
        totalCount={tablesReportsData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Flex>
  );
}

export default NewUser;
