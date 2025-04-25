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
  Spinner,
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
import { useQueryClient } from "@tanstack/react-query";
import { DateTimeRangePicker } from "components/CustomDateTimePicker/CustomDateTimeRangePicker";
import Modal from "components/Modal/Modal";
import { AppContext } from "contexts/AppContext";
import dayjs from "dayjs";
import { useDeleteMedication } from "hooks/api/patientManagement/medication/useDeleteMedication";
import { useGetMedication } from "hooks/api/patientManagement/medication/useGetMedication";
import { useUpdateMedication } from "hooks/api/patientManagement/medication/useUpdateMedication";
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

function MedicationTable(props) {
  const { tableData, refetch } = props;
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [deleteMedication, setDeleteMedication] = useState(false);
  const [selected, setSelected] = useState(null);
  const { isSuperAdmin, token } = useContext(AppContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { data: medicationData, error, isLoading } = useGetMedication(
    token,
    selected?.id
  );
  if (error) toast.error("Unable to get medication, please try again");

  const { handleUpdateMedication, isLoading: isUpdating } = useUpdateMedication(
    token
  );

  const { handleDeleteMedication, isLoading: isDeleting } = useDeleteMedication(
    token
  );
  const [medication, setMedication] = useState({
    medication_name: "",
    description: "",
    dosage: "",
    frequency: "",
    route: "",
    patient_id: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    if (medicationData?.data) {
      setMedication({
        medication_name: medicationData.data.medication_name,
        description: medicationData.data.description,
        dosage: medicationData.data.dosage,
        frequency: medicationData.data.frequency,
        route: medicationData.data.route,
        start_date: medicationData.data.start_date,
        end_date: medicationData.data.end_date,
        notes: medicationData.data.notes,
      });

      setStartDate(moment(medicationData.data.start_date));
      setEndDate(moment(medicationData.data.end_date));
    }
  }, [medicationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "medication_name",
      },
      {
        Header: "Dosage",
        accessor: "dosage",
        disableSortBy: true,
        sortType: false,
      },
      // {
      //   Header: "Route",
      //   accessor: "route",
      //   disableSortBy: true,
      //   sortType: false,
      // },
      {
        Header: "Frequency",
        accessor: "frequency",
        disableSortBy: true,
        sortType: false,
        minWidth: 200,
      },
      {
        Header: "Description",
        accessor: "description",
        disableSortBy: true,
        sortType: false,
        minWidth: 200,
      },
      {
        Header: "Duration",
        accessor: "duration",
        disableSortBy: true,
        sortType: false,
        minWidth: 220,
        Cell: ({ row }) => {
          const startDate = row.original.start_date;
          const endDate = row.original.end_date;

          return (
            <Text color={textColor}>{`${dayjs(startDate).format(
              "DD MMM, YYYY"
            )} - ${dayjs(endDate).format("DD MMM, YYYY")}`}</Text>
          );
        },
      },
      {
        Header: "Doctor",
        accessor: "prescribed_by",
        disableSortBy: true,
        sortType: false,
        minWidth: 120,
        Cell: ({ row }) => {
          const doctor = row.original.prescribed_by;

          return <Text color={textColor}>{doctor ? doctor : "---"}</Text>;
        },
      },
      // {
      //   Header: "Notes",
      //   accessor: "notes",
      //   disableSortBy: true,
      //   sortType: false,
      //   minWidth: 200,
      // },
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
                  setSelected(row.original);
                  setEdit(true);
                }}
              />
              <Icon
                as={DeleteIcon}
                w="18px"
                h="18px"
                color="red.400"
                cursor="pointer"
                onClick={() => {
                  setSelected(row.original);
                  setDeleteMedication(true);
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
                    if (column.id === "action" && !isSuperAdmin) {
                      return null;
                    }
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
                          {column.id === "medicationName" && (
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
      {deleteMedication && (
        <Modal
          maxWidth={"500px"}
          handleCloseModal={() => {
            setSelected(null);
            setDeleteMedication(false);
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
            Are you sure you want to delete this medication?
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
            {`Medication: ${selected?.medication_name}`}
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
                setDeleteMedication(false);
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
                handleDeleteMedication(
                  selected?.id,
                  (res) => {
                    if (res.status === 204) {
                      refetch();
                      setDeleteMedication(false);
                      toast.success("Medication deleted successfully");
                      setSelected(null);
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
              {isDeleting ? <Spinner w="20px" h="20px" /> : "  Confirm"}
            </Button>
          </Flex>
        </Modal>
      )}
      {edit && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={
            medicationData?.data ? `Edit: ${selected?.medication_name}` : ""
          }
          handleCloseModal={() => {
            setSelected(null);
            setEdit(false);
          }}
        >
          {isLoading && (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="35px" h="35px" color="#3182ce" />
            </Flex>
          )}
          {medicationData?.data && (
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
                      Name
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter medication name"
                      fontSize="xs"
                      name="medication_name"
                      value={medication.medication_name}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Dosage
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter dosage"
                      fontSize="xs"
                      name="dosage"
                      value={medication.dosage}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Route
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter route"
                      fontSize="xs"
                      name="route"
                      value={medication.route}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Frequency
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter frequency"
                      fontSize="xs"
                      name="frequency"
                      value={medication.frequency}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Box>
              <FormControl>
                <DateTimeRangePicker
                  dateSelect
                  startDateTime={startDate}
                  setStartDateTime={setStartDate}
                  endDateTime={endDate}
                  setEndDateTime={setEndDate}
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
                  name="description"
                  value={medication.description}
                  onChange={handleChange}
                />
              </FormControl>

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
                  name="notes"
                  value={medication.notes}
                  onChange={handleChange}
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
                  handleUpdateMedication(
                    selected?.id,
                    {
                      medication_name: medication.medication_name,
                      description: medication.description,
                      dosage: medication.dosage,
                      frequency: medication.frequency,
                      route: medication.route,
                      start_date: startDate,
                      end_date: endDate,
                      // status: "active",
                      notes: medication.notes,
                    },
                    (res) => {
                      if (res.status === 200) {
                        setEdit(false);
                        refetch();
                        queryClient.invalidateQueries([
                          "medications",
                          selected?.id,
                        ]);
                        setSelected(null);
                        toast.success(" Medication updated ");
                      } else {
                        toast.error(res?.message);
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
                {isUpdating ? <Spinner w="20px" h="20px" /> : "Confirm"}
              </Button>
            </FormControl>
          )}
        </Modal>
      )}
    </>
  );
}

export default MedicationTable;
