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
import Modal from "components/Modal/Modal";
import MultiSelect from "components/MultiSelect/MultiSelect";
import React, { useMemo, useState } from "react";
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
  const { options, tableData } = props;
  const [editEvent, setEditEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const columns = useMemo(() => {
    return [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "DATE",
        accessor: "dateCreated",
      },
      {
        Header: "TIME",
        accessor: "startTime",
        Cell: ({ row }) => {
          return (
            <Text color={textColor}>
              {`${row.original.startTime}-${row.original.endTime}`}
            </Text>
          );
        },
      },
      {
        Header: "ORGANIZER",
        accessor: "createdBy",
      },
      {
        Header: "STATUS",
        accessor: "status",
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
            {`Event: ${selectedEvent.name}`}
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
                setDeleteEvent(false);
                toast.success("Event deleted successfully");
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Modal>
      )}
      {editEvent && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={`Edit: ${selectedEvent.name}`}
          handleCloseModal={() => {
            setSelectedEvent(null);
            setEditEvent(false);
          }}
        >
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
                    Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter event name"
                    fontSize="xs"
                    value={selectedEvent.name}
                  />
                </FormControl>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    sm: "1fr",
                    md: "repeat(2, 1fr)",
                  }}
                  gap="15px"
                >
                  <FormControl width="100%">
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Date
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter date"
                      fontSize="xs"
                      value={selectedEvent.dateCreated}
                    />
                  </FormControl>

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10px"
                  >
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Start Time
                      </FormLabel>
                      <Input
                        variant="main"
                        type="text"
                        placeholder="Start time "
                        fontSize="xs"
                        value={selectedEvent.startTime}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        End Time
                      </FormLabel>
                      <Input
                        variant="main"
                        type="text"
                        placeholder="End time"
                        fontSize="xs"
                        value={selectedEvent.endTime}
                      />
                    </FormControl>
                  </Flex>
                </Grid>
              </Grid>

              <MultiSelect
                options={options}
                preselected={selectedEvent.members}
              />
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
                onClick={() => setEditEvent(false)}
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
                  setEditEvent(false);
                  toast.success("Event saved successfully");
                }}
              >
                Save Changes
              </Button>
            </Flex>
          </FormControl>
        </Modal>
      )}
    </>
  );
}

export default EventsTable;
