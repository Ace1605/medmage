import {
  Button,
  Flex,
  Icon,
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
import React, { useMemo } from "react";
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

function FinanceTable(props) {
  const { tableData } = props;

  const columns = useMemo(() => {
    return [
      {
        Header: "TRANSACTION ID",
        accessor: "transactionId",
        minWidth: 170,
        width: 170,
      },
      {
        Header: "Sender",
        accessor: "sender",
      },
      {
        Header: "DESCRIPTION",
        accessor: "description",
        minWidth: 300,
        disableSortBy: true,
      },
      {
        Header: "TransactionType",
        accessor: "transactionType",
      },
      {
        Header: "AMOUNT",
        accessor: "amount",
      },
      {
        Header: "STATUS",
        accessor: "status",
        disableSortBy: true,
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
  const SuccessColor = useColorModeValue("green.600", "white");
  const PendingColor = useColorModeValue("yellow.600", "white");
  const FailedColor = useColorModeValue("red.600", "white")
  return (
    <>
      <Flex direction="column" w="100%">
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
                      width={column.width}
                      minWidth={column.minWidth}
                      maxWidth={column.maxWidth}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {column.render("Header")}
                        {column.id !== "description" &&
                          column.id !== "amount" &&
                          column.id !== "transactionId" && (
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
                    let cellColor = textColor;

                    if (cell.column.id === "status") {
                     if (cell.value === "Completed") {
                        cellColor = SuccessColor;
                        } else if (cell.value === "Pending") {
                    cellColor = PendingColor;
                    } else if (cell.value === "Failed") {
                        cellColor = FailedColor;
                    }
                    }
                      return (
                        <Td
                          color={cellColor}
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
    </>
  );
}

export default FinanceTable;
