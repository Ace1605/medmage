import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { DateTimeRangePicker } from "components/CustomDateTimePicker/CustomDateTimeRangePicker";
import Modal from "components/Modal/Modal";
import { AppContext } from "contexts/AppContext";
import dayjs from "dayjs";
import { useDeleteEventById } from "hooks/api/management/events/useDeleteEventById";
import { useGetEventById } from "hooks/api/management/events/useGetEventById";
import { useUpdateEventById } from "hooks/api/management/events/useUpdateEventId";
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "sonner";

function EventsTable(props) {
  const { tableData, refetchEvents } = props;
  const queryClient = useQueryClient();
  const [editEvent, setEditEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { token, user, providers } = useContext(AppContext);
  const { data: eventData, error, isLoading } = useGetEventById(
    token,
    selectedEvent?.id
  );

  useEffect(() => {
    if (error) {
      setEditEvent(false);
      toast.error("Unable to get event");
    }
  }, [error]);

  const { handleUpdateEventById, isLoading: isEditing } = useUpdateEventById(
    token
  );
  const { handleDeleteEventById, isLoading: isDeleting } = useDeleteEventById(
    token
  );

  const [event, setEvent] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  useEffect(() => {
    if (eventData?.data) {
      setEvent({
        title: eventData?.data?.title,
        description: eventData?.data?.description,
        isCompleted: eventData?.data?.is_completed,
      });

      setStartDateTime(moment(eventData?.data?.start_datetime));
      setEndDateTime(moment(eventData?.data?.end_datetime));
    }
  }, [eventData]);

  useEffect(() => {
    console.log(event.isCompleted);
    console.log("event", selectedEvent);
  }, [editEvent]);

  const columns = useMemo(() => {
    return [
      {
        Header: "TITLE",
        accessor: "title",
      },
      {
        Header: "DATE",
        Cell: ({ row }) => {
          const date = row.original.start_datetime;
          return (
            <div style={{ width: "80px" }}>
              <span>{dayjs(date).format("YYYY-MM-DD")}</span>
            </div>
          );
        },
      },
      {
        Header: "TIME",

        Cell: ({ row }) => {
          const startTime = row.original.start_datetime;
          const endTime = row.original.end_datetime;
          return (
            <Text color={textColor}>
              {`${dayjs(startTime).format("hh:mm A")} - ${dayjs(endTime).format(
                "hh:mm A"
              )}`}
            </Text>
          );
        },
      },
      {
        Header: "ORGANIZER",
        Cell: ({ row }) => {
          const firstName = row.original.user.first_name;
          const LastName = row.original.user.last_name;
          return <Text color={textColor}>{`${firstName} ${LastName}`}</Text>;
        },
      },
      {
        Header: "STATUS",
        Cell: ({ row }) => {
          const { is_completed } = row.original;
          return (
            <div style={{ color: is_completed ? "#48bb78" : "#FF3B30" }}>
              {is_completed ? "Completed" : "Incomplete"}
            </div>
          );
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        sortType: false,
        Cell: ({ row }) => {
          const textColor = useColorModeValue("blue.600", "white");
          return (
            <Flex gap="16px" alignItems="center">
              <Icon
                as={EditIcon}
                w="18px"
                h="18px"
                color={textColor}
                cursor="pointer"
                onClick={() => {
                  setSelectedEvent(row.original);
                  setEditEvent(true);
                }}
              />
              <Icon
                as={DeleteIcon}
                w="18px"
                h="18px"
                color="red.400"
                cursor="pointer"
                onClick={() => {
                  setSelectedEvent(row.original);
                  setDeleteEvent(true);
                }}
              />
            </Flex>
          );
        },
      },
    ];
  }, []);

  const data = useMemo(() => tableData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = tableInstance;

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize = 10, globalFilter } = state;

  const textColor = useColorModeValue("gray.600", "white");
  return (
    <>
      <Flex direction="column" w="100%">
        <Flex justify="space-between" align="center" w="100%" px="22px">
          <Input
            variant="main"
            type="text"
            placeholder="Search..."
            minW="75px"
            maxW="175px"
            fontSize="sm"
            _focus={{ borderColor: "blue.500" }}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </Flex>

        <Flex overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="24px"
          >
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      key={index}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe="0px"
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {column.render("Header")}
                        {column.id !== "action" && (
                          <Icon
                            w={{ sm: "10px", md: "14px" }}
                            h={{ sm: "10px", md: "14px" }}
                            color={columns.isSorted ? "gray.500" : "gray.400"}
                            float="right"
                            as={
                              column.isSorted
                                ? column.isSortedDesc
                                  ? TiArrowSortedDown
                                  : TiArrowSortedUp
                                : TiArrowUnsorted
                            }
                          />
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      return (
                        <Td
                          color={textColor}
                          {...cell.getCellProps()}
                          fontSize={{ sm: "14px" }}
                          key={index}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="100%"
          px={{ md: "22px" }}
        >
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="normal"
            mb={{ sm: "14px", md: "0px" }}
          >
            Showing {pageSize * pageIndex + 1} to{" "}
            {pageSize * (pageIndex + 1) <= tableData.length
              ? pageSize * (pageIndex + 1)
              : tableData.length}{" "}
            of {tableData.length} entries
          </Text>
          <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
            <Button
              variant="no-effects"
              onClick={() => previousPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              isDisabled={pageIndex === 0}
              _hover={{
                bg: "gray.200",
                opacity: "0.7",
                borderColor: "gray.500",
              }}
            >
              <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
            </Button>
            {createPages(pageCount).map((pageNumber, index) => {
              return (
                <Button
                  variant="no-effects"
                  transition="all .5s ease"
                  onClick={() => gotoPage(pageNumber - 1)}
                  w="40px"
                  h="40px"
                  borderRadius="8px"
                  bg={pageNumber === pageIndex + 1 ? "blue.500" : "#fff"}
                  border={
                    pageNumber === pageIndex + 1
                      ? "none"
                      : "1px solid lightgray"
                  }
                  _hover={{
                    opacity: "0.7",
                    borderColor: "gray.500",
                  }}
                  key={index}
                >
                  <Text
                    fontSize="sm"
                    color={pageNumber === pageIndex + 1 ? "#fff" : "gray.600"}
                  >
                    {pageNumber}
                  </Text>
                </Button>
              );
            })}
            <Button
              variant="no-effects"
              onClick={() => nextPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              isDisabled={pageIndex + 1 === pageCount}
              _hover={{
                bg: "gray.200",
                opacity: "0.7",
                borderColor: "gray.500",
              }}
            >
              <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
            </Button>
          </Stack>
        </Flex>
      </Flex>
      {deleteEvent && (
        <Modal
          maxWidth={"500px"}
          handleCloseModal={() => {
            setSelectedEvent(null);
            setDeleteEvent(false);
          }}
        >
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize={{ sm: "18px", lg: "20px" }}
            textAlign="center"
            mt="10px"
            mb="10px"
          >
            Are you sure you want to delete this event?
          </Text>
          <Text
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="16px"
            fontSize={{ sm: "16px", lg: "18px" }}
          >
            This action cannot be undone
          </Text>

          <Text
            color={textColor}
            fontWeight="semibold"
            textAlign="center"
            mb="16px"
            fontSize={{ sm: "16px" }}
          >
            {`Event title: ${selectedEvent?.title}`}
          </Text>

          <Flex
            alignItems="center"
            justifyContent="space-evenly"
            gap="15px"
            mt="30px"
            mb="10px"
          >
            <Button
              fontSize="16px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              px="30px"
              onClick={() => {
                setSelectedEvent(null);
                setDeleteEvent(false);
              }}
            >
              Cancel
            </Button>
            <Button
              fontSize="16px"
              colorScheme="blue"
              fontWeight="bold"
              w="100%"
              h="45"
              px="30px"
              onClick={() => {
                handleDeleteEventById(
                  selectedEvent?.id,
                  (res) => {
                    if (res.status === 200) {
                      setDeleteEvent(false);
                      refetchEvents();

                      toast.success("Event deleted successfully");
                      setSelectedEvent(null);
                    }
                  },
                  (err) => {
                    toast.error(
                      err?.response?.data?.message || "Something went wrong"
                    );
                  }
                );
              }}
            >
              {isDeleting ? <Spinner w="20px" h="20px" /> : "    Confirm"}
            </Button>
          </Flex>
        </Modal>
      )}
      {editEvent && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={eventData?.data ? `Edit: ${eventData?.data?.title}` : ""}
          handleCloseModal={() => {
            setSelectedEvent(null);
            setEditEvent(false);
          }}
        >
          {isLoading && (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="35px" h="35px" color="#3182ce" />
            </Flex>
          )}
          {eventData?.data && (
            <FormControl>
              <Box pb="15px">
                <Grid
                  templateColumns={{
                    base: "1fr",
                    sm: "1fr",
                  }}
                  gap="15px"
                  spacing={{ sm: "8px", lg: "30px" }}
                  w={{ sm: "100%", lg: null }}
                  my="18px"
                >
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Event Title
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter event title"
                      fontSize="xs"
                      value={event.title}
                      onChange={(e) =>
                        setEvent((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Description
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter description"
                      fontSize="xs"
                      value={event.description}
                      onChange={(e) => {
                        setEvent((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                    />
                  </FormControl>

                  <DateTimeRangePicker
                    startDateTime={startDateTime}
                    setStartDateTime={setStartDateTime}
                    endDateTime={endDateTime}
                    setEndDateTime={setEndDateTime}
                  />
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Status
                    </FormLabel>
                    <Select
                      cursor="pointer"
                      variant="main"
                      color="gray.400"
                      fontSize="xs"
                      value={event.isCompleted} // Convert boolean to string for Select value
                      onChange={(e) => {
                        setEvent((prev) => ({
                          ...prev,
                          isCompleted: e.target.value === "true",
                        }));
                      }}
                    >
                      <option value={true}>Completed</option>
                      <option value={false}>Not Completed</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>

              <Flex alignItems="center" gap="18px">
                {" "}
                <Button
                  fontSize="16px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="10px"
                  onClick={() => {
                    setEditEvent(false);
                    setSelectedEvent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fontSize="16px"
                  colorScheme="blue"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="10px"
                  onClick={() => {
                    handleUpdateEventById(
                      selectedEvent?.id,
                      {
                        title: event.title,
                        description: event.description,
                        is_completed: event.isCompleted,
                        user_id: user?.id,
                        provider_id: providers?.[0]?.id,
                        start_datetime: startDateTime
                          ? moment(startDateTime).format("YYYY-MM-DD HH:mm:ss")
                          : null,
                        end_datetime: endDateTime
                          ? moment(endDateTime).format("YYYY-MM-DD HH:mm:ss")
                          : null,
                      },
                      (res) => {
                        if (res.status === 200) {
                          setEditEvent(false);
                          refetchEvents();
                          queryClient.invalidateQueries([
                            "events",
                            selectedEvent?.id,
                          ]);
                          toast.success("Event updated successfully");
                        }
                      },
                      (err) => {
                        toast.error(
                          err?.response?.data?.message || "Something went wrong"
                        );
                      }
                    );
                  }}
                >
                  {isEditing ? <Spinner w="20px" h="20px" /> : " Confirm"}
                </Button>
              </Flex>
            </FormControl>
          )}
        </Modal>
      )}
    </>
  );
}

export default EventsTable;
