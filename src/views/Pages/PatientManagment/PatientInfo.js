// Chakra imports
import { ChevronDownIcon, InfoIcon, PhoneIcon } from "@chakra-ui/icons";
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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import FullScreenLoader from "components/FullScreenLoader/FullScreenLoader";
import { PersonIcon } from "components/Icons/Icons";
import Modal from "components/Modal/Modal";
import MedicationTable from "components/Tables/MedicationTable";
import VisitationTable from "components/Tables/visitationTable";
import { AppContext } from "contexts/AppContext";
import { useGetPatientById } from "hooks/api/patientManagement/useGetPatientById";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { MdMedication } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Element, Link } from "react-scroll";
import { toast } from "sonner";
import { bloodTypes } from "utils/constants";
import { months } from "utils/constants";
import { getDaysInMonth } from "utils/generators";
import { getAllYears } from "utils/generators";
import medicationData from "variables/medicationData.json";
import visitationData from "variables/visitationData.json";

function PatientInfo() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const bgHoverLinks = useColorModeValue("gray.100", "navy.900");
  const textColor = useColorModeValue("gray.700", "white");
  const { pathname } = useLocation();
  const scrollContainerRef = useRef(null);
  const [isDisplayed, setisDisplayed] = useState(true);
  const [addMedication, setAddMedication] = useState(false);
  const [addVisitor, setAddVisitor] = useState(false);
  const {
    isSuperAdmin,
    setIsSuperAdmin,
    toggle,
    setToggle,
    token,
  } = useContext(AppContext);

  const { data, isLoading, error } = useGetPatientById(token, patientId);

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

  const [name, setName] = useState({
    firstName: data?.first_name ?? "",
    middleName: data?.middle_name ?? "",
    lastName: data?.last_name ?? "",
  });

  const [dob, setDob] = useState({
    day: data?.birth_date?.slice(-2) ?? "1",
    month: data?.birth_date?.slice(-5, -3) ?? "01",
    year: data?.birth_date?.slice(0, 4) ?? "1900",
  });

  const [gender, setGender] = useState(data?.gender ?? "");
  const [bloodType, setBloodType] = useState(data?.blood_type ?? "");
  const [nationalId, setNationalId] = useState(data?.national_id ?? "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phone ?? "");
  const [email, setEmail] = useState(data?.email);

  const [location, setLocation] = useState({
    address: data?.address ?? "",
    city: data?.city ?? "",
    state: data?.state ?? "",
    country: data?.country ?? "",
    zipCode: data?.zip_code ?? "",
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: data?.emergency_contacts?.[0]?.name ?? "",
    phone: data?.emergency_contacts?.[0]?.phone ?? "",
    relationship: data?.emergency_contacts?.[0]?.relationship ?? "",
  });
  const [medical, setMedical] = useState({
    allergies: data?.medical_records?.allergies ?? "",
    currentMedications: data?.medical_records?.current_medications ?? "",
    history: data?.medical_records?.medical_history ?? "",
  });
  const [insurance, setInsurance] = useState({
    hasInsurance: data?.insurance_details?.has_insurance ?? true,
    provider: data?.insurance_details?.insurance_provider ?? "",
    policyNumber: data?.insurance_details?.insurance_policy_number ?? "",
  });
  const [additionalInfo, setAdditonalInfo] = useState({
    maritalStatus: data?.additional_info?.marital_status ?? "",
    occupation: data?.additional_info?.occupation ?? "",
    notes: data?.additional_info?.notes ?? "",
  });

  const years = getAllYears();
  const daysInSelectedMonth = getDaysInMonth(dob.month);
  const daysArray = Array.from(
    { length: daysInSelectedMonth },
    (_, i) => i + 1
  );

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
      {isLoading ? (
        <FullScreenLoader />
      ) : (
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
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
                <Element id="info" name="info">
                  <CardHeader mb="40px">
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      Basic Info
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        sm: "1fr",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(3, 1fr)",
                      }}
                      gap="15px"
                      spacing={{ sm: "8px", lg: "30px" }}
                      w={{ sm: "100%", lg: null }}
                    >
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          First Name
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter first name"
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
                          value={data?.first_name ?? ""}
                          onChange={(e) =>
                            setName((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Middle Name
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter middle name"
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
                          value={data?.middle_name ?? ""}
                          onChange={(e) =>
                            setName((prev) => ({
                              ...prev,
                              middleName: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Last Name
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter last name"
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
                          value={data?.last_name ?? ""}
                          onChange={(e) =>
                            setName((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                        />
                      </FormControl>

                      <Stack
                        direction="row"
                        spacing={{ sm: "24px", lg: "15px" }}
                        align="flex-end"
                        gridColumn={{ base: "1 / -1" }}
                      >
                        <FormControl isReadOnly={!isSuperAdmin}>
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                            sx={{ _readOnly: { color: "gray.500" } }}
                          >
                            Birth Date
                          </FormLabel>
                          <Select
                            cursor="pointer"
                            variant="main"
                            color="gray.400"
                            fontSize="sm"
                            maxW=""
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
                            value={data?.birth_date?.slice(-5, -3) ?? "01"}
                            onChange={(e) =>
                              setDob((prev) => ({
                                ...prev,
                                month: e.target.value,
                              }))
                            }
                          >
                            {months.map((month) => {
                              return (
                                <option key={month} value={month.value}>
                                  {month.key}
                                </option>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <FormControl isReadOnly={!isSuperAdmin}>
                          <Select
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
                            value={data?.birth_date?.slice(-2) ?? "1"}
                            onChange={(e) =>
                              setDob((prev) => ({
                                ...prev,
                                day: e.target.value,
                              }))
                            }
                          >
                            {daysArray.map((day) => {
                              return (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <FormControl isReadOnly={!isSuperAdmin}>
                          <Select
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
                            value={data?.birth_date?.slice(0, 4) ?? "1900"}
                            onChange={(e) =>
                              setDob((prev) => ({
                                ...prev,
                                year: e.target.value,
                              }))
                            }
                          >
                            {years.map((year) => {
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Stack>

                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          sx={{ _readOnly: { color: "gray.500" } }}
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Gender
                        </FormLabel>
                        <Select
                          cursor="pointer"
                          variant="main"
                          color="gray.700"
                          fontSize="xs"
                          icon={isSuperAdmin ? <ChevronDownIcon /> : ""}
                          disabled={!isSuperAdmin}
                          isReadOnly={isSuperAdmin ? false : true}
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
                          value={data?.gender ?? ""}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                      </FormControl>

                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Blood type
                        </FormLabel>
                        <Select
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
                          value={data?.blood_type ?? ""}
                          onChange={(e) => setBloodType(e.target.value)}
                        >
                          {bloodTypes.map((bloodType) => {
                            return (
                              <option key={bloodType} value={bloodType}>
                                {bloodType}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>

                      <FormControl
                        minW={{ sm: "35%", lg: null }}
                        isReadOnly={!isSuperAdmin}
                      >
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          National Id
                        </FormLabel>
                        <Input
                          variant="main"
                          type="number"
                          placeholder="Enter Id number"
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
                          value={data?.national_id ?? ""}
                          onChange={(e) => setNationalId(e.target.value)}
                        />
                      </FormControl>

                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Phone
                        </FormLabel>
                        <Input
                          type="number"
                          variant="main"
                          placeholder="Enter phone number"
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
                          value={data?.phone ?? ""}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Email
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter email address"
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
                          value={data?.email ?? ""}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>

                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Address
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter home address"
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
                          value={data?.address ?? ""}
                          onChange={(e) =>
                            setLocation((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          City
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter city "
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
                          value={data?.city ?? ""}
                          onChange={(e) =>
                            setLocation((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          State
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter state"
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
                          value={data?.state ?? ""}
                          onChange={(e) =>
                            setLocation((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Zip Code
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter zip code"
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
                          value={data?.zip_code ?? ""}
                          onChange={(e) =>
                            setLocation((prev) => ({
                              ...prev,
                              zipCode: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl isReadOnly={!isSuperAdmin}>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                          sx={{ _readOnly: { color: "gray.500" } }}
                        >
                          Country
                        </FormLabel>
                        <Input
                          variant="main"
                          placeholder="Enter country"
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
                          value={data?.country ?? ""}
                          onChange={(e) =>
                            setLocation((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Flex justify="end" mt="18px">
                      <Button
                        display={isSuperAdmin ? "block" : "none"}
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                      >
                        UPDATE
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
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
                          variant="main"
                          placeholder=""
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
                          value={data?.emergency_contacts?.[0]?.name ?? ""}
                          onChange={(e) =>
                            setEmergencyContact((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
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
                          placeholder=""
                          fontSize="xs"
                          value={data?.emergency_contacts?.[0]?.phone ?? ""}
                          onChange={(e) =>
                            setEmergencyContact((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
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
                          placeholder=""
                          fontSize="xs"
                          value={
                            data?.emergency_contacts?.[0]?.relationship ?? ""
                          }
                          onChange={(e) =>
                            setEmergencyContact((prev) => ({
                              ...prev,
                              relationship: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <Flex justify="end" mt="18px">
                        <Button
                          variant="dark"
                          w="150px"
                          h="35px"
                          alignSelf="flex-end"
                          display={isSuperAdmin ? "block" : "none"}
                        >
                          UPDATE
                        </Button>
                      </Flex>
                    </Stack>
                  </CardBody>
                </Element>
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
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
                        placeholder=""
                        fontSize="xs"
                        value={data?.medical_records?.allergies ?? ""}
                        onChange={(e) =>
                          setMedical((prev) => ({
                            ...prev,
                            allergies: e.target.value,
                          }))
                        }
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
                        value={data?.medical_records?.current_medications ?? ""}
                        onChange={(e) =>
                          setMedical((prev) => ({
                            ...prev,
                            currentMedications: e.target.value,
                          }))
                        }
                        _focus={{
                          borderColor: "gray.300",
                          boxShadow: "none",
                        }}
                        border="1px solid #e2e8f0"
                        placeholder=""
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
                        placeholder=""
                        fontSize="xs"
                        value={data?.medical_records?.medical_history ?? ""}
                        onChange={(e) =>
                          setMedical((prev) => ({
                            ...prev,
                            history: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                      >
                        UPDATE
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
                <Element id="insurance" name="insurance">
                  <CardHeader mb="40px">
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
                        placeholder=""
                        fontSize="xs"
                        value={
                          data?.insurance_details?.insurance_provider ?? ""
                        }
                        onChange={(e) =>
                          setInsurance((prev) => ({
                            ...prev,
                            provider: e.target.value,
                          }))
                        }
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
                        placeholder=""
                        fontSize="xs"
                        value={
                          data?.insurance_details?.insurance_policy_number ?? ""
                        }
                        onChange={(e) =>
                          setInsurance((prev) => ({
                            ...prev,
                            policyNumber: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                      >
                        UPDATE
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
                <Element id="medication" name="medical">
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
                    <MedicationTable tableData={medicationData} />
                  </CardBody>
                </Element>
              </Card>
              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
              >
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
              </Card>

              <Card
                w={{ sm: "100%", lg: "70%" }}
                alignSelf="flex-end"
                justifySelf="flex-end"
                mb="10px"
              >
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
                        value={data?.additional_info?.marital_status ?? ""}
                        onChange={(e) =>
                          setAdditonalInfo((prev) => ({
                            ...prev,
                            maritalStatus: e.target.value,
                          }))
                        }
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
                        placeholder=""
                        fontSize="xs"
                        value={data?.additional_info?.occupation ?? ""}
                        onChange={(e) =>
                          setAdditonalInfo((prev) => ({
                            ...prev,
                            occupation: e.target.value,
                          }))
                        }
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
                        value={data?.additional_info?.notes ?? ""}
                        onChange={(e) =>
                          setAdditonalInfo((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Flex justify="end" mt="18px">
                      <Button
                        variant="dark"
                        w="150px"
                        h="35px"
                        alignSelf="flex-end"
                        display={isSuperAdmin ? "block" : "none"}
                      >
                        UPDATE
                      </Button>
                    </Flex>
                  </CardBody>
                </Element>
              </Card>

              {/* <Card
          w={{ sm: "100%", lg: "70%" }}
          alignSelf="flex-end" display={isSuperAdmin ? "block" : "none"}
          justifySelf="flex-end"
        >
          <Element id="delete-account" name="delete-account">
            <CardHeader mb="40px">
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="4px"
                >
                  Delete Account
                </Text>
                <Text color="gray.400" fontWeight="normal" fontSize="sm">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                justify="space-between"
                align="start"
                w="100%"
              >
                <Flex align="center" mb={{ sm: "16px", lg: null }}>
                  <Switch colorScheme="blue" me="22px" />
                  <Flex direction="column">
                    <Text
                      fontSize="sm"
                      color={textColor}
                      mb="4px"
                      fontWeight="semibold"
                    >
                      Confirm
                    </Text>
                    <Text color="gray.400" fontWeight="normal" fontSize="xs">
                      I want to delete my account.
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="center">
                  <Button
                    variant="outline"
                    colorScheme="black"
                    w="120px"
                    h="35px"
                    fontSize="10px"
                    me="14px"
                  >
                    DEACTIVATE
                  </Button>
                  <Button variant="danger" w="150px" h="35px" fontSize="10px">
                    DELETE ACCOUNT
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Element>
        </Card> */}
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
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Name
                          </FormLabel>
                          <Input
                            variant="main"
                            placeholder="Enter medication name"
                            fontSize="xs"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Dosage
                          </FormLabel>
                          <Input
                            variant="main"
                            placeholder="Enter dosage"
                            fontSize="xs"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Route
                          </FormLabel>
                          <Input
                            variant="main"
                            placeholder="Enter route"
                            fontSize="xs"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Frequency
                          </FormLabel>
                          <Input
                            variant="main"
                            placeholder="Enter frequency"
                            fontSize="xs"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            fontWeight="semibold"
                            fontSize="xs"
                            mb="10px"
                          >
                            Duration
                          </FormLabel>
                          <Input
                            variant="main"
                            placeholder="Enter dureation"
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
                            type="text"
                            placeholder="Enter Date "
                            fontSize="xs"
                          />
                        </FormControl>
                      </Grid>
                    </Box>

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
                        setAddMedication(false);
                        toast.success("New medication added ");
                      }}
                    >
                      Confirm
                    </Button>
                  </FormControl>
                </Modal>
              )}

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
                        placeholder="notes"
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
      )}
    </>
  );
}

export default PatientInfo;
