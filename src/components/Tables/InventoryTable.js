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
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "components/Modal/Modal";
import { AppContext } from "contexts/AppContext";
import dayjs from "dayjs";
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
import utc from "dayjs/plugin/utc";
import { useDeleteInventory } from "hooks/api/management/inventory/useDeleteInventory";
import { useGetInventory } from "hooks/api/management/inventory/useGetInventory";
import { useUpdateInventory } from "hooks/api/management/inventory/useUpdateInventory";

function InventoryTable(props) {
  dayjs.extend(utc);
  const {
    tableData,
    pageNo,
    size,
    setPageNo,
    setSize,
    refetch,
    categories,
    isFetchingCategories,
    setAddCategory,
  } = props;
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { token, providers } = useContext(AppContext);

  const { handleDeleteInventory, isLoading } = useDeleteInventory(token);
  const {
    data: inventoryData,
    error: errorGetting,
    isLoading: isGetting,
  } = useGetInventory(token, selectedProduct?.id);

  const { handleUpdateInventory, isLoading: isUpdating } = useUpdateInventory(
    token
  );

  if (errorGetting) toast.error("Unable to get inventory");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: null,
    category: "",
    reorderLevel: null,
    reorderQuantity: null,
    status: "active",
    sku: "",
    notes: "",
  });

  useEffect(() => {
    if (inventoryData?.data) {
      setProduct({
        name: inventoryData.data.medication_name,
        description: inventoryData.data.description,
        quantity: inventoryData.data.quantity,
        category: inventoryData.data.category?.id,
        reorderLevel: inventoryData.data.reorder_level,
        reorderQuantity: inventoryData.data.reorder_quantity,
        status: inventoryData.data.status,
        sku: inventoryData.data.sku,
        notes: inventoryData.data.notes,
      });
    }
  }, [inventoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value === "add-category") {
      setAddCategory(true);
      setProduct((prev) => ({
        ...prev,
        ["category"]: "",
      }));
    }
  };

  const columns = useMemo(() => {
    return [
      // {
      //   Header: "INVENTORY NAME",
      //   accessor: "inventory_name",
      // },
      // {
      //   Header: "SKU",
      //   accessor: "sku",
      // },
      // {
      //   Header: "CATEGORY",
      //   accessor: "category",
      // },
      // {
      //   Header: "QUANTITY",
      //   accessor: "qunatity",
      // },
      // {
      //   Header: "PRICE",
      //   accessor: "price",
      // },
      // {
      //   Header: "ADDED BY",
      //   accessor: "added_by",
      // },
      // {
      //   Header: "ADDED DATE",
      //   accessor: "added_date",
      // },
      // {
      //   Header: "UPDATED BY",
      //   accessor: "updated_by",
      // },

      {
        Header: "PRODUCT NAME",
        accessor: "medication_name",
      },
      {
        Header: "SKU",
        accessor: "sku",
      },
      {
        Header: "CATEGORY",
        accessor: "category",
        Cell: ({ row }) => {
          const category = row.original.category;

          return <Text color={textColor}>{category?.name ?? "---"}</Text>;
        },
      },
      {
        Header: "CREATED AT",
        accessor: "created_at",
        minWidth: 130,
        width: 130,
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
        Header: "QUANTITY",
        accessor: "quantity",
        minWidth: 100,
        width: 100,
      },
      {
        Header: "DESCRIPTION",
        accessor: "description",
        minWidth: 150,
        width: 150,
      },
      {
        Header: "REORDER LEVEL",
        accessor: "reorder_level",
        minWidth: 100,
        width: 100,
      },
      {
        Header: "REORDER QUANTITY",
        accessor: "reorder_quantity",
        minWidth: 100,
        width: 100,
      },
      {
        Header: "STATUS",
        accessor: "status",
        Cell: ({ row }) => {
          const status = row.original.status;
          return (
            <div style={{ color: status === "active" ? "#48bb78" : "#FF3B30" }}>
              {status === "active" ? "Active" : "Inactive"}
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
                  setSelectedProduct(row.original);
                  setEditProduct(true);
                }}
              />
              <Icon
                as={DeleteIcon}
                w="18px"
                h="18px"
                color="red.400"
                cursor="pointer"
                onClick={() => {
                  setSelectedProduct(row.original);
                  setDeleteProduct(true);
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

  const { pageIndex, pageSize = 10, globalFilter } = state;

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
              onClick={() => goToNext()}
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
      {deleteProduct && (
        <Modal
          maxWidth={"500px"}
          handleCloseModal={() => {
            setSelectedProduct(null);
            setDeleteProduct(false);
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
            Are you sure you want to delete this Product?
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
            {`Product name: ${selectedProduct?.medication_name}`}
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
                setSelectedProduct(null);
                setDeleteProduct(false);
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
                handleDeleteInventory(
                  selectedProduct?.id,
                  (res) => {
                    if (res.status === 200) {
                      setDeleteProduct(false);
                      refetch();
                      toast.success("Inventory item deleted successfully");
                      setSelectedProduct(null);
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
              {isLoading ? <Spinner w="20px" h="20px" /> : "    Confirm"}
            </Button>
          </Flex>
        </Modal>
      )}
      {editProduct && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={
            inventoryData?.data
              ? `Edit: ${inventoryData?.data?.medication_name}`
              : ""
          }
          handleCloseModal={() => {
            setSelectedProduct(null);
            setEditProduct(false);
          }}
        >
          {isGetting && (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="35px" h="35px" color="#3182ce" />
            </Flex>
          )}
          {inventoryData?.data && (
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
                      placeholder="Enter product name"
                      fontSize="xs"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
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
                      value={product.description}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <Grid
                    templateColumns={{
                      base: "1fr",
                      sm: "1fr",
                      md: "repeat( 1fr)",
                    }}
                    gap="15px"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap="10px"
                    >
                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Quantity
                        </FormLabel>
                        <Input
                          type="number"
                          variant="main"
                          placeholder=" "
                          fontSize="xs"
                          name="quantity"
                          value={product.quantity}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Category
                        </FormLabel>
                        <Flex align="center" gap="10px">
                          <Select
                            disabled={isFetchingCategories}
                            cursor="pointer"
                            variant="main"
                            color="gray.400"
                            fontSize="xs"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                          >
                            {categories.map((category) => {
                              return (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                            <option value="add-category">Add category</option>
                          </Select>
                          {isFetchingCategories && (
                            <Spinner w="12px" h="12px" color="blue.600" />
                          )}
                        </Flex>
                      </FormControl>
                    </Flex>
                  </Grid>

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10px"
                  >
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Reorder level
                      </FormLabel>
                      <Input
                        type="number"
                        variant="main"
                        placeholder=" "
                        fontSize="xs"
                        name="reorderLevel"
                        value={product.reorderLevel}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Reorder quantity
                      </FormLabel>
                      <Input
                        type="number"
                        variant="main"
                        placeholder=" "
                        fontSize="xs"
                        name="reorderQuantity"
                        value={product.reorderQuantity}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Flex>

                  <Grid
                    templateColumns={{
                      base: "1fr",
                      sm: "1fr 1fr", // or "repeat(2, 1fr)"
                      md: "repeat(2, 1fr)", // two equal columns
                    }}
                    gap="15px"
                  >
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Status
                      </FormLabel>
                      <Select
                        cursor="pointer"
                        variant="main"
                        color="gray.400"
                        fontSize="xs"
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Sku
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder=" "
                        fontSize="xs"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>

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
                      value={product.notes}
                      onChange={handleChange}
                    />
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
                    setEditProduct(false);
                    setProduct({
                      name: "",
                      description: "",
                      quantity: null,
                      category: "",
                      reorderLevel: null,
                      reorderQuantity: null,
                      status: "active",
                      sku: "",
                      notes: "",
                    });
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
                    handleUpdateInventory(
                      selectedProduct?.id,
                      {
                        name: product.name,
                        description: product.description,
                        status: product.status,
                        quantity: product.quantity,
                        category_id: product.category,
                        reorder_level: product.reorderLevel,
                        reorder_quantity: product.reorderQuantity,
                        notes: product.notes,
                        sku: product.sku,
                        provider_id: providers?.[0]?.id,
                      },
                      (res) => {
                        if (res.status === 200) {
                          setEditProduct(false);
                          refetch();
                          toast.success("Inventory item updated successfully");
                          setProduct({
                            name: "",
                            description: "",
                            quantity: null,
                            reorderLevel: null,
                            reorderQuantity: null,
                            status: "active",
                            sku: "",
                            notes: "",
                          });
                        } else {
                          toast.error(res?.response.data.message);
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
                  {isUpdating ? <Spinner w="20px" h="20px" /> : " Confirm"}
                </Button>
              </Flex>
            </FormControl>
          )}
        </Modal>
      )}
    </>
  );
}

export default InventoryTable;
