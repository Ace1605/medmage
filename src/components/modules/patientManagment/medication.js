import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Spinner,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { DateTimeRangePicker } from "components/CustomDateTimePicker/CustomDateTimeRangePicker";
import Modal from "components/Modal/Modal";
import MedicationTable from "components/Tables/MedicationTable";
import { AppContext } from "contexts/AppContext";
import dayjs from "dayjs";
import { useCreateMedication } from "hooks/api/patientManagement/medication/useCreateMedication";
import { useListMedications } from "hooks/api/patientManagement/medication/useListMedication";
import { useContext, useState } from "react";
import { toast } from "sonner";
export const Medication = (props) => {
  const { patientId } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const [addMedication, setAddMedication] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { isSuperAdmin, token, providers } = useContext(AppContext);
  const [medication, setMedication] = useState({
    medication_name: "",
    description: "",
    dosage: "",
    frequency: "",
    route: "",
    start_date: "",
    end_date: "",
    patient_id: "",
    status: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { handleCreateMedication, isLoading } = useCreateMedication(token);
  const {
    data,
    isFetching,
    refetch,
    error,
    isLoading: isGetting,
  } = useListMedications(token, page, size);
  if (error) toast.error("Unable to fetch medications, please try again");

  return (
    <>
      {isGetting || isFetching ? (
        <Flex width="100% " height="50vh" align="center" justify="center">
          <Spinner w="40px" h="40px" color="#3182ce" />
        </Flex>
      ) : data?.data.length < 1 ? (
        <Flex
          width="100% "
          direction="column"
          height="30vh"
          align="center"
          justify="center"
          gap="20px"
        >
          <Text color="gray.400" fontSize="18px">
            This paitent currenlty has no medication
          </Text>
        </Flex>
      ) : (
        <>
          <CardHeader mb="32px">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              pe="8px"
              px="24px"
            >
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Medication
              </Text>

              {isSuperAdmin && (
                <Flex gap="12px" alignItems="center">
                  <Button
                    px="14px"
                    py="8px"
                    fontSize="14px"
                    colorScheme="blue"
                    fontWeight="bold"
                    minw="90px"
                    h="40px"
                    onClick={() => setAddMedication(true)}
                  >
                    Add
                  </Button>
                </Flex>
              )}
            </Flex>
          </CardHeader>
          <CardBody
            overflowX={{ base: "scroll" }}
            sx={{
              "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
              "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
              "scrollbar-width": "none", // Hide scrollbar in Firefox
            }}
          >
            <MedicationTable
              tableData={data}
              refetch={refetch}
              pageNo={page}
              size={size}
              setPageNo={(val) => setPage(val)}
              setSize={(val) => setSize(val)}
            />
          </CardBody>
        </>
      )}

      {addMedication && (
        <Modal
          maxWidth={"500px"}
          label="Add Medication"
          handleCloseModal={() => setAddMedication(false)}
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
                handleCreateMedication(
                  {
                    medication_name: medication.medication_name,
                    description: medication.description,
                    dosage: medication.dosage,
                    frequency: medication.frequency,
                    route: medication.route,
                    start_date: dayjs(startDate).format("YYYY-MM-DD"),
                    end_date: dayjs(endDate).format("YYYY-MM-DD"),
                    patient_id: patientId,
                    provider_id: providers[0].id,
                    status: "active",
                    notes: medication.notes,
                  },
                  (res) => {
                    if (res.status === 201) {
                      setAddMedication(false);
                      toast.success("New medication added ");
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
              {isLoading ? <Spinner w="20px" h="20px" /> : "Confirm"}
            </Button>
          </FormControl>
        </Modal>
      )}
    </>
  );
};
