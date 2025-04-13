import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import EventsTable from "components/Tables/EventsTable";
import { BiPlus } from "react-icons/bi";
import Modal from "components/Modal/Modal";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { useCreateEvent } from "hooks/api/management/events/useCreateEvent";
import { AppContext } from "contexts/AppContext";
import { DateTimeRangePicker } from "components/CustomDateTimePicker/CustomDateTimeRangePicker";
import { useGetAllEvents } from "hooks/api/management/events/useGetAllEvents";

function Events() {
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("white", "black");
  const [createEvent, setCreateEvent] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const { user, providers, token } = useContext(AppContext);

  const { handleCreateEvent, isLoading } = useCreateEvent();

  const {
    data,
    isFetching,
    refetch,
    error,
    isLoading: isGetting,
  } = useGetAllEvents(token);

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
              fontSize="14px"
              colorScheme="blue"
              fontWeight="bold"
              w="90px"
              h="40px"
              onClick={() => setCreateEvent(true)}
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
        <CardBody px="22px">
          {isGetting || isFetching ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : (
            <EventsTable tableData={data} refetchEvents={refetch} />
          )}
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
                    Event Name
                  </FormLabel>
                  <Input
                    variant="main"
                    placeholder="Enter event name"
                    fontSize="xs"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <DateTimeRangePicker />
              </Grid>
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
                  handleCreateEvent({
                    title: eventName,
                    description: description,
                    is_completed: false,
                    user_id: user?.id,
                    provider_id: providers?.[0]?.id,
                    start_datetime: "",
                    end_datetime: "",
                  });
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
