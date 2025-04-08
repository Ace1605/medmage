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
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Modal from "components/Modal/Modal";
import { AppContext } from "contexts/AppContext";
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

function VisitationTable(props) {
  const { tableData } = props;
  const [edit, setEdit] = useState(false);
  const [deleteVisit, setDeleteVisit] = useState(false);
  const [selected, setSelected] = useState(null);
  const { isSuperAdmin } = useContext(AppContext);

  const columns = useMemo(() => {
    return [
      {
        Header: "Date",
        accessor: "date",
        disableSortBy: true,
        sortType: false,
        minWidth: 130,
      },
      {
        Header: "Time",
        accessor: "time",
        disableSortBy: true,
        sortType: false,
        minWidth: 130,
      },
      {
        Header: "Visitor Name",
        accessor: "visitorName",
        disableSortBy: true,
        sortType: false,
        minWidth: 160,
      },
      {
        Header: "Relationship",
        accessor: "relationship",
        disableSortBy: true,
        sortType: false,
      },
      {
        Header: "Purpose of Visit",
        accessor: "purpose",
        disableSortBy: true,
        sortType: false,
        minWidth: 160,
      },
      {
        Header: "Notes",
        accessor: "notes",
        disableSortBy: true,
        sortType: false,
        minWidth: 200,
      },

      //   {
      //     Header: "Action",
      //     accessor: "action",
      //     disableSortBy: true,
      //     sortType: false,
      //     Cell: ({ row }) => {
      //       const textColor = useColorModeValue("blue.600", "white");
      //       return (
      //         <Flex gap="16px" alignItems="center">
      //           <Icon
      //             as={EditIcon}
      //             w="18px"
      //             h="18px"
      //             color={textColor}
      //             cursor="pointer"
      //             onClick={() => {
      //               setSelected(row.original);
      //               setEdit(true);
      //             }}
      //           />
      //           <Icon
      //             as={DeleteIcon}
      //             w="18px"
      //             h="18px"
      //             color="red.400"
      //             cursor="pointer"
      //             onClick={() => {
      //               setSelected(row.original);
      //               setDeleteVisit(true);
      //             }}
      //           />
      //         </Flex>
      //       );
      //     },
      //   },
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

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize, globalFilter } = state;

  const textColor = useColorModeValue("gray.600", "white");
  return (
    <>
      <Flex direction="column" w="100%">
        <Flex
          overflowX={{ sm: "scroll" }}
          sx={{
            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
            "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
            "scrollbar-width": "none", // Hide scrollbar in Firefox
          }}
        >
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="24px"
          >
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <Th
                        key={index}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        pe="0px"
                        minWidth={column.minWidth}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color="gray.400"
                        >
                          {column.render("Header")}
                          {/* {column.id === "medicationName" && (
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
                          )} */}
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      if (cell.column.id === "action" && !isSuperAdmin) {
                        return null;
                      }
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
      {deleteVisit && (
        <Modal
          maxWidth={"500px"}
          handleCloseModal={() => {
            setSelected(null);
            setDeleteVisit(false);
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
            Are you sure you want to delete this data?
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
            {`Visitor: ${selected.visitorName}`}
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
                setSelected(null);
                setDeleteVisit(false);
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
                setDeleteVisit(false);
                toast.success("Medication deleted successfully");
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Modal>
      )}
      {edit && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={` Visitor: ${selected.visitorName}`}
          handleCloseModal={() => {
            setSelected(null);
            setEdit(false);
          }}
        >
          <FormControl>
            <Box
              h={{ sm: "40vh", md: "100%" }}
              overflowY={{ sm: "scroll", md: "hidden" }}
            >
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "1fr",
                  md: "repeat(2, 1fr)",
                }}
                gap="15px"
                spacing={{ sm: "8px", lg: "30px" }}
                w={{ sm: "100%", lg: null }}
                my="18px"
              >
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Date
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter visitation date"
                    fontSize="xs"
                    value={selected.date}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Time
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter visitation Time"
                    fontSize="xs"
                    value={selected.time}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Visitor's Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter visitor's name"
                    fontSize="xs"
                    value={selected.visitorName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Relationship
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter relationship"
                    fontSize="xs"
                    value={selected.relationship}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Purpose of Visit
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter purpose of visit"
                    fontSize="xs"
                    value={selected.purpose}
                  />
                </FormControl>
              </Grid>
            </Box>

            <FormControl>
              <FormLabel
                fontWeight="semibold"
                fontSize="xs"
                mb="10px"
                sx={{ _readOnly: { color: "gray.500" } }}
              >
                Notes
              </FormLabel>
              <Textarea
                value={selected.notes}
                sx={{
                  _readOnly: {
                    color: "gray.700",
                    fontWeight: "semibold",
                    border: 0,
                    pl: 0,
                    opacity: 1,
                    cursor: "default",
                  },
                }}
                _focus={{
                  borderColor: "gray.300", // Change to desired color
                  boxShadow: "none", // Remove the glow effect
                }}
                border="1px solid #e2e8f0"
                placeholder="notes"
                fontSize="xs"
              />
            </FormControl>

            <Button
              fontSize="16px"
              colorScheme="blue"
              fontWeight="bold"
              w="100%"
              h="50"
              my="10px"
              onClick={() => {
                setEdit(false);
                toast.success("New medication added ");
              }}
            >
              Confirm
            </Button>
          </FormControl>
        </Modal>
      )}
    </>
  );
}

export default VisitationTable;
