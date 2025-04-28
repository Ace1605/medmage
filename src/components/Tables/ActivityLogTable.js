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
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
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

function ActivityLogTable(props) {
  const { tableData, pageNo, size, setPageNo, setSize } = props;
  const queryClient = useQueryClient();

  const columns = useMemo(() => {
    return [
      {
        Header: "TIME STAMP",
        accessor: "timeStamp",
        minWidth: 120,
        width: 120,

        Cell: ({ row }) => {
          const createdAt = row.original.created_at;

          return (
            <Text color={textColor}>
              {dayjs(createdAt).format("DD MMM, YYYY")}
            </Text>
          );
        },
      },
      {
        Header: "USER",
        accessor: "user",
        Cell: ({ row }) => {
          const user = row.original.causer;

          return (
            <Text color={textColor}>
              {`${user.first_name} ${user.last_name}`}
            </Text>
          );
        },
      },
      {
        Header: "ROLE",
        accessor: "role",
        Cell: ({ row }) => {
          return <Text color={textColor}>---</Text>;
        },
      },
      {
        Header: "ACTIVITY TYPE",
        accessor: "event",
        width: 130,
        disableSortBy: true,
      },
      {
        Header: "DESCRIPTION",
        accessor: "description",
        minWidth: 300,
        disableSortBy: true,
      },
      {
        Header: "IP ADDRESS",
        accessor: "ipAddress",
        disableSortBy: true,
        Cell: ({ row }) => {
          return <Text color={textColor}>---</Text>;
        },
      },
    ];
  }, []);

  const data = useMemo(() => tableData?.data, [tableData]);

  const { current_page, total, last_page } = tableData;

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
    // gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = tableInstance;

  // const createPages = (count) => {
  //   let arrPageCount = [];

  //   for (let i = 1; i <= count; i++) {
  //     arrPageCount.push(i);
  //   }

  //   return arrPageCount;
  // };

  const createPages = (totalPages, currentPage) => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const { pageIndex, pageSize = 10, globalFilter } = state;

  const goToPrev = () => {
    setPageNo(pageNo - 1);
  };

  const goToNext = () => {
    setPageNo(pageNo + 1);
  };

  const goToPage = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const textColor = useColorModeValue("gray.600", "white");
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
                          column.id !== "ipAddress" &&
                          column.id !== "activityType" && (
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
            Showing {current_page} to {current_page * tableData?.data.length} of{" "}
            {total} entries
          </Text>
          <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
            <Button
              variant="no-effects"
              onClick={() => goToPrev()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              // isDisabled={pageIndex === 0}
              isDisabled={current_page === 1}
              _hover={{
                bg: "gray.200",
                opacity: "0.7",
                borderColor: "gray.500",
              }}
            >
              <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
            </Button>
            {createPages(total, current_page).map((pageNumber, index) => {
              if (pageNumber === "...") {
                return (
                  <Text key={index} mx="2" fontSize="sm" color="gray.500">
                    ...
                  </Text>
                );
              }

              return (
                <Button
                  variant="no-effects"
                  transition="all .5s ease"
                  onClick={() => goToPage(pageNumber)}
                  w="40px"
                  h="40px"
                  borderRadius="8px"
                  bg={pageNumber === current_page ? "blue.500" : "#fff"}
                  border={
                    pageNumber === current_page ? "none" : "1px solid lightgray"
                  }
                  _hover={{
                    opacity: "0.7",
                    borderColor: "gray.500",
                  }}
                  key={index}
                >
                  <Text
                    fontSize="sm"
                    color={pageNumber === current_page ? "#fff" : "gray.600"}
                  >
                    {pageNumber}
                  </Text>
                </Button>
              );
            })}
            <Button
              variant="no-effects"
              onClick={() => goToNext()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              // isDisabled={pageIndex + 1 === pageCount}
              isDisabled={last_page === pageNo}
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

export default ActivityLogTable;
