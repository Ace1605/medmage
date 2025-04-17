import React from "react";
import { Box, Select, Text } from "@chakra-ui/react";

export const SingleSelect = ({
  options,
  assignee,
  onSelect,
  label = "Assigned to",
}) => {
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedPerson = options.find((option) => option.id === selectedId);
    onSelect(selectedPerson);
  };

  return (
    <Box>
      <Text fontWeight="semibold" fontSize="xs" mb="10px">
        {label}
      </Text>
      <Select
        variant="main"
        color="gray.400"
        fontSize="xs"
        cursor="pointer"
        value={assignee?.id || ""}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {`${option.first_name ?? "User"} ${option.last_name ?? ""}`}
          </option>
        ))}
      </Select>
    </Box>
  );
};
