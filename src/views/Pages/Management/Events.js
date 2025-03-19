import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import eventsData from "variables/eventsData.json";
import EventsTable from "components/Tables/EventsTable";
import { EventsColumns } from "variables/columnsData";
import { BiPlus } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { useState } from "react";
import {} from "components/MultiSelect/MultiSelect";
import MultiSelect from "components/MultiSelect/MultiSelect";

function Events() {
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const iconColor = useColorModeValue("white", "black");
  const [createEvent, setCreateEvent] = useState(false);

  const options = [
    "Dammy Ayobami",
    "Jay Ademola",
    "Achugo Ebuka",
    "Kevin Akaluzia",
    "Gilbert Emeka",
    "Samuel Davis",
  ];

  const preselected = ["Achugo Ebuka", "Kevin Akaluzia"];
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
              Events
            </Text>
            <Button
              px="10px"
              fontSize="12px"
              colorScheme="blue"
              fontWeight="bold"
              w="90px"
              h="40px"
              onClick={() => setCreateEvent(true)}
            >
              Add
              <Icon
                as={BiPlus}
                w="24px"
                h="24px"
                color={iconColor}
                cursor="pointer"
                ms="8px"
              />
            </Button>
          </Flex>
        </CardHeader>
        <CardBody px="22px">
          <EventsTable tableData={eventsData} options={options} />
        </CardBody>
      </Card>
      {createEvent && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label="Create Event"
          handleCloseModal={() => setCreateEvent(false)}
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
              <MultiSelect options={options} />
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
                onClick={() => setCreateEvent(false)}
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
                  setCreateEvent(false);
                  toast.success("Event Created successfully");
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

export default Events;
