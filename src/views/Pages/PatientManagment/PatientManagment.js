/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useRef, useState } from "react";

// NEW imports

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
  SimpleGrid,
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
import patientsData from "variables/patientsData.json";
import PatientsTable from "components/Tables/PatientsTable";
import { PatientsColumns } from "variables/columnsData";
import { BiPlus, BiUpload } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { DownloadIcon } from "@chakra-ui/icons";

function PatientManagment() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("white", "black");
  const [addPatient, setAddPatient] = useState(false);
  const [importPatients, setImportPatients] = useState(false);
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
                {/* <Icon
                  as={BiPlus}
                  w="22px"
                  h="22px"
                  color={iconColor}
                  cursor="pointer"
                  ms="8px"
                /> */}
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
          <PatientsTable
            tableData={patientsData}
            columnsData={PatientsColumns}
          />
        </CardBody>
      </Card>
      {addPatient && (
        <Modal
          maxWidth={"500px"}
          label="Add New Patient"
          handleCloseModal={() => setAddPatient(false)}
        >
          <FormControl>
            <Box
              h={{ sm: "40vh", md: "100%" }}
              overflowY={{ sm: "scroll", md: "" }}
              sx={{
                "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
                "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                "scrollbar-width": "none", // Hide scrollbar in Firefox
              }}
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
                    First Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter first name"
                    fontSize="xs"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Last Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter last name"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Age
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="DD-MM-YYYY"
                    fontSize="xs"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Sex
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    color="gray.400"
                    fontSize="xs"
                    isReadOnly
                  >
                    <option value="male" selected>
                      Male
                    </option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Religion
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    color="gray.400"
                    fontSize="xs"
                    isReadOnly
                  >
                    <option value="christain" selected>
                      Christian
                    </option>
                    <option value="muslim">Muslim</option>
                    <option value="muslim">Other</option>
                  </Select>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Occupation
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    color="gray.400"
                    fontSize="xs"
                    isReadOnly
                  >
                    <option value="civil servant" selected>
                      Civil servant
                    </option>
                    <option value="enterprenure">Enterprenure</option>
                    <option value="retired">Retired</option>
                  </Select>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Marital status
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    color="gray.400"
                    fontSize="xs"
                    isReadOnly
                  >
                    <option value="single" selected>
                      Single
                    </option>
                    <option value="married">Married</option>
                    <option value="engaged">Engaged</option>
                    <option value="divored">Divorced</option>
                    <option value="separated">Separated</option>
                  </Select>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Blood Pressure rate
                  </FormLabel>
                  <Flex alignItems="center " gap="10px">
                    <Input
                      variant="main"
                      type="number"
                      placeholder="SDP"
                      fontSize="xs"
                    />
                    <Box w="22px" h="2px" bg="black" />
                    <Input
                      variant="main"
                      type="number"
                      placeholder="DBP"
                      fontSize="xs"
                    />
                  </Flex>
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Pluse Rate
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter Pluse"
                    fontSize="xs"
                  />
                </FormControl>
                <FormControl minW={{ sm: "35%", lg: null }}>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Temperature
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter temperature"
                    fontSize="xs"
                  />
                </FormControl>
              </Grid>
            </Box>

            <Button
              fontSize="16px"
              colorScheme="blue"
              fontWeight="bold"
              w="100%"
              h="50"
              mb="10px"
              onClick={() => {
                setAddPatient(false);
                toast.success("Patient added successfully");
              }}
            >
              Confirm
            </Button>
          </FormControl>
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
                  h="40px"
                  borderWidth="2px"
                >
                  CSV template
                </Button>
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
              setImportPatients(false);
              setCsvFile(null);
              toast.success("Patients list uploaded successfully");
            }}
          >
            Upload
          </Button>
        </Modal>
      )}
    </Flex>
  );
}

export default PatientManagment;
