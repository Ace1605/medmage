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
  Checkbox,
  Flex,
  Grid,
  Icon,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";

// Custom icons
import {
  DocumentIcon,
  RocketIcon,
  SettingsIcon,
} from "components/Icons/Icons.js";
import Pagination from "components/Pagination/Pagination";
import TablesTableRow from "components/Tables/TablesTableRow";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import { tablesTableData } from "variables/general";

export default function Default() {
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardColor = useColorModeValue("gray.800", "navy.800");
  const bgBox = useColorModeValue("gray.800", "blue.500");

  const { colorMode } = useColorMode();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 5 }} spacing="24px" mb="30px">
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Countries
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    3,897
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +3.48%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  States
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    200
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Medical Institutions
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    +2,503
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="red.500" fontWeight="bold">
                -2.82%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Patients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    17,000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +8.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Medical Personnel
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    3000
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>

      <Grid
        templateColumns={{ sm: "1fr", xl: "1fr 1fr" }}
        templateRows={{ xl: "auto auto" }}
        maxW={{ sm: "1fr" }}
        gap="20px"
        mb="10px"
      >
        {/* <Card>
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="14px">
              Pending task
            </Text>
            <Stack
              direction="column"
              spacing="14px"
              height={{ sm: "300px", xl: "436px" }}
              overflowY={{ sm: "scroll", xl: "scroll" }}
              sx={{
                "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
                "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                "scrollbar-width": "none", // Hide scrollbar in Firefox
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor={borderColor}
                py="12px"
              >
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Call with Dave
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    09:30 AM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" defaultChecked size="lg" />
              </Flex>
              <Flex
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor={borderColor}
                py="12px"
              >
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Brunch Meeting
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    11:00 AM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" size="lg" />
              </Flex>
              <Flex
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor={borderColor}
                pt="12px"
              >
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Argon Dashboard Launch
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    02:00 PM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" size="lg" />
              </Flex>
              <Flex
                borderBottom="1px solid"
                borderColor={borderColor}
                justify="space-between"
                align="center"
                py="14px"
              >
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Winter Hackaton
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    11:30 AM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" defaultChecked size="lg" />
              </Flex>
              <Flex
                borderBottom="1px solid"
                borderColor={borderColor}
                justify="space-between"
                align="center"
                py="14px"
              >
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Hackaton
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    11:30 AM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" defaultChecked size="lg" />
              </Flex>
              <Flex justify="space-between" align="center" py="14px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontWeight="bold"
                    fontSize="sm"
                    mb="3.5px"
                  >
                    Google meeet
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    11:30 AM
                  </Text>
                </Flex>
                <Checkbox colorScheme="blue" defaultChecked size="lg" />
              </Flex>
            </Stack>
          </Flex>
        </Card> */}

        {/* <Card>
          <CardHeader>
            <Text fontSize="lg" text={textColor} fontWeight="bold">
              Recent Activities
            </Text>
          </CardHeader>
          <CardBody w="100%" pt="28px">
            <Stack
              direction="column"
              spacing="24px"
              w="100%"
              height={{ sm: "300px", xl: "436px" }}
              overflowY={{ sm: "scroll", xl: "scroll" }}
              sx={{
                "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
                "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                "scrollbar-width": "none", // Hide scrollbar in Firefox
              }}
            >
              <Flex align="center" w="100%" py="14px">
                <Flex align="center">
                  <IconBox h={"40px"} w={"40px"} bg={bgBox} me="18px">
                    <RocketIcon h={"20px"} w={"20px"} color={iconBoxInside} />
                  </IconBox>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Devices
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      250 in stock,{" "}
                      <Text as="span" fontWeight="bold">
                        346+ sold
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Spacer />
                <Button variant="no-effects" px="0px">
                  <Icon
                    as={RiArrowDropRightLine}
                    color="gray.400"
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    transition="all .25s ease"
                    _hover={{ transform: "translateX(25%)" }}
                  />
                </Button>
              </Flex>
              <Flex align="center" w="100%" py="14px">
                <Flex align="center">
                  <IconBox h={"40px"} w={"40px"} bg={bgBox} me="18px">
                    <SettingsIcon h={"20px"} w={"20px"} color={iconBoxInside} />
                  </IconBox>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Tickets
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      123 closed,{" "}
                      <Text as="span" fontWeight="bold">
                        15 open
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Spacer />
                <Button variant="no-effects" px="0px">
                  <Icon
                    as={RiArrowDropRightLine}
                    color="gray.400"
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    transition="all .25s ease"
                    _hover={{ transform: "translateX(25%)" }}
                  />
                </Button>
              </Flex>
              <Flex align="center" w="100%" py="14px">
                <Flex align="center">
                  <IconBox h={"40px"} w={"40px"} bg={bgBox} me="18px">
                    <DocumentIcon h={"20px"} w={"20px"} color={iconBoxInside} />
                  </IconBox>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Error logs
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      1 is active,{" "}
                      <Text as="span" fontWeight="bold">
                        40 closed
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Spacer />
                <Button variant="no-effects" px="0px">
                  <Icon
                    as={RiArrowDropRightLine}
                    color="gray.400"
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    transition="all .25s ease"
                    _hover={{ transform: "translateX(25%)" }}
                  />
                </Button>
              </Flex>
              <Flex align="center" w="100%" py="14px">
                <Flex align="center">
                  <IconBox h={"40px"} w={"40px"} bg={bgBox} me="18px">
                    <Icon
                      as={FaUser}
                      h={"20px"}
                      w={"20px"}
                      color={iconBoxInside}
                    />
                  </IconBox>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Happy Users
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      <Text as="span" fontWeight="bold">
                        +430
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Spacer />
                <Button variant="no-effects" px="0px">
                  <Icon
                    as={RiArrowDropRightLine}
                    color="gray.400"
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    transition="all .25s ease"
                    _hover={{ transform: "translateX(25%)" }}
                  />
                </Button>
              </Flex>
              <Flex align="center" w="100%" py="14px">
                <Flex align="center">
                  <IconBox h={"40px"} w={"40px"} bg={bgBox} me="18px">
                    <SettingsIcon h={"20px"} w={"20px"} color={iconBoxInside} />
                  </IconBox>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      Tickets
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      123 closed,{" "}
                      <Text as="span" fontWeight="bold">
                        15 open
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Spacer />
                <Button variant="no-effects" px="0px">
                  <Icon
                    as={RiArrowDropRightLine}
                    color="gray.400"
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    transition="all .25s ease"
                    _hover={{ transform: "translateX(25%)" }}
                  />
                </Button>
              </Flex>
            </Stack>
          </CardBody>
        </Card> */}
      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", xl: " 1fr" }}
        gap="20px"
        mt="10px"
        mb="20px"
      >
        {/* <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th pl="0px" borderColor={borderColor} color="gray.400">
                    Patient's Name
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Ward
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Status
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Date Admitted
                  </Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tablesTableData
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((row, index, arr) => {
                    return (
                      <React.Fragment key={index}>
                        <TablesTableRow
                          name={row.name}
                          logo={row.logo}
                          // email={row.email}
                          subdomain={row.subdomain}
                          domain={row.domain}
                          status={row.status}
                          date={row.date}
                          paddingY={"0px"}
                          isLast={index === arr.length - 1 ? true : false}
                        />
                      </React.Fragment>
                    );
                  })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Pagination
          totalCount={tablesTableData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
      </Grid>
    </Flex>
  );
}
