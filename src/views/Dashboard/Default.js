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
  Checkbox,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Grid,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  color,
} from "@chakra-ui/react";

// Custom icons
import EventCalendar from "components/Calendars/EventCalendar";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { ClockIcon, DocumentIcon, WalletIcon } from "components/Icons/Icons";
import { FaPalette, FaShip } from "react-icons/fa";
import { calendarDataCalendar } from "variables/calendar";
import dayjs from "dayjs";

export default function Default() {
  // Chakra Color Mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const calendarTextColor = useColorModeValue("gray.700", "white");
  const calenderIconBlue = useColorModeValue("blue.500", "white");
  const iconBoxColor = useColorModeValue("gray.100", "blue.500");

  const today = new Date();

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

      <Flex direction="column">
        <Grid templateColumns={{ sm: "1fr", lg: "2fr 1fr" }} gap="24px">
          <Card minH="570px">
            <CardHeader mb="6px">
              <Flex direction="column">
                <Text
                  color={calendarTextColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="6px"
                >
                  Calendar
                </Text>
                <Text color="gray.400" fontSize="sm" fontWeight="normal">
                  {dayjs(today).format("DD MMM, YYYY")}
                </Text>
              </Flex>
            </CardHeader>
            <CardBody position="relative" display="block" height="100%">
              <EventCalendar
                initialDate="2022-10-01"
                calendarData={calendarDataCalendar}
              />
            </CardBody>
          </Card>
          <Stack
            direction={{ sm: "column", md: "row", lg: "column" }}
            spacing="24px"
          >
            <Card>
              <CardHeader>
                <Text
                  color={calendarTextColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="28px"
                >
                  Upcoming events
                </Text>
              </CardHeader>
              <CardBody>
                <Stack
                  direction="column"
                  spacing="20px"
                  height={{ sm: "300px", md: "230px", lg: "150px" }}
                  overflowY={{ sm: "scroll", xl: "scroll" }}
                  sx={{
                    "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
                    "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                    "scrollbar-width": "none", // Hide scrollbar in Firefox
                  }}
                >
                  <Flex align="center">
                    <IconBox h={"50px"} w={"50px"} bg={iconBoxColor} me="16px">
                      <Icon
                        as={WalletIcon}
                        h={"22px"}
                        w={"22px"}
                        color={calenderIconBlue}
                      />
                    </IconBox>
                    <Flex direction="column">
                      <Text
                        color={calendarTextColor}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Polio awareness week
                      </Text>
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        27 March 2020, at 12:30 PM
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center">
                    <IconBox h={"50px"} w={"50px"} bg={iconBoxColor} me="16px">
                      <Icon
                        as={ClockIcon}
                        h={"22px"}
                        w={"22px"}
                        color={calenderIconBlue}
                      />
                    </IconBox>
                    <Flex direction="column">
                      <Text
                        color={calendarTextColor}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Health Talk
                      </Text>
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        22 March 2020, at 10:00 PM
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center">
                    <IconBox h={"50px"} w={"50px"} bg={iconBoxColor} me="16px">
                      <Icon
                        as={DocumentIcon}
                        h={"22px"}
                        w={"22px"}
                        color={calenderIconBlue}
                      />
                    </IconBox>
                    <Flex direction="column">
                      <Text
                        color={calendarTextColor}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Book Deposit Hall
                      </Text>
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        25 March 2022, at 9:30 AM
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center">
                    <IconBox h={"50px"} w={"50px"} bg={iconBoxColor} me="16px">
                      <Icon
                        as={FaShip}
                        h={"22px"}
                        w={"22px"}
                        color={calenderIconBlue}
                      />
                    </IconBox>
                    <Flex direction="column">
                      <Text
                        color={calendarTextColor}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Medical shipment
                      </Text>
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        25 March 2022, at 2:00 PM
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center" mb="22px">
                    <IconBox h={"50px"} w={"50px"} bg={iconBoxColor} me="16px">
                      <Icon
                        as={FaPalette}
                        h={"22px"}
                        w={"22px"}
                        color={calenderIconBlue}
                      />
                    </IconBox>
                    <Flex direction="column">
                      <Text
                        color={calendarTextColor}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Sickle cell awarness
                      </Text>
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        26 March 2022, at 9:00 AM
                      </Text>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="14px"
                >
                  To Do List
                </Text>
                <Stack
                  direction="column"
                  spacing="14px"
                  height={{ sm: "300px", md: "230px" }}
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
                        Call with Kev
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
                        Meeting with Ministry of health
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
                        Launch with the team
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
                        Google meet
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        11:30 AM
                      </Text>
                    </Flex>
                    <Checkbox colorScheme="blue" defaultChecked size="lg" />
                  </Flex>
                </Stack>
              </Flex>
            </Card>
          </Stack>
        </Grid>
      </Flex>
    </Flex>
  );
}
