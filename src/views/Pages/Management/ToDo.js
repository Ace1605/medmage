import {
  Avatar,
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
  Spinner,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Modal from "components/Modal/Modal";
import MultiSelect from "components/MultiSelect/MultiSelect";
import { AppContext } from "contexts/AppContext";
import { useCreateTodo } from "hooks/api/management/todo/useCreateTodo";
import { useGetUsers } from "hooks/api/management/users/useGetUsers";
import { useContext, useEffect, useState } from "react";
import { BiCalendar, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import Datetime from "react-datetime";
import moment from "moment";
import { useGetAllTodos } from "hooks/api/management/todo/useGetAllTodos";
import { BsPencilSquare } from "react-icons/bs";
import { useGetTodoById } from "hooks/api/management/todo/useGetTodo";
import { useUpdateTodo } from "hooks/api/management/todo/useUpdateTodo";
import { useQueryClient } from "@tanstack/react-query";

function Todos() {
  const queryClient = useQueryClient();
  const { token } = useContext(AppContext);
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("white", "black");
  const [addTodo, setAddTodo] = useState(false);
  const [editTodo, seteEditTodo] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState([]);

  const { isLoading, handleCreateTodo } = useCreateTodo(token);

  const {
    data: todos,
    isLoading: iSGettingTodos,
    refetch,
    error: errroGettingTodos,
  } = useGetAllTodos(token);
  if (errroGettingTodos) toast.error("Unable to fetch todos");

  const { data, isLoading: isGetting, error } = useGetUsers(token);
  if (error) toast.error("Unable to fetch users");

  const {
    data: todoById,
    isLoading: isGettingTodo,
    error: errorGettingTodo,
  } = useGetTodoById(token, selectedId);

  if (errorGettingTodo) toast.error("Unable to fetch todo");

  const { isLoading: isUpdating, handleUpdateTodo } = useUpdateTodo(token);

  const handleDueDateChange = (value) => {
    const selectedDate = moment.isMoment(value) ? value : moment(value);
    setDueDate(selectedDate);
  };

  useEffect(() => {
    if (todoById) {
      setTitle(todoById.title ?? "");
      setDescription(todoById.description ?? "");
      setDueDate(moment(todoById.due_date ?? null));
      setSelected(todoById.assigned_to ? [todoById.assigned_to.id] : []);
    }
  }, [todoById]);

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
                disabled={isGetting}
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

          {iSGettingTodos ? (
            <Flex
              width="100% "
              height={{
                sm: "calc(100vh - 281px)",
                md: "calc(100vh - 240px)",
                lg: "calc(100vh - 250px)",
              }}
              align="center"
              justify="center"
            >
              <Spinner w="40px" h="40px" color="#3182ce" />
            </Flex>
          ) : (
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
              {todos.map(
                ({
                  title,
                  due_date,
                  assigned_to,
                  is_completed,
                  description,
                  id,
                }) => {
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
                          {title}
                        </Text>

                        <Text
                          color={textColor}
                          fontWeight="normal"
                          fontSize="sm"
                          mb="3.5px"
                        >
                          {description}
                        </Text>
                        <Flex alignItems="center" gap="8px">
                          <BiCalendar color="#A0AEC0" />
                          <Text color="gray.400" fontSize="sm">
                            {due_date.slice(0, 10)}
                          </Text>

                          <Tooltip
                            label={`${assigned_to.first_name} ${assigned_to.last_name}`}
                            hasArrow
                          >
                            <Avatar
                              name={`${assigned_to.first_name} ${assigned_to.last_name}`}
                              size="xs"
                              cursor="pointer"
                            />
                          </Tooltip>
                        </Flex>
                      </Flex>

                      <Flex gap="14px" alignItems="center">
                        <Tooltip label="Mark as completed" hasArrow>
                          <Box as="button" cursor="pointer">
                            <Checkbox
                              colorScheme="blue"
                              defaultChecked={is_completed}
                              size="lg"
                            />
                          </Box>
                        </Tooltip>
                        <Tooltip label="Edit todo" hasArrow>
                          <Box
                            as="button"
                            cursor="pointer"
                            onClick={() => {
                              setSelectedId(id);
                              seteEditTodo(true);
                            }}
                          >
                            <Icon as={BsPencilSquare} w="18px" h="18px" />
                          </Box>
                        </Tooltip>
                        <Tooltip label="Delete todo" hasArrow>
                          <Box as="button" cursor="pointer">
                            <Icon
                              as={BiTrash}
                              w="20px"
                              h="20px"
                              color="red.400"
                            />
                          </Box>
                        </Tooltip>
                      </Flex>
                    </Flex>
                  );
                }
              )}
            </Stack>
          )}
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
                      Title
                    </FormLabel>
                    <Input
                      variant="main"
                      placeholder="Enter event name"
                      fontSize="xs"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                  <FormControl>
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Due Date
                    </FormLabel>
                    <Datetime
                      value={dueDate}
                      onChange={handleDueDateChange}
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                      closeOnSelect
                      inputProps={{
                        placeholder: "Select start date",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Box>
              <MultiSelect
                label="Assinged to"
                disableOthersOnSelect
                options={data}
                selected={selected}
                setSelected={setSelected}
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
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setDueDate(null);
                  setSelected([]);
                  setAddTodo(false);
                  setSelected([]);
                }}
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
                  handleCreateTodo(
                    {
                      title: title,
                      description: description,
                      due_date: dueDate,
                      assigned_to: selected[0],
                    },
                    (res) => {
                      if (res.status === 201) {
                        setAddTodo(false);
                        setTitle("");
                        setDescription("");
                        setDueDate(null);
                        setSelected([]);
                        refetch();
                        toast.success("Todo created successfully");
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
                {isLoading ? <Spinner w="18px" h="18px" /> : "  Confirm"}
              </Button>
            </Flex>
          </FormControl>
        </Modal>
      )}

      {editTodo && (
        <Modal
          maxWidth={{ sm: "400px", md: "500px" }}
          label={todoById ? "Edit To do" : ""}
          handleCloseModal={() => {
            setTitle("");
            setDescription("");
            setDueDate(null);
            setSelected([]);
            seteEditTodo(false);
          }}
        >
          {isGettingTodo ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="35px" h="35px" color="#3182ce" />
            </Flex>
          ) : (
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
                        Title
                      </FormLabel>
                      <Input
                        variant="main"
                        placeholder="Enter event name"
                        fontSize="xs"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <FormControl>
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Due Date
                      </FormLabel>
                      <Datetime
                        value={dueDate}
                        onChange={handleDueDateChange}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        closeOnSelect
                        inputProps={{
                          placeholder: "Select start date",
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Box>
                <MultiSelect
                  label="Assinged to"
                  disableOthersOnSelect
                  options={data}
                  selected={selected}
                  setSelected={setSelected}
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
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setDueDate(null);
                    setSelected([]);
                    seteEditTodo(false);
                  }}
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
                    handleUpdateTodo(
                      selectedId,
                      {
                        title: title,
                        description: description,
                        due_date: moment(dueDate).format("YYYY-MM-DD"),
                        assigned_to: selected[0],
                      },
                      (res) => {
                        if (res.status === 200) {
                          seteEditTodo(false);
                          setTitle("");
                          setDescription("");
                          setDueDate(null);
                          setSelected([]);
                          refetch();
                          queryClient.invalidateQueries(["todo", selectedId]);
                          toast.success("Todo updated successfully");
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
                  {isUpdating ? <Spinner w="18px" h="18px" /> : "  Confirm"}
                </Button>
              </Flex>
            </FormControl>
          )}
        </Modal>
      )}
    </Flex>
  );
}
export default Todos;
