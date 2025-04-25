import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { AppContext } from "contexts/AppContext";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { bloodTypes } from "utils/constants";
import { months } from "utils/constants";
import { getDaysInMonth } from "utils/generators";
import { getAllYears } from "utils/generators";
export const BasicInfo = (props) => {
  const {
    formData,
    queryClient,
    handleChange,
    handleUpdatePatient,
    patientId,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const [isUpdatingBasicInfo, setIsUpdatingBasicInfo] = useState(false);
  const { isSuperAdmin } = useContext(AppContext);

  const years = getAllYears();
  const daysInSelectedMonth = getDaysInMonth(formData.dob.month);
  const daysArray = Array.from(
    { length: daysInSelectedMonth },
    (_, i) => i + 1
  );
  return (
    <>
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
              name="firstName"
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
              value={formData.name.firstName}
              onChange={(e) => handleChange(e, "name")}
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
              name="middleName"
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
              value={formData.name.middleName}
              onChange={(e) => handleChange(e, "name")}
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
              name="lastName"
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
              value={formData.name.lastName}
              onChange={(e) => handleChange(e, "name")}
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
                name="month"
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
                value={formData.dob.month}
                onChange={(e) => handleChange(e, "dob")}
              >
                {months.map((month, i) => {
                  return (
                    <option key={i} value={month.value}>
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
                name="day"
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
                value={formData.dob.day}
                onChange={(e) => handleChange(e, "dob")}
              >
                {daysArray.map((day, i) => {
                  return (
                    <option key={i} value={day}>
                      {day}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl isReadOnly={!isSuperAdmin}>
              <Select
                name="year"
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
                value={formData.dob.year}
                onChange={(e) => handleChange(e, "dob")}
              >
                {years.map((year, i) => {
                  return (
                    <option key={i} value={year}>
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
              name="gender"
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
              value={formData.gender}
              onChange={(e) => handleChange(e)}
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
              name="bloodType"
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
              value={formData.bloodType}
              onChange={(e) => handleChange(e)}
            >
              {bloodTypes.map((bloodType, i) => {
                return (
                  <option key={i} value={bloodType}>
                    {bloodType}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <FormControl minW={{ sm: "35%", lg: null }}>
            <FormLabel
              fontWeight="semibold"
              fontSize="xs"
              mb="10px"
              sx={{ _readOnly: { color: "gray.500" } }}
            >
              National Id
            </FormLabel>
            <Input
              disabled
              name="nationalId"
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
              value={formData.nationalId}
              onChange={(e) => handleChange(e)}
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
              name="phoneNumber"
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
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e)}
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
              disabled
              name="email"
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
              value={formData.email}
              onChange={(e) => handleChange(e)}
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
              name="address"
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
              value={formData.location.address}
              onChange={(e) => handleChange(e, "location")}
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
              name="city"
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
              value={formData.location.city}
              onChange={(e) => handleChange(e, "location")}
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
              name="state"
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
              value={formData.location.state}
              onChange={(e) => handleChange(e, "location")}
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
              type="number"
              name="zipCode"
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
              value={formData.location.zipCode}
              onChange={(e) => handleChange(e, "location")}
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
              name="country"
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
              value={formData.location.country}
              onChange={(e) => handleChange(e, "location")}
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
            onClick={() => {
              handleUpdatePatient(
                patientId,
                {
                  first_name: formData.name.firstName,
                  middle_name: formData.name.middleName,
                  last_name: formData.name.lastName,
                  date_of_birth: `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`,
                  gender: formData.gender,
                  blood_type: formData.bloodType,
                  national_id: formData.nationalId,
                  phone: formData.phoneNumber,
                  email: formData.email,
                  address: formData.location.address,
                  city: formData.location.city,
                  state: formData.location.state,
                  country: formData.location.country,
                  zip_code: formData.location.zipCode,
                },
                (res) => {
                  if (res.status === 200) {
                    queryClient.invalidateQueries(["patient", patientId]);
                    toast.success("Paitent updated successfully");
                  } else {
                    toast.error(res?.message);
                  }
                },
                (err) => {
                  toast.error(
                    err?.response?.data?.message || "Something went wrong"
                  );
                },
                setIsUpdatingBasicInfo
              );
            }}
          >
            {isUpdatingBasicInfo ? <Spinner w="18px" h="18px" /> : " UPDATE"}
          </Button>
        </Flex>
      </CardBody>
    </>
  );
};
