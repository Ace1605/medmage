import React, { useContext, useRef, useState } from "react";
import {
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  useColorMode,
  FormLabel,
  Input,
  Select,
  Button,
  FormControl,
  ListItem,
  UnorderedList,
  OrderedList,
  Box,
  Spinner,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import bgCardReports from "assets/img/background-card-reports.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import { FaUser } from "react-icons/fa";
import UsersTable from "components/Tables/UsersTable";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { BiUpload } from "react-icons/bi";
import { DownloadIcon } from "@chakra-ui/icons";
import { useGetUsers } from "hooks/api/management/users/useGetUsers";
import { AppContext } from "contexts/AppContext";
import { useGetUserRoles } from "hooks/api/management/users/useGetUserRoles";
import { useInviteUser } from "hooks/api/management/users/useInviteUser";
import { baseUrl } from "baseUrl/baseUrl";
import axios from "axios";

function Users() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("white", "black");
  const { colorMode } = useColorMode();

  const [addUser, setAddUser] = useState(false);
  const [importUsers, SetImportUsers] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { token } = useContext(AppContext);
  const { data: roles, isLoading: gettingRoles, refetch } = useGetUserRoles(
    token
  );
  const [isUploading, setIsUploading] = useState(false);

  const { handleInviteUser, isLoading: isInviting } = useInviteUser(token);

  const requiredField = [
    "Email",
    "Role: Please select from, ADMIN, DOCTOR or  NURSE",
  ];

  const fileInputRef = useRef(null);
  const [csvFile, setCsvFile] = useState(null);

  const { data, isLoading, refetch: refetchUsers, isFetching } = useGetUsers(
    token
  );

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
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${baseUrl}/users/upload/csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetchUsers();
      toast.success("Users list uploaded successfully");
      setIsUploading(false);
      SetImportUsers(false);
      setCsvFile(null);
      console.log(response);
    } catch (error) {
      setIsUploading(false);
      console.error("Upload failed:", error);
    }
  };

  return (
    <Flex direction="column" pt={{ base: "150px", lg: "75px" }}>
      <Grid templateColumns={{ md: "1fr" }} gap="24px" mb="26px">
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap="24px">
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      1600
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Users Active
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +55%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card
            bgImage={
              colorMode === "light"
                ? bgCardReports
                : "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
            }
            minH="168px"
          >
            <CardBody h="100%">
              <Flex
                direction="column"
                justify="space-between"
                w="100%"
                h="100%"
              >
                <Flex justify="space-between" w="100%">
                  <IconBox bg="#fff" w="50px" h="50px">
                    <Icon as={FaUser} w="25px" h="25px" color="blue.900" />
                  </IconBox>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Flex direction="column">
                    <Text color="#fff" fontWeight="bold" fontSize="md">
                      357
                    </Text>
                    <Text
                      color={secondaryColor}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Inactive users
                    </Text>
                  </Flex>
                  <Text
                    color="#fff"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="flex-end"
                  >
                    +124%
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </Grid>

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
              Users
            </Text>{" "}
            <Flex gap="12px" alignItems="center">
              <Button
                disabled={gettingRoles}
                _disabled={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                  _hover: { bg: "#3182ce" },
                }}
                px="10px"
                fontSize="14px"
                colorScheme="blue"
                fontWeight="bold"
                w="90px"
                h="40px"
                onClick={() => setAddUser(true)}
              >
                Add user
              </Button>
              <Button
                onClick={() => SetImportUsers(true)}
                leftIcon={<BiUpload size="16px" />}
                fontSize="14px"
                fontWeight="normal"
                cursor="pointer"
                variant="outlined"
                minw="90px"
                h="40px"
                borderWidth="2px"
              >
                Import
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          {isLoading || isFetching ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : (
            <UsersTable tableData={data} refetchUsers={refetchUsers} />
          )}
        </CardBody>
      </Card>

      {addUser && (
        <Modal
          maxWidth={"500px"}
          label="Invite New User"
          handleCloseModal={() => {
            setAddUser(false);
            setSelectedRoles([]);
            setEmail("");
          }}
        >
          <FormControl>
            <FormLabel ms="4px" mt="8px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              value={email}
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Enter user's email address"
              mb="24px"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="bold"
                color={textColor}
              >
                Select Role(s)
              </FormLabel>
              <CheckboxGroup
                colorScheme="blue"
                value={selectedRoles}
                onChange={(values) => setSelectedRoles(values)}
              >
                <Stack spacing={2}>
                  {roles.map(({ name, id }) => (
                    <Checkbox key={id} value={name} textTransform="capitalize">
                      {name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
              <Flex
                alignItems="center"
                justifyContent="space-evenly"
                gap="15px"
                mt="30px"
              >
                <Button
                  fontSize="16px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  px="30px"
                  onClick={() => {
                    setAddUser(false);
                    setSelectedRoles([]);
                    setEmail("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fontSize="16px"
                  colorScheme="blue"
                  fontWeight="bold"
                  w="100%"
                  h="50"
                  mb="10px"
                  onClick={() => {
                    handleInviteUser(
                      [
                        {
                          email: email,
                          roles: selectedRoles.map((role) => role),
                        },
                      ],
                      (res) => {
                        if (res.status === 200) {
                          toast.success("New user invited successfully");
                          refetchUsers();
                          setAddUser(false);
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
                  {isInviting ? <Spinner w="18px" h="18px" /> : "Invite"}
                </Button>
              </Flex>
            </FormControl>
          </FormControl>
        </Modal>
      )}
      {importUsers && (
        <Modal
          maxWidth={"600px"}
          label="Import Users"
          handleCloseModal={() => SetImportUsers(false)}
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

export default Users;
