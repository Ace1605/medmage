import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Modal from "components/Modal/Modal";
import MultiSelect from "components/MultiSelect/MultiSelect";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "sonner";

function Todos() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("white", "black");
  const [addTodo, setAddTodo] = useState(false);

  const options = [
    "Dammy Ayobami",
    "Jay Ademola",
    "Achugo Ebuka",
    "Kevin Akaluzia",
    "Gilbert Emeka",
    "Samuel Davis",
  ];

  const Todos = [
    {
      todoName: "Call with Kevin",
      startTime: "09:30 AM",
      isCompleted: true,
      date: "11/03/2025",
      assignee: "Samuel Davis",
    },
    {
      todoName: "Prepare Reports for Administration",
      startTime: "02:30 PM",
      isCompleted: false,
      date: "13/02/2025",
      assignee: "Kevin Akaluzia",
    },
    {
      todoName: "Assign Nurse & Doctor Shifts ",
      startTime: "07:00 AM",
      isCompleted: false,
      date: "11/03/2025",
      assignee: "Jay Ademola",
    },
    {
      todoName: "Order New Medical Equipment  ",
      startTime: "10:12 AM",
      isCompleted: true,
      date: "11/03/2025",
      assignee: "Gilbert Emeka",
    },
    {
      todoName: "Restock Medications & Supplies ",
      startTime: "12:00 PM",
      isCompleted: true,
      date: "11/03/2025",
      assignee: "Dammy Ayobami",
    },
    {
      todoName: "Update Hospital Management Software",
      startTime: "03:40 PM",
      isCompleted: false,
      date: "11/03/2025",
      assignee: "Mayaki Augustine",
    },
    {
      todoName: "Update Patient Records",
      startTime: "08:25 AM",
      isCompleted: false,
      date: "11/03/2025",
      assignee: "Dammy Ayobami",
    },
    {
      todoName: "Attend Medical conference",
      startTime: "09:00 AM",
      isCompleted: false,
      date: "11/03/2025",
      assignee: "Achugo Ebuka",
    },
  ];

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        padding="24px"
        borderRadius="22px"
        height={{ sm: "calc(100vh - 180px)", md: "calc(100vh - 140px)" }}
      >
        <Flex direction="column">
          <CardHeader p="0px">
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text color={textColor} fontSize="xl" fontWeight="bold" mb="14px">
                To Do List
              </Text>
              <Button
                px="10px"
                fontSize="14px"
                colorScheme="blue"
                fontWeight="bold"
                w="90px"
                h="40px"
                onClick={() => setAddTodo(true)}
              >
                Add
                <Icon
                  as={BiPlus}
                  w="22px"
                  h="22px"
                  color={iconColor}
                  cursor="pointer"
                  ms="8px"
                />
              </Button>
            </Flex>
          </CardHeader>
          <Stack
            direction="column"
            spacing="14px"
            height={{
              sm: "calc(100vh - 281px)",
              md: "calc(100vh - 240px)",
              lg: "calc(100vh - 250px)",
            }}
            gap="15px"
            overflowY={{ sm: "scroll" }}
            sx={{
              "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit (Chrome, Safari)
              "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
              "scrollbar-width": "none", // Hide scrollbar in Firefox
            }}
          >
            {Todos.map(
              ({ todoName, assignee, isCompleted, startTime, date }) => {
                return (
                  <Flex
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    py="12px"
                  >
                    <Flex direction="column">
                      <Text
                        color={textColor}
                        fontWeight="bold"
                        fontSize="md"
                        mb="3.5px"
                      >
                        {todoName}
                      </Text>
                      <Flex alignItems="center" gap="8px">
                        <Text color="gray.400" fontSize="sm">
                          {startTime}
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          {date}
                        </Text>

                        <Tooltip label={assignee} hasArrow>
                          <Avatar name={assignee} size="xs" cursor="pointer" />
                        </Tooltip>
                      </Flex>
                    </Flex>
                    <Checkbox
                      colorScheme="blue"
                      defaultChecked={isCompleted}
                      size="lg"
                    />
                  </Flex>
                );
              }
            )}
          </Stack>
        </Flex>
      </Card>
      {addTodo && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label="Add To do"
          handleCloseModal={() => setAddTodo(false)}
        >
          <FormControl>
            <Box pb="15px">
              <Box>
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
                      placeholder="Enter event name"
                      fontSize="xs"
                    />
                  </FormControl>
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      sm: "1fr",
                      md: "repeat(2, 1fr)",
                    }}
                    gap="15px"
                  >
                    <FormControl width="100%">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Date
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter date"
                        fontSize="xs"
                      />
                    </FormControl>

                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap="10px"
                    >
                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          Start Time
                        </FormLabel>
                        <Input
                          variant="main"
                          type="number"
                          placeholder="Start time "
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontWeight="semibold"
                          fontSize="xs"
                          mb="10px"
                        >
                          End Time
                        </FormLabel>
                        <Input
                          variant="main"
                          type="text"
                          placeholder="End time"
                          fontSize="xs"
                        />
                      </FormControl>
                    </Flex>
                  </Grid>
                </Grid>
              </Box>
              <MultiSelect
                label="Select Member"
                selectedLabel="member"
                options={options}
                disableOthersOnSelect
              />
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
                onClick={() => setAddTodo(false)}
              >
                Cancel
              </Button>
              <Button
                fontSize="16px"
                colorScheme="blue"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="10px"
                onClick={() => {
                  setAddTodo(false);
                  toast.success("To do assigned successfully");
                }}
              >
                Confirm
              </Button>
            </Flex>
          </FormControl>
        </Modal>
      )}
    </Flex>
  );
}
export default Todos;
