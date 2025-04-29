import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  ListItem,
  OrderedList,
  Select,
  Spinner,
  Text,
  Textarea,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { BiUpload } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { useContext, useRef, useState } from "react";
import { AppContext } from "contexts/AppContext";
import InventoryTable from "components/Tables/InventoryTable";
import { useListInventory } from "hooks/api/management/inventory/useListInventory";
import { useCreateInventory } from "hooks/api/management/inventory/useCreateInventory";
import { DownloadIcon } from "@chakra-ui/icons";

function Inventory() {
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("white", "black");
  const [addInventory, setAddInventory] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { providers, token } = useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: null,
    reorderLevel: null,
    reorderQuantity: null,
    status: "active",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const requiredField = [
    "Name",
    "Qunatity ",
    "Description",
    "Sku",
    "Status",
    "Reorder level",
    "Reorder quantity",
  ];

  const fileInputRef = useRef(null);
  const [csvFile, setCsvFile] = useState(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const { handleCreateInventory, isLoading: isCreating } = useCreateInventory(
    token
  );

  const { data, isFetching, refetch, error, isLoading } = useListInventory(
    token,
    page,
    size
  );

  if (error) toast.error("Unable to fecth inventory list");

  const isValidProduct =
    product.name.trim() !== "" &&
    product.description.trim() !== "" &&
    product.quantity !== null &&
    product.quantity > 0 &&
    product.reorderLevel !== null &&
    product.reorderLevel >= 0 &&
    product.reorderQuantity !== null &&
    product.reorderQuantity > 0;

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Card px="0px">
        <CardHeader px="22px">
          <Flex
            mb="10px"
            alignItems="center"
            justifyContent="space-between"
            pe="8px"
            px="24px"
          >
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Inventory
            </Text>
            <Flex gap="12px" alignItems="center">
              <Button
                px="10px"
                fontSize="14px"
                colorScheme="blue"
                fontWeight="bold"
                minw="90px"
                h="40px"
                onClick={() => setAddInventory(true)}
              >
                Add
              </Button>
              <Button
                onClick={() => setBulkUpload(true)}
                leftIcon={<BiUpload size="16px" />}
                fontSize="14px"
                fontWeight="normal"
                cursor="pointer"
                variant="outlined"
                minw="90px"
                h="40px"
                borderWidth="2px"
              >
                Bulk upload
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          {isLoading || isFetching ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : data?.data < 1 ? (
            <Flex
              width="100% "
              direction="column"
              height="30vh"
              align="center"
              justify="center"
              gap="20px"
            >
              <Icon as={MdFolderOff} w="60px" h="60px" color="#E2E8F0" />
              <Text color="#E2E8F0" fontSize="18px">
                No Data
              </Text>
            </Flex>
          ) : (
            <InventoryTable
              tableData={data}
              pageNo={page}
              size={size}
              setPageNo={setPage}
              setSize={setSize}
              refetch={refetch}
            />
          )}
        </CardBody>
      </Card>
      {addInventory && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label="Add New Product"
          handleCloseModal={() => setAddInventory(false)}
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
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
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
                  </Flex>
                </Grid>

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
                onClick={() => setAddInventory(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValidProduct}
                fontSize="16px"
                colorScheme="blue"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="10px"
                onClick={() => {
                  handleCreateInventory(
                    {
                      name: product.name,
                      description: product.description,
                      status: product.status,
                      quantity: product.quantity,
                      reorder_level: product.reorderLevel,
                      reorder_quantity: product.reorderQuantity,
                      notes: product.notes,
                      provider_id: providers?.[0]?.id,
                    },
                    (res) => {
                      if (res.status === 201) {
                        setAddInventory(false);
                        refetch();
                        toast.success("Inventory item created successfully");
                        setProduct({
                          name: "",
                          description: "",
                          quantity: null,
                          reorderLevel: null,
                          reorderQuantity: null,
                          status: "active",
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
                {isCreating ? <Spinner w="20px" h="20px" /> : " Confirm"}
              </Button>
            </Flex>
          </FormControl>
        </Modal>
      )}

      {bulkUpload && (
        <Modal
          maxWidth={"600px"}
          label="Upload Inventory"
          handleCloseModal={() => setBulkUpload(false)}
        >
          <OrderedList pt="10px">
            <Grid gap="15px">
              <Box>
                <ListItem>Download the template</ListItem>
                <a href="/csvFiles/inventory_sample.csv">
                  <Button
                    rightIcon={<DownloadIcon size="16px" />}
                    fontSize="14px"
                    fontWeight="normal"
                    cursor="pointer"
                    variant="outlined"
                    minw="90px"
                    mt="10px"
                    h="40px"
                    borderWidth="2px"
                  >
                    CSV template
                  </Button>
                </a>
              </Box>
              <Box>
                <ListItem>Fill out the fields as follows</ListItem>
                <UnorderedList>
                  {requiredField.map((field) => {
                    return <ListItem>{field}</ListItem>;
                  })}
                </UnorderedList>
              </Box>
              <Box>
                <ListItem>Upload your file to send out the invites</ListItem>
                <Box>
                  <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    id="fileUpload"
                    name="file"
                    accept=".csv, .xlsx"
                    style={{ display: "none" }}
                  />
                  <Button
                    rightIcon={<BiUpload size="19px" />}
                    fontSize="17px"
                    fontWeight="normal"
                    cursor="pointer"
                    variant="outlined"
                    w="100%"
                    h="50px"
                    mt="10px"
                    borderWidth="2px"
                    onClick={handleClick}
                  >
                    {csvFile ? csvFile.name : " Upload your CSV or XLSX file"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </OrderedList>

          <Button
            fontSize="18px"
            colorScheme="blue"
            fontWeight="bold"
            w="100%"
            h="50"
            mb="10px"
            mt="20px"
            onClick={() => {
              handleBulkUpload(csvFile);
            }}
          >
            {isUploading ? <Spinner w="18px" h="18px" /> : "Upload"}
          </Button>
        </Modal>
      )}
    </Flex>
  );
}

export default Inventory;
