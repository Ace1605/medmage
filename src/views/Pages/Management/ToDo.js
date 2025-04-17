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
import { useDeleteTodo } from "hooks/api/management/todo/useDeleteTodo";
import { SingleSelect } from "components/SingleSelect/SingleSelect";

function Todos() {
  const queryClient = useQueryClient();
  const { token } = useContext(AppContext);
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("white", "black");
  const [addTodo, setAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

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
    data: todoByIdData,
    isLoading: isGettingTodo,
    error: errorGettingTodo,
  } = useGetTodoById(token, todoId);

  if (errorGettingTodo) toast.error("Unable to fetch todo");

  const { isLoading: isUpdating, handleUpdateTodo } = useUpdateTodo(token);
  const { handleDeleteTodo, isLoading: isDeleting } = useDeleteTodo(token);

  const handleDueDateChange = (value) => {
    const selectedDate = moment.isMoment(value) ? value : moment(value);
    setDueDate(selectedDate);
  };

  useEffect(() => {
    if (todoByIdData) {
      setTitle(todoByIdData.title ?? "");
      setDescription(todoByIdData.description ?? "");
      setDueDate(moment(todoByIdData.due_date ?? null));
      setSelectedTodo(todoByIdData ?? null);
    }
  }, [todoByIdData]);

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
                      key={id}
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
                            {moment(due_date).format("YYYY-MM-DD")}
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
                              setTodoId(id);
                              setEditTodo(true);
                            }}
                          >
                            <Icon as={BsPencilSquare} w="18px" h="18px" />
                          </Box>
                        </Tooltip>
                        <Tooltip label="Delete todo" hasArrow>
                          <Box
                            as="button"
                            cursor="pointer"
                            onClick={() => {
                              setTodoId(id);
                              setDeleteTodo(true);
                            }}
                          >
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
          handleCloseModal={() => {
            setTitle("");
            setDescription("");
            setDueDate(null);
            setSelectedTodo(null);
            setAddTodo(false);
          }}
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
                        placeholder: "Select due date",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Box>
              <SingleSelect
                options={data}
                assignee={selectedTodo?.assigned_to}
                onSelect={(user) => {
                  setSelectedTodo((prev) => ({
                    ...prev,
                    assigned_to: user,
                  }));
                }}
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
                  setSelectedTodo(null);
                  setAddTodo(false);
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
                      assigned_to: selectedTodo?.assigned_to?.id,
                    },
                    (res) => {
                      if (res.status === 201) {
                        setAddTodo(false);
                        setTitle("");
                        setDescription("");
                        setDueDate(null);
                        setSelectedTodo(null);
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
          label={todoByIdData ? "Edit To do" : ""}
          handleCloseModal={() => {
            setTodoId(null);
            setTitle("");
            setDescription("");
            setDueDate(null);
            setSelectedTodo(null);
            setEditTodo(false);
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
                          placeholder: "Select due date",
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Box>

                <SingleSelect
                  options={data}
                  assignee={selectedTodo?.assigned_to}
                  onSelect={(user) => {
                    setSelectedTodo((prev) => ({
                      ...prev,
                      assigned_to: user,
                    }));
                  }}
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
                    setSelectedTodo(null);
                    setEditTodo(false);
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
                      todoId,
                      {
                        title: title,
                        description: description,
                        due_date: moment(dueDate).format("YYYY-MM-DD"),
                        assigned_to: selectedTodo?.assigned_to?.id,
                      },
                      (res) => {
                        if (res.status === 200) {
                          setEditTodo(false);
                          setTitle("");
                          setDescription("");
                          setDueDate(null);
                          setSelectedTodo(null);
                          refetch();
                          queryClient.invalidateQueries(["todo", todoId]);
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
      {deleteTodo && (
        <Modal
          maxWidth={"500px"}
          handleCloseModal={() => {
            setTodoId(null);
            setDeleteTodo(false);
          }}
        >
          {isGettingTodo ? (
            <Flex width="100% " height="30vh" align="center" justify="center">
              <Spinner w="35px" h="35px" color="#3182ce" />
            </Flex>
          ) : (
            <Box>
              <Text
                color={textColor}
                fontWeight="bold"
                fontSize={{ sm: "18px", lg: "20px" }}
                textAlign="center"
                mt="10px"
                mb="10px"
              >
                Are you sure you want to delete this Todo?
              </Text>
              <Text
                color={textColor}
                fontWeight="bold"
                textAlign="center"
                mb="16px"
                fontSize={{ sm: "16px", lg: "18px" }}
              >
                This action cannot be undone
              </Text>

              <Text
                color={textColor}
                fontWeight="semibold"
                textAlign="center"
                mb="16px"
                fontSize={{ sm: "16px" }}
              >
                {` Todo title: ${selectedTodo?.title}`}
              </Text>

              <Flex
                alignItems="center"
                justifyContent="space-evenly"
                gap="15px"
                mt="30px"
                mb="10px"
              >
                <Button
                  fontSize="16px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  px="30px"
                  onClick={() => {
                    setTodoId(null);
                    setDeleteTodo(false);
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
                  px="30px"
                  onClick={() => {
                    handleDeleteTodo(
                      todoId,
                      (res) => {
                        if (res.status === 204) {
                          setDeleteTodo(false);
                          refetch();
                          toast.success("Todo deleted successfully");
                          setTodoId(null);
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
                  {isDeleting ? <Spinner w="20px" h="20px" /> : "    Confirm"}
                </Button>
              </Flex>
            </Box>
          )}
        </Modal>
      )}
    </Flex>
  );
}
export default Todos;
