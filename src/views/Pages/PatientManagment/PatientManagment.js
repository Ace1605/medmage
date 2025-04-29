import React, { useContext, useRef, useState } from "react";

// NEW imports

import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  ListItem,
  OrderedList,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import PatientsTable from "components/Tables/PatientsTable";
import { PatientsColumns } from "variables/columnsData";
import { BiUpload } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { DownloadIcon } from "@chakra-ui/icons";
import { AddPatientForm } from "./addPatientForm";
import axios from "axios";
import { AppContext } from "contexts/AppContext";
import { baseUrl } from "baseUrl/baseUrl";
import { useGetPatients } from "hooks/api/management/patient/useGetPatient";
import { MdFolderOff } from "react-icons/md";

function PatientManagment() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("white", "black");
  const [addPatient, setAddPatient] = useState(false);
  const [importPatients, setImportPatients] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { token } = useContext(AppContext);
  const overViewPatientsInfo = [
    {
      label: "Total Patients",
      number: "1,250",
      variance: 3,
      period: "last 7 days",
    },
    {
      label: "New Admissions",
      number: "25",
      variance: 5,
      period: "last 7 days",
    },
    {
      label: "Discharged Patients",
      number: "15",
      variance: -20,
      period: "last 7 days",
    },
    {
      label: "Outpatients",
      number: "300",
      variance: 3,
      period: "last 7 days",
    },
  ];

  const requiredField = [
    "First name",
    "Last name",
    "Age",
    "Marital status",
    "Blood Pressure",
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

  const handleBulkUpload = async (file) => {
    setIsUploading(true);

    if (!file) {
      alert("Please select a CSV file first.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${baseUrl}/patients/upload/csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Patients list uploaded successfully");
      setIsUploading(false);
      setImportPatients(false);
      setCsvFile(null);
      console.log(response);
    } catch (error) {
      setIsUploading(false);
      console.error("Upload failed:", error);
      toast.error("Patients list upload failed");
    }
  };

  const {
    data,
    isLoading,
    refetch: refetchPatients,
    isFetching,
  } = useGetPatients(token, page, size);

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 4 }} spacing="24px" mb="30px">
        {overViewPatientsInfo.map(({ label, number, variance, period }) => {
          return (
            <Card minH="125px">
              <Flex direction="column">
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                  mb="25px"
                >
                  <Stat me="auto">
                    <StatLabel
                      fontSize="xs"
                      color="gray.400"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      {label}
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize="lg"
                        color={textColor}
                        fontWeight="bold"
                      >
                        {number}
                      </StatNumber>
                    </Flex>
                  </Stat>
                </Flex>
                <Text color="gray.400" fontSize="sm">
                  <Text
                    as="span"
                    color={variance >= 0 ? "green.400" : "red.400"}
                    fontWeight="bold"
                    pr="10px"
                  >
                    {`${variance >= 0 ? "+" : ""}${variance}%`}
                  </Text>
                  {period}
                </Text>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
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
              Patients
            </Text>
            <Flex gap="12px" alignItems="center">
              <Button
                px="10px"
                fontSize="14px"
                colorScheme="blue"
                fontWeight="bold"
                minw="90px"
                h="40px"
                onClick={() => setAddPatient(true)}
              >
                Add patient
              </Button>
              <Button
                onClick={() => setImportPatients(true)}
                leftIcon={<BiUpload size="16px" />}
                fontSize="14px"
                fontWeight="normal"
                cursor="pointer"
                variant="outlined"
                minw="90px"
                h="40px"
                borderWidth="2px"
              >
                Bulk invite
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          {isLoading || isFetching ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : data?.data?.length < 1 ? (
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
            <PatientsTable
              tableData={data}
              refetchPatients={refetchPatients}
              columnsData={PatientsColumns}
              pageNo={page}
              size={size}
              setPageNo={(val) => setPage(val)}
              setSize={(val) => setSize(val)}
            />
          )}
        </CardBody>
      </Card>
      {addPatient && (
        <Modal
          maxWidth={"700px"}
          label="Add New Patient"
          handleCloseModal={() => setAddPatient(false)}
        >
          <AddPatientForm
            setAddPatient={setAddPatient}
            refetchPatients={refetchPatients}
          />
        </Modal>
      )}

      {importPatients && (
        <Modal
          maxWidth={"600px"}
          label="Import Patients"
          handleCloseModal={() => setImportPatients(false)}
        >
          <OrderedList pt="10px">
            <Grid gap="15px">
              <Box>
                <ListItem>Download the template</ListItem>
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
              </Box>
              <Box>
                <ListItem>Fill out the fields as follows</ListItem>
                <UnorderedList>
                  {requiredField.map((field, i) => {
                    return <ListItem key={i}>{field}</ListItem>;
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

export default PatientManagment;
