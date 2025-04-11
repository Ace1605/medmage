import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { AppContext } from "contexts/AppContext";
import { useCreatePatient } from "hooks/api/patientManagement/useCreatePatient";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { bloodTypes } from "utils/constants";
import { months } from "utils/constants";
import { getDaysInMonth } from "utils/generators";
import { getAllYears } from "utils/generators";

export const AddPatientForm = ({ setAddPatient, refetchPatients }) => {
  const [name, setName] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [dob, setDob] = useState({
    day: "1",
    month: "01",
    year: "1900",
  });

  const [gender, setGender] = useState("Male");
  const [bloodType, setBloodType] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });
  const [medical, setMedical] = useState({
    allergies: "",
    currentMedications: "",
    history: "",
  });
  const [insurance, setInsurance] = useState({
    hasInsurance: true,
    provider: "",
    policyNumber: "",
  });
  const [additionalInfo, setAdditonalInfo] = useState({
    maritalStatus: "",
    occupation: "",
    notes: "",
  });

  const { token } = useContext(AppContext);

  const { handleCreatePatient, isLoading } = useCreatePatient(token);

  const years = getAllYears();
  const daysInSelectedMonth = getDaysInMonth(dob.month);
  const daysArray = Array.from(
    { length: daysInSelectedMonth },
    (_, i) => i + 1
  );

  const Payload = {
    first_name: name.firstName,
    last_name: name.lastName,
    middle_name: name.middleName,
    date_of_birth: `${dob.year}-${dob.month}-${dob.day}`,
    gender: gender,
    blood_type: bloodType,
    national_id: nationalId,
    phone: phoneNumber,
    email: email,
    address: location.address,
    city: location.city,
    state: location.state,
    zip_code: location.zipCode,
    country: location.country,
    emergency_contact: {
      name: emergencyContact.name,
      phone: emergencyContact.phone,
      relationship: emergencyContact.relationship,
    },

    medical: {
      allergies: medical.allergies,
      current_medications: medical.currentMedications,
      medical_history: medical.history,
    },

    insurance: {
      has_insurance: insurance.hasInsurance,
      insurance_provider: insurance.provider,
      insurance_policy_number: insurance.policyNumber,
    },

    additional_info: {
      marital_status: additionalInfo.maritalStatus,
      occupation: additionalInfo.occupation,
      notes: additionalInfo.notes,
    },
  };

  const hasAllValues = (obj) =>
    Object.values(obj).every((val) =>
      typeof val === "string" ? val.trim() !== "" : true
    );

  const isValid =
    name.firstName.trim() !== "" &&
    name.lastName.trim() !== "" &&
    hasAllValues(dob) &&
    gender &&
    bloodType &&
    nationalId.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    email.trim() !== "" &&
    hasAllValues(location) &&
    hasAllValues(emergencyContact) &&
    (!insurance.hasInsurance || hasAllValues(insurance));

  useEffect(() => {
    if (!insurance.hasInsurance) {
      setInsurance((prev) => ({
        ...prev,
        provider: "",
      }));
      setInsurance((prev) => ({
        ...prev,
        policyNumber: "",
      }));
    }
  }, [insurance.hasInsurance]);
  return (
    <Box>
      <FormControl>
        <Box
          h={{ sm: "40vh", md: "60vh" }}
          mb="10px"
          overflowY={{ sm: "scroll", md: "scroll" }}
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
              md: "repeat(3, 1fr)",
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
                value={name.firstName}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Middle Name
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter middle name"
                fontSize="xs"
                value={name.middleName}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    middleName: e.target.value,
                  }))
                }
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
                value={name.lastName}
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
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Birth Date
                </FormLabel>
                <Select
                  cursor="pointer"
                  variant="main"
                  color="gray.400"
                  fontSize="sm"
                  maxW=""
                  value={dob.month}
                  onChange={(e) =>
                    setDob((prev) => ({
                      ...prev,
                      month: e.target.value,
                    }))
                  }
                >
                  {months.map((month) => {
                    return <option value={month.value}>{month.key}</option>;
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  cursor="pointer"
                  variant="main"
                  color="gray.400"
                  value={dob.day}
                  fontSize="xs"
                  onChange={(e) =>
                    setDob((prev) => ({
                      ...prev,
                      day: e.target.value,
                    }))
                  }
                >
                  {daysArray.map((day) => {
                    return <option value={day}>{day}</option>;
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  variant="main"
                  color="gray.400"
                  fontSize="xs"
                  value={dob.year}
                  onChange={(e) =>
                    setDob((prev) => ({
                      ...prev,
                      year: e.target.value,
                    }))
                  }
                >
                  {years.map((year) => {
                    return <option value={year}>{year}</option>;
                  })}
                </Select>
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Gender
              </FormLabel>
              <Select
                cursor="pointer"
                variant="main"
                color="gray.400"
                fontSize="xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Blood type
              </FormLabel>
              <Select
                cursor="pointer"
                variant="main"
                color="gray.400"
                fontSize="xs"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              >
                {bloodTypes.map((bloodType) => {
                  return <option value={bloodType}>{bloodType}</option>;
                })}
              </Select>
            </FormControl>

            <FormControl minW={{ sm: "35%", lg: null }}>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                National Id
              </FormLabel>
              <Input
                variant="main"
                type="number"
                placeholder="Enter Id number"
                fontSize="xs"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Phone
              </FormLabel>
              <Input
                type="number"
                variant="main"
                placeholder="Enter phone number"
                fontSize="xs"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Email
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter email address"
                fontSize="xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Address
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter home address"
                fontSize="xs"
                value={location.address}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                City
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter city "
                fontSize="xs"
                value={location.city}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                State
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter state"
                fontSize="xs"
                value={location.state}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Country
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter country"
                fontSize="xs"
                value={location.country}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Zip Code
              </FormLabel>
              <Input
                variant="main"
                placeholder="Enter zip code"
                fontSize="xs"
                value={location.zipCode}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
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
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Emergency contact
                </FormLabel>
                <Input
                  variant="main"
                  placeholder="Enter name"
                  fontSize="xs"
                  value={emergencyContact.name}
                  onChange={(e) =>
                    setEmergencyContact((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  variant="main"
                  placeholder="Enter Phone number"
                  fontSize="xs"
                  value={emergencyContact.phone}
                  onChange={(e) =>
                    setEmergencyContact((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  variant="main"
                  placeholder="Enter relationship"
                  fontSize="xs"
                  value={emergencyContact.relationship}
                  onChange={(e) =>
                    setEmergencyContact((prev) => ({
                      ...prev,
                      relationship: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Stack>

            <Stack
              spacing={{ sm: "24px", lg: "15px" }}
              gridColumn={{ base: "1 / -1" }}
            >
              <Grid
                templateColumns={{
                  base: "1fr", // Single column on small screens
                  md: "repeat(2, 1fr)", // Two columns on medium and up
                }}
                alignItems="end"
                gap={4}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Medical
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter allergies"
                    fontSize="xs"
                    value={medical.allergies}
                    onChange={(e) =>
                      setMedical((prev) => ({
                        ...prev,
                        allergies: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    variant="main"
                    placeholder="Enter current medications"
                    fontSize="xs"
                    value={medical.currentMedications}
                    onChange={(e) =>
                      setMedical((prev) => ({
                        ...prev,
                        currentMedications: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl gridColumn={{ base: "auto", md: "1 / -1" }}>
                  <Textarea
                    placeholder="Enter medical history"
                    _placeholder={{ color: "#CBD5E0" }}
                    fontSize="xs"
                    _focus={{
                      borderColor: "gray.300", // Change to desired color
                      boxShadow: "none", // Remove the glow effect
                    }}
                    border="1px solid #e2e8f0"
                    value={medical.history}
                    onChange={(e) =>
                      setMedical((prev) => ({
                        ...prev,
                        history: e.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
            </Stack>

            <Stack
              direction="row"
              spacing={{ sm: "24px", lg: "15px" }}
              align="flex-end"
              gridColumn={{ base: "1 / -1" }}
            >
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Insurance
                </FormLabel>
                <Select
                  cursor="pointer"
                  variant="main"
                  color="gray.400"
                  fontSize="xs"
                  value={insurance.hasInsurance ? "true" : "false"}
                  onChange={(e) =>
                    setInsurance((prev) => ({
                      ...prev,
                      hasInsurance: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
              </FormControl>
              <FormControl>
                <Input
                  disabled={insurance.hasInsurance ? false : true}
                  variant="main"
                  placeholder="Enter Insurance provider"
                  fontSize="xs"
                  value={insurance.provider}
                  onChange={(e) =>
                    setInsurance((prev) => ({
                      ...prev,
                      provider: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  disabled={insurance.hasInsurance ? false : true}
                  variant="main"
                  placeholder="Enter Insurance policy number"
                  fontSize="xs"
                  value={insurance.policyNumber}
                  onChange={(e) =>
                    setInsurance((prev) => ({
                      ...prev,
                      policyNumber: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Stack>

            <Stack
              spacing={{ sm: "24px", lg: "15px" }}
              gridColumn={{ base: "1 / -1" }}
            >
              <Grid
                templateColumns={{
                  base: "1fr", // Single column on small screens
                  md: "repeat(2, 1fr)", // Two columns on medium and up
                }}
                alignItems="end"
                gap={4}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                    Addtional info
                  </FormLabel>
                  <Select
                    cursor="pointer"
                    variant="main"
                    color="gray.400"
                    fontSize="xs"
                    value={additionalInfo.maritalStatus}
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
                <FormControl>
                  <Input
                    variant="main"
                    placeholder="Enter occupation"
                    fontSize="xs"
                    value={additionalInfo.occupation}
                    onChange={(e) =>
                      setAdditonalInfo((prev) => ({
                        ...prev,
                        occupation: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl gridColumn={{ base: "auto", md: "1 / -1" }}>
                  <Textarea
                    placeholder="Enter Notes"
                    _placeholder={{ color: "#CBD5E0" }}
                    fontSize="xs"
                    _focus={{
                      borderColor: "gray.300", // Change to desired color
                      boxShadow: "none", // Remove the glow effect
                    }}
                    border="1px solid #e2e8f0"
                    value={additionalInfo.notes}
                    onChange={(e) =>
                      setAdditonalInfo((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
            </Stack>
          </Grid>
        </Box>

        <Button
          disabled={!isValid}
          fontSize="16px"
          colorScheme="blue"
          fontWeight="bold"
          w="100%"
          h="50"
          mb="10px"
          pt="10px"
          onClick={() => {
            handleCreatePatient(
              Payload,
              (res) => {
                if (res.status === 201) {
                  refetchPatients();
                  toast.success("Patient added successfully");
                  setAddPatient(false);
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
    </Box>
  );
};
