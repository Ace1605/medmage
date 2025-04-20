import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
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
import Modal from "components/Modal/Modal";
import { AppContext } from "contexts/AppContext";
import dayjs from "dayjs";
import { useDeletePatient } from "hooks/api/patientManagement/useDeletePatient";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "sonner";

function PatientsTable(props) {
  const navigate = useNavigate();
  const {
    columnsData,
    refetchPatients,
    tableData,
    pageNo,
    size,
    setPageNo,
    setSize,
  } = props;
  //   const [editPatient, setEditPatient] = useState(false);
  const [deletePatient, setDeletePatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { setIsSuperAdmin, token } = useContext(AppContext);
  const { handleDeletePatient, isLoading } = useDeletePatient(token);

  const columns = useMemo(() => {
    return [
      {
        Header: "Id",
        accessor: "patient_id",
      },
      {
        Header: "NAME",
        Cell: ({ row }) => {
          return (
            <div style={{ width: "150px" }}>
              <span>
                {row.original.first_name ?? "---"}{" "}
                {row.original.last_name ?? "---"}
              </span>
            </div>
          );
        },
      },

      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "MOBILE NUMBER",
        accessor: "phone",
      },

      {
        Header: "GENDER",
        accessor: "gender",
      },
      {
        Header: "DATE CREATED",
        accessor: "created_at",
        Cell: ({ row }) => {
          return (
            <div>
              <span>
                {dayjs(row.original.created_at).format("DD, MMM YYYY")}
              </span>
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
                  setIsSuperAdmin(true);
                  setSelectedPatient(row.original);
                  navigate(
                    `/admin/patient-management/patient-information/${row.original.id}`
                  );
                }}
              />
              <Icon
                as={DeleteIcon}
                w="18px"
                h="18px"
                color="red.400"
                cursor="pointer"
                onClick={() => {
                  setSelectedPatient(row.original);
                  setDeletePatient(true);
                }}
              />
            </Flex>
          );
        },
      },
    ];
  }, []);

  const data = useMemo(() => tableData?.data, []);

  const { meta } = tableData;

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

  const { pageIndex, pageSize, globalFilter } = state;
  const textColor = useColorModeValue("gray.600", "white");

  const goToPrev = () => {
    setPageNo(pageNo - 1);
  };

  const goToNext = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <>
      <Flex direction="column" w="100%">
        <Flex justify="space-between" align="center" w="100%" px="22px">
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ sm: "4px", md: "12px" }}
            align="center"
            me="12px"
            my="10px"
            minW={{ sm: "100px", md: "200px" }}
          >
            <Select
              variant="main"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              color="gray.500"
              size="sm"
              borderRadius="12px"
              maxW="75px"
              cursor="pointer"
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </Select>
            <Text fontSize="xs" color={textColor} fontWeight="normal">
              entries per page
            </Text>
          </Stack>
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

        <Flex
          overflowX={{ sm: "scroll", lg: "hidden" }}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
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
                          cursor={cell.column.id !== "action" && "pointer"}
                          onClick={() => {
                            if (cell.column.id !== "action") {
                              setIsSuperAdmin(false);
                              setSelectedPatient("id", row.original.id);
                              navigate(
                                `/admin/patient-management/patient-information/${row.original.id}`
                              );
                            }
                            return;
                          }}
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
            Showing {meta.pagination.current_page} to{" "}
            {meta.pagination.current_page * tableData?.data.length} of{" "}
            {meta.pagination.total} entries
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
              isDisabled={meta.pagination.current_page === 1}
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
                  w="40px"
                  h="40px"
                  borderRadius="8px"
                  bg={pageNumber === pageIndex + 1 ? "blue.500" : "#fff"}
                  border={
                    pageNumber === pageIndex + 1
                      ? "none"
                      : "1px solid lightgray"
                  }
                  key={index}
                >
                  <Text
                    fontSize="sm"
                    color={pageNumber === pageIndex + 1 ? "#fff" : "gray.600"}
                  >
                    {meta.pagination.current_page}
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
              isDisabled={meta.pagination.last_page === pageNo}
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
      {deletePatient && (
        <Modal
          maxWidth="500px"
          handleCloseModal={() => {
            setSelectedPatient(null);
            setDeletePatient(false);
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
            Are you sure you want to delete this Paitent's Data?
          </Text>
          <Text
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="25px"
            fontSize={{ sm: "16px", lg: "18px" }}
          >
            This action cannot be undone
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
                setSelectedPatient(null);
                setDeletePatient(false);
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
                handleDeletePatient(
                  selectedPatient?.id,
                  (res) => {
                    if (res.status === 200) {
                      setSelectedPatient(null);
                      setDeletePatient(false);
                      refetchPatients();
                      toast.success("Patients data deleted successfully");
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
              {isLoading ? <Spinner w="20px" h="20px" /> : " Confirm"}
            </Button>
          </Flex>
        </Modal>
      )}
    </>
  );
}

export default PatientsTable;
