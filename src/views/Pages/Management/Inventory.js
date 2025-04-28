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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { BiUpload } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { AppContext } from "contexts/AppContext";
import moment from "moment";
import InventoryTable from "components/Tables/InventoryTable";
import { useListInventory } from "hooks/api/management/inventory/useListInventory";

function Inventory() {
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("white", "black");
  const [addInventory, setAddInventory] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const { user, providers, token } = useContext(AppContext);
  const { data, isFetching, refetch, error, isLoading } = useListInventory(
    token,
    page,
    size
  );

  const isValid =
    eventName.trim() !== "" &&
    description.trim() !== "" &&
    moment(startDateTime).isValid() &&
    moment(endDateTime).isValid();

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
          {isLoading ? (
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
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Category
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder=" "
                    fontSize="xs"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                        Qunatity
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder=" "
                        fontSize="xs"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Price per unit
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder=" "
                        fontSize="xs"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </Grid>
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
                disabled={!isValid}
                fontSize="16px"
                colorScheme="blue"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="10px"
                onClick={() => {
                  //   handleCreateEvent(
                  //     {
                  //       title: eventName,
                  //       description: description,
                  //       is_completed: false,
                  //       user_id: user?.id,
                  //       provider_id: providers?.[0]?.id,
                  //       start_datetime: startDateTime
                  //         ? moment(startDateTime).format("YYYY-MM-DD HH:mm:ss")
                  //         : null,
                  //       end_datetime: endDateTime
                  //         ? moment(endDateTime).format("YYYY-MM-DD HH:mm:ss")
                  //         : null,
                  //     },
                  //     (res) => {
                  //       if (res.status === 201) {
                  //         setCreateEvent(false);
                  //         refetch();
                  //         toast.success("Event created successfully");
                  //       } else {
                  //         toast.error(res?.response.data.message);
                  //       }
                  //     },
                  //     (err) => {
                  //       toast.error(
                  //         err?.response?.data?.message || "Something went wrong"
                  //       );
                  //     }
                  //   );
                }}
              >
                {"" ? <Spinner w="20px" h="20px" /> : " Confirm"}
              </Button>
            </Flex>
          </FormControl>
        </Modal>
      )}
    </Flex>
  );
}

export default Inventory;
