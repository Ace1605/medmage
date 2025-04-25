// Chakra imports
import {
  ArrowBackIcon,
  ChevronDownIcon,
  InfoIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
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
  Switch,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import avatar4 from "assets/img/avatars/avatar4.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { PersonIcon } from "components/Icons/Icons";
import Modal from "components/Modal/Modal";
import VisitationTable from "components/Tables/visitationTable";
import { AppContext } from "contexts/AppContext";
import { useGetPatientById } from "hooks/api/patientManagement/useGetPatientById";
import { useUpdatePatient } from "hooks/api/patientManagement/useUpdatePatient";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { MdMedication } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Element, Link } from "react-scroll";
import { toast } from "sonner";
import visitationData from "variables/visitationData.json";
import { Link as RouteLink } from "react-router-dom";
import { DateTimeRangePicker } from "components/CustomDateTimePicker/CustomDateTimeRangePicker";
import { BasicInfo } from "components/modules/patientManagment/basicInfo";
import { Medication } from "components/modules/patientManagment/medication";
import { useListMedications } from "hooks/api/patientManagement/medication/useListMedication";

function PatientInfo() {
  const { patientId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const bgHoverLinks = useColorModeValue("gray.100", "navy.900");
  const textColor = useColorModeValue("gray.700", "white");
  const { pathname } = useLocation();
  const scrollContainerRef = useRef(null);
  const [isDisplayed, setisDisplayed] = useState(true);
  const [addVisitor, setAddVisitor] = useState(false);
  const [isUpdatingEmergencyContact, setIsUpdatingEmergencyContact] = useState(
    false
  );
  const [isUpdatingMedical, setIsUpdatingMedical] = useState(false);
  const [isUpdatingInsurance, setIsUpdatingInsurance] = useState(false);
  const [isUpdatingAdditionalInfo, setIsUpdatingAdditionalInfo] = useState(
    false
  );

  const {
    isSuperAdmin,
    setIsSuperAdmin,
    toggle,
    setToggle,
    token,
  } = useContext(AppContext);

  const { data, isLoading, error } = useGetPatientById(token, patientId);

  const { handleUpdatePatient } = useUpdatePatient(token);

  if (error) {
    toast.error("Unable to fetch Paitent data");
    navigate(-1);
  }
  useEffect(() => {
    if (isSuperAdmin && !toggle) {
      setisDisplayed(false);
    }
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  const [formData, setFormData] = useState({
    name: { firstName: "", middleName: "", lastName: "" },
    dob: { day: "1", month: "01", year: "1900" },
    gender: "",
    bloodType: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    location: { address: "", city: "", state: "", country: "", zipCode: "" },
    emergencyContact: { name: "", phone: "", relationship: "" },
    medical: { allergies: "", currentMedications: "", history: "" },
    insurance: { hasInsurance: false, provider: "", policyNumber: "" },
    additionalInfo: { maritalStatus: "", occupation: "", notes: "" },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: {
          firstName: data.first_name ?? "",
          middleName: data.middle_name ?? "",
          lastName: data.last_name ?? "",
        },
        dob: {
          day: data.date_of_birth?.slice(-2) ?? "1",
          month: data.date_of_birth?.slice(-5, -3) ?? "01",
          year: data.date_of_birth?.slice(0, 4) ?? "1900",
        },
        gender: data.gender ?? "",
        bloodType: data.blood_type ?? "",
        nationalId: data.national_id ?? "",
        phoneNumber: data.phone ?? "",
        email: data.email ?? "",
        location: {
          address: data.address ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          country: data.country ?? "",
          zipCode: data.zip_code ?? "",
        },
        emergencyContact: {
          name: data.emergency_contacts?.[0]?.name ?? "",
          phone: data.emergency_contacts?.[0]?.phone ?? "",
          relationship: data.emergency_contacts?.[0]?.relationship ?? "",
        },
        medical: {
          allergies: data.medical_records?.allergies ?? "",
          currentMedications: data.medical_records?.current_medications ?? "",
          history: data.medical_records?.medical_history ?? "",
        },
        insurance: {
          hasInsurance: data.insurance_details?.has_insurance ?? false,
          provider: data.insurance_details?.insurance_provider ?? "",
          policyNumber: data.insurance_details?.insurance_policy_number ?? "",
        },
        additionalInfo: {
          maritalStatus: data.additional_info?.marital_status ?? "",
          occupation: data.additional_info?.occupation ?? "",
          notes: data.additional_info?.notes ?? "",
        },
      });
    }
  }, [data]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === "hasInsurance") {
      setFormData((prev) => ({
        ...prev,
        insurance: {
          ...prev.insurance,
          hasInsurance: value === "true",
        },
      }));
    }
  };

  const handleScrollToId = (id) => {
    const container = scrollContainerRef.current;
    const targetElement = document.getElementById(id);
    if (container && targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        container.scrollTop -
        container.getBoundingClientRect().top -
        22;

      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Flex direction="column" pt={{ sm: "70px", lg: "75px" }}>
        <Card
          w={{ sm: "100%", lg: "262px", xl: "21%", "2xl": "23.4%" }}
          position={{ lg: "fixed" }}
          top={{ lg: "105px" }}
          mb="20px"
        >
          <CardBody>
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: " 1fr",
              }}
              spacing={{ sm: "8px", lg: "30px" }}
              w={{ sm: "100%", lg: null }}
              color="gray.500"
            >
              <Link
                to="profile"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("profile")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={PersonIcon}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Profile
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="info"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("info")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={IoDocumentText}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Basic Info
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="emergency-contact"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("emergency-contact")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={PhoneIcon}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Emergency contact
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="medical"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("medical")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={BiPlusMedical}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Medical
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="insurance"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("insurance")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={IoDocumentText}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Insurance
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="medication"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("medication")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={MdMedication}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Medication
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="visitation"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("visitation")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={BsPeopleFill}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Visitation
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Link
                to="additional-info"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => handleScrollToId("additional-info")}
              >
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={InfoIcon}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Additional Infomation
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <RouteLink to={"/admin/patient-management"}>
                <Button
                  variant="no-effects"
                  _hover={{ bg: bgHoverLinks }}
                  w="100%"
                >
                  <Flex align="center" justifySelf="flex-start" w="100%">
                    <Icon
                      as={ArrowBackIcon}
                      me="12px"
                      w="18px"
                      h="18px"
                      color={textColor}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="xs">
                      Go back
                    </Text>
                  </Flex>
                </Button>
              </RouteLink>
            </Grid>
          </CardBody>
        </Card>
        <Box
          ref={scrollContainerRef}
          height={{
            sm: "calc(100svh - 348px)",
            md: "calc(100vh - 310px)",
            lg: "calc(100vh - 145px)",
          }}
          overflowY={{ sm: "scroll", xl: "scroll" }}
          sx={{
            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
            "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
            "scrollbar-width": "none", // Hide scrollbar in Firefox
          }}
        >
          <Stack
            direction="column"
            spacing="24px"
            align={{ lg: "flex-end" }}
            justify={{ lg: "flex-end" }}
            w="100%"
          >
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf={{ lg: "flex-end" }}
              justifySelf={{ lg: "flex-end" }}
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="10vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="profile" name="profile">
                  <CardBody>
                    <Flex
                      direction={{ sm: "column", md: "row" }}
                      justify="space-between"
                      align="center"
                      w="100%"
                    >
                      <Flex align="center">
                        <Avatar src={avatar4} w="80px" h="80px" me="22px" />
                        <Flex direction="column">
                          <Text
                            color={textColor}
                            fontWeight="bold"
                            fontSize="lg"
                          >
                            {data?.first_name ? data?.first_name : "---"}{" "}
                            {data?.last_name ? data?.last_name : "---"}
                          </Text>
                          <Text
                            color="gray.400"
                            fontWeight="normal"
                            fontSize="sm"
                          >
                            {data?.email ? data?.email : "---"}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex
                        align="center"
                        alignSelf={{ sm: "flex-start", lg: null }}
                        mt={{ sm: "16px", lg: null }}
                        ms={{ sm: "6px", lg: null }}
                      >
                        {" "}
                        {isDisplayed && (
                          <>
                            <Text
                              color={textColor}
                              fontWeight="normal"
                              me="14px"
                              fontSize="sm"
                            >
                              Switch to {toggle ? "View mode" : "Edit mode"}
                            </Text>
                            <Switch
                              isChecked={toggle}
                              colorScheme="blue"
                              onChange={() => {
                                setToggle((prev) => !prev);
                                setIsSuperAdmin((prev) => !prev);
                              }}
                            />
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </CardBody>
                </Element>
              )}
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="info" name="info">
                  <BasicInfo
                    formData={formData}
                    queryClient={queryClient}
                    handleChange={handleChange}
                    handleUpdatePatient={handleUpdatePatient}
                    patientId={patientId}
                  />
                </Element>
              )}
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="emergency-contact" name="emergency-contact">
                  <CardHeader mb="40px">
                    <Text color={textColor} fontSize="lg" fontWeight="semibold">
                      Emergency contact
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Stack direction="column" spacing="20px" w="100%">
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Name
                        </FormLabel>
                        <Input
                          name="name"
                          variant="main"
                          placeholder="Enter name"
                          fontSize="xs"
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
                          value={formData.emergencyContact.name}
                          onChange={(e) => handleChange(e, "emergencyContact")}
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Phone Number
                        </FormLabel>
                        <Input
                          type="number"
                          name="phone"
                          variant="main"
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
                          placeholder="Enter Phone number"
                          fontSize="xs"
                          value={formData.emergencyContact.phone}
                          onChange={(e) => handleChange(e, "emergencyContact")}
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Relationship
                        </FormLabel>
                        <Input
                          name="relationship"
                          variant="main"
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
                          placeholder="Enter relationship"
                          fontSize="xs"
                          value={formData.emergencyContact.relationship}
                          onChange={(e) => handleChange(e, "emergencyContact")}
                        />
                      </FormControl>
                      <Flex justify="end" mt="18px">
                        <Button
                          variant="dark"
                          w="150px"
                          h="35px"
                          alignSelf="flex-end"
                          display={isSuperAdmin ? "block" : "none"}
                          onClick={() => {
                            handleUpdatePatient(
                              patientId,
                              {
                                emergency_contact: {
                                  name: formData.emergencyContact.name,
                                  phone: formData.emergencyContact.phone,
                                  relationship:
                                    formData.emergencyContact.relationship,
                                },
                              },
                              (res) => {
                                if (res.status === 200) {
                                  queryClient.invalidateQueries([
                                    "patient",
                                    patientId,
                                  ]);
                                  toast.success("Paitent updated successfully");
                                } else {
                                  toast.error(res?.message);
                                }
                              },
                              (err) => {
                                toast.error(
                                  err?.response?.data?.message ||
                                    "Something went wrong"
                                );
                              },
                              setIsUpdatingEmergencyContact
                            );
                          }}
                        >
                          {isUpdatingEmergencyContact ? (
                            <Spinner w="18px" h="18px" />
                          ) : (
                            " UPDATE"
                          )}
                        </Button>
                      </Flex>
                    </Stack>
                  </CardBody>
                </Element>
              )}
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="medical" name="medical">
                  <CardHeader mb="32px">
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      Medical
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Allergies
                      </FormLabel>
                      <Input
                        name="allergies"
                        variant="main"
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
                        placeholder="Enter allergies"
                        fontSize="xs"
                        value={formData.medical.allergies}
                        onChange={(e) => handleChange(e, "medical")}
                      />
                    </FormControl>
                    <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Current Medications
                      </FormLabel>
                      <Textarea
                        name="currentMedications"
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
                        value={formData.medical.currentMedications}
                        onChange={(e) => handleChange(e, "medical")}
                        _focus={{
                          borderColor: "gray.300",
                          boxShadow: "none",
                        }}
                        border="1px solid #e2e8f0"
                        placeholder="Enter  current medications"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Medical History
                      </FormLabel>
                      <Textarea
                        name="history"
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
                          borderColor: "gray.300",
                          boxShadow: "none",
                        }}
                        border="1px solid #e2e8f0"
                        placeholder="Enter medical history"
                        fontSize="xs"
                        value={formData.medical.history}
                        onChange={(e) => handleChange(e, "medical")}
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                        onClick={() => {
                          handleUpdatePatient(
                            patientId,
                            {
                              medical: {
                                allergies: formData.medical.allergies,
                                current_medications:
                                  formData.medical.currentMedications,
                                medical_history: formData.medical.history,
                              },
                            },
                            (res) => {
                              if (res.status === 200) {
                                queryClient.invalidateQueries([
                                  "patient",
                                  patientId,
                                ]);
                                toast.success("Paitent updated successfully");
                              } else {
                                toast.error(res?.message);
                              }
                            },
                            (err) => {
                              toast.error(
                                err?.response?.data?.message ||
                                  "Something went wrong"
                              );
                            },
                            setIsUpdatingMedical
                          );
                        }}
                      >
                        {isUpdatingMedical ? (
                          <Spinner w="18px" h="18px" />
                        ) : (
                          " UPDATE"
                        )}
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              )}
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="insurance" name="insurance">
                  <CardHeader mb="32px">
                    <Flex direction="column">
                      <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="semibold"
                        mb="4px"
                      >
                        Insurance
                      </Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                      <FormControl mb="16px">
                        <Select
                          name="hasInsurance"
                          cursor="pointer"
                          variant="main"
                          color="gray.400"
                          fontSize="xs"
                          value={
                            formData.insurance.hasInsurance ? "true" : "false"
                          }
                          onChange={(e) => handleChange(e, "insurance")}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Select>
                      </FormControl>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Insurance Provider
                      </FormLabel>
                      <Input
                        variant="main"
                        name="provider"
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
                        disabled={!formData.insurance.hasInsurance}
                        placeholder="Enter insurance provider"
                        fontSize="xs"
                        value={formData.insurance.provider}
                        onChange={(e) => handleChange(e, "insurance")}
                      />
                    </FormControl>
                    <FormControl isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Insurance Policy Number
                      </FormLabel>
                      <Input
                        type="number"
                        variant="main"
                        name="policyNumber"
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
                        disabled={
                          formData.insurance.hasInsurance ? false : true
                        }
                        placeholder="Enter insurance policy number "
                        fontSize="xs"
                        value={formData.insurance.policyNumber}
                        onChange={(e) => handleChange(e, "insurance")}
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                        onClick={() => {
                          handleUpdatePatient(
                            patientId,
                            {
                              insurance: {
                                has_insurance: formData.insurance.hasInsurance,
                                insurance_provider: formData.insurance
                                  .hasInsurance
                                  ? formData.insurance.provider
                                  : "",
                                insurance_policy_number: formData.insurance
                                  .hasInsurance
                                  ? formData.insurance.policyNumber
                                  : "",
                              },
                            },
                            (res) => {
                              if (res.status === 200) {
                                queryClient.invalidateQueries([
                                  "patient",
                                  patientId,
                                ]);
                                toast.success("Paitent updated successfully");
                              } else {
                                toast.error(res?.message);
                              }
                            },
                            (err) => {
                              toast.error(
                                err?.response?.data?.message ||
                                  "Something went wrong"
                              );
                            },
                            setIsUpdatingInsurance
                          );
                        }}
                      >
                        {isUpdatingInsurance ? (
                          <Spinner w="18px" h="18px" />
                        ) : (
                          " UPDATE"
                        )}
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              )}
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              <Element id="medication" name="medication">
                <Medication patientId={patientId} />
              </Element>
            </Card>
            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="visitation" name="medical">
                  <CardHeader mb="32px">
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      pe="8px"
                      px="24px"
                    >
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        Visitation
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
                            onClick={() => setAddVisitor(true)}
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
                    <VisitationTable tableData={visitationData} />
                  </CardBody>
                </Element>
              )}
            </Card>

            <Card
              w={{ sm: "100%", lg: "70%" }}
              alignSelf="flex-end"
              justifySelf="flex-end"
              mb="10px"
            >
              {isLoading ? (
                <Flex
                  width="100% "
                  height="50vh"
                  align="center"
                  justify="center"
                >
                  <Spinner w="40px" h="40px" color="#3182ce" />
                </Flex>
              ) : (
                <Element id="additional-info" name="additional-info">
                  <CardHeader mb="40px">
                    <Flex direction="column">
                      <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="semibold"
                        mb="4px"
                      >
                        Additional Information
                      </Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Marita status
                      </FormLabel>
                      <Select
                        name="maritalStatus"
                        cursor="pointer"
                        variant="main"
                        color="gray.400"
                        fontSize="xs"
                        icon={isSuperAdmin ? <ChevronDownIcon /> : ""}
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
                        value={formData.additionalInfo.maritalStatus}
                        onChange={(e) => handleChange(e, "additionalInfo")}
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Engaged">Engaged</option>
                        <option value="Divored">Divorced</option>
                        <option value="Separated">Separated</option>
                      </Select>
                    </FormControl>
                    <FormControl mb="16px" isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Occupation
                      </FormLabel>
                      <Input
                        name="occupation"
                        variant="main"
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
                        placeholder="Enter occupation"
                        fontSize="xs"
                        value={formData.additionalInfo.occupation}
                        onChange={(e) => handleChange(e, "additionalInfo")}
                      />
                    </FormControl>
                    <FormControl isReadOnly={!isSuperAdmin}>
                      <FormLabel
                        fontWeight="semibold"
                        fontSize="xs"
                        mb="10px"
                        sx={{ _readOnly: { color: "gray.500" } }}
                      >
                        Notes
                      </FormLabel>
                      <Textarea
                        name="notes"
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
                        placeholder="Notes"
                        fontSize="xs"
                        value={formData.additionalInfo.notes}
                        onChange={(e) => handleChange(e, "additionalInfo")}
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                        onClick={() => {
                          handleUpdatePatient(
                            patientId,
                            {
                              additional_info: {
                                marital_status:
                                  formData.additionalInfo.maritalStatus,
                                occupation: formData.additionalInfo.occupation,
                                notes: formData.additionalInfo.notes,
                              },
                            },
                            (res) => {
                              if (res.status === 200) {
                                queryClient.invalidateQueries([
                                  "patient",
                                  patientId,
                                ]);
                                toast.success("Paitent updated successfully");
                              } else {
                                toast.error(res?.message);
                              }
                            },
                            (err) => {
                              toast.error(
                                err?.response?.data?.message ||
                                  "Something went wrong"
                              );
                            },
                            setIsUpdatingAdditionalInfo
                          );
                        }}
                      >
                        {isUpdatingAdditionalInfo ? (
                          <Spinner w="18px" h="18px" />
                        ) : (
                          " UPDATE"
                        )}
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              )}
            </Card>
            {addVisitor && (
              <Modal
                maxWidth={"500px"}
                label="Add a vistor"
                handleCloseModal={() => {
                  setAddVisitor(false);
                }}
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
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Visitor's Name
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter visitor's name"
                          fontSize="xs"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Relationship
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter relationship"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Date
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter visitation date"
                          fontSize="xs"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Time
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter visitation Time"
                          fontSize="xs"
                        />
                      </FormControl>
                    </Grid>
                  </Box>
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Purpose of Visit
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter purpose of visit"
                      fontSize="xs"
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
                      placeholder="Notes"
                      fontSize="xs"
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
                      setAddVisitor(false);
                      toast.success("Successfully added ");
                    }}
                  >
                    Confirm
                  </Button>
                </FormControl>
              </Modal>
            )}
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

export default PatientInfo;
