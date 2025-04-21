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
  Tooltip,
  Avatar,
  Box,
  Skeleton,
  Button,
} from "@chakra-ui/react";

// Custom icons
import EventCalendar from "components/Calendars/EventCalendar";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { calendarDataCalendar } from "variables/calendar";
import dayjs from "dayjs";
import { useGetAllTodos } from "hooks/api/management/todo/useGetAllTodos";
import { useContext } from "react";
import { AppContext } from "contexts/AppContext";
import { BiCalendar } from "react-icons/bi";
import moment from "moment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetAllEvents } from "hooks/api/management/events/useGetAllEvents";
import { MdEventAvailable } from "react-icons/md";

import { BsCalendarX, BsClipboard2X } from "react-icons/bs";
export default function Default() {
  const naviagte = useNavigate();
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const calendarTextColor = useColorModeValue("gray.700", "white");
  const calenderIconBlue = useColorModeValue("blue.500", "white");
  const iconBoxColor = useColorModeValue("gray.100", "blue.500");

  const today = new Date();
  const { token } = useContext(AppContext);

  const { data, error, isLoading } = useGetAllTodos(token);
  if (error) toast.error("Unable to fecth todos, please refresh");
  const slicedTodos = data ? data?.slice(0, 10) : [];
  const {
    data: eventsData,
    error: eventsError,
    isLoading: loadingEvents,
  } = useGetAllEvents(token);
  if (eventsError) toast.error("Unable to fecth events, please refresh");

  const filteredEvents = eventsData
    ? eventsData
        ?.filter(
          (event) =>
            dayjs(event.start_datetime).valueOf() > dayjs(today).valueOf()
        )
        .slice(0, 10)
    : [];
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
              {loadingEvents ? (
                <Box p={2}>
                  <Skeleton
                    borderRadius="md"
                    height={{ sm: "300px", md: "230px" }}
                    isLoaded={!loadingEvents}
                  />
                </Box>
              ) : (
                <>
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
                    {filteredEvents.length < 1 ? (
                      <Box>
                        <Flex
                          height={{ sm: "200px", md: "180px" }}
                          justifyContent="center"
                          alignItems="center"
                          direction="column"
                          gap="20px"
                        >
                          <Icon
                            color="gray.400"
                            as={BsCalendarX}
                            w="70px"
                            h="70px"
                          />
                          <Text
                            fontSize={{ sm: "16px", md: "18px", lg: "19px" }}
                            fontWeight="600"
                            textAlign="center"
                            color="gray.400"
                          >
                            You have no upcoming event(s)
                          </Text>
                        </Flex>
                      </Box>
                    ) : (
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
                        {filteredEvents.map((event) => {
                          return (
                            <Flex align="center">
                              <IconBox
                                h={"50px"}
                                w={"50px"}
                                bg={iconBoxColor}
                                me="16px"
                              >
                                <Icon
                                  as={MdEventAvailable}
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
                                  {event.title}
                                </Text>
                                <Text
                                  color="gray.400"
                                  fontSize="sm"
                                  fontWeight="normal"
                                >
                                  {`${dayjs(event.start_datetime).format(
                                    "DD MMM YYYY"
                                  )} at ${dayjs(event.start_datetime).format(
                                    "hh:mm A"
                                  )}`}
                                </Text>
                              </Flex>
                            </Flex>
                          );
                        })}
                        <Flex gap="12px" alignItems="center" j>
                          <Button
                            onClick={() => naviagte("/admin/management/events")}
                            fontSize="14px"
                            fontWeight="normal"
                            cursor="pointer"
                            variant="outlined"
                            w="full"
                            h="40px"
                            borderWidth="2px"
                          >
                            View all
                          </Button>
                        </Flex>
                      </Stack>
                    )}
                  </CardBody>
                </>
              )}
            </Card>

            <Card>
              <Flex direction="column">
                {isLoading ? (
                  <Box p={2}>
                    <Skeleton
                      borderRadius="md"
                      height={{ sm: "300px", md: "230px" }}
                      isLoaded={!isLoading}
                    />
                  </Box>
                ) : (
                  <>
                    <Text
                      color={textColor}
                      fontSize="lg"
                      fontWeight="bold"
                      mb="14px"
                    >
                      To Do List
                    </Text>
                    {slicedTodos.length < 1 ? (
                      <Box>
                        <Flex
                          height={{ sm: "230px", md: "200px" }}
                          justifyContent="center"
                          alignItems="center"
                          direction="column"
                          gap="20px"
                        >
                          <Icon
                            color="gray.400"
                            as={BsClipboard2X}
                            w="80px"
                            h="80px"
                          />
                          <Text
                            fontSize={{ sm: "16px", md: "18px", lg: "19px" }}
                            fontWeight="600"
                            textAlign="center"
                            color="gray.400"
                          >
                            You currently have no tasks
                          </Text>
                        </Flex>
                      </Box>
                    ) : (
                      <Stack
                        pb="10px"
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
                        {slicedTodos.map((todo, i) => {
                          const isLast = i === slicedTodos.length - 1;
                          return (
                            <Flex
                              key={todo.id}
                              justify="space-between"
                              align="center"
                              borderBottom={!isLast ? "1px solid" : "none"}
                              borderColor={borderColor}
                              py="12px"
                              px="4px"
                            >
                              <Flex direction="column">
                                <Text
                                  color={textColor}
                                  fontWeight="bold"
                                  fontSize="md"
                                  mb="3.5px"
                                >
                                  {todo.title}
                                </Text>

                                <Flex alignItems="center" gap="8px">
                                  <BiCalendar color="#A0AEC0" />
                                  <Text color="gray.400" fontSize="sm">
                                    {moment(todo.due_date).format("YYYY-MM-DD")}
                                  </Text>

                                  <Tooltip
                                    label={`${todo.assigned_to.first_name} ${todo.assigned_to.last_name}`}
                                    hasArrow
                                  >
                                    <Avatar
                                      name={`${todo.assigned_to.first_name} ${todo.assigned_to.last_name}`}
                                      size="xs"
                                      cursor="pointer"
                                    />
                                  </Tooltip>
                                </Flex>
                              </Flex>

                              <Box as="button" cursor="pointer">
                                <Checkbox
                                  colorScheme="blue"
                                  defaultChecked={todo.is_completed}
                                  size="lg"
                                />
                              </Box>
                            </Flex>
                          );
                        })}
                        <Flex gap="12px" alignItems="center" j>
                          <Button
                            onClick={() => naviagte("/admin/management/todos")}
                            fontSize="14px"
                            fontWeight="normal"
                            cursor="pointer"
                            variant="outlined"
                            w="full"
                            h="40px"
                            borderWidth="2px"
                          >
                            View all
                          </Button>
                        </Flex>
                      </Stack>
                    )}
                  </>
                )}
              </Flex>
            </Card>
          </Stack>
        </Grid>
      </Flex>
    </Flex>
  );
}
