import {
  Box,
  Button,
  Checkbox,
  Icon,
  Flex,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

function MultiSelect({
  label = " Select assignee",
  // selectedLabel = "assingnee",
  options,
  preselected = [],
  disableOthersOnSelect = false,
  selected,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const handleSelect = (option) => {
    setSelected((prev) => {
      if (disableOthersOnSelect) {
        return prev.includes(option.id) ? [] : [option.id];
      }

      return prev.includes(option.id)
        ? prev.filter((item) => item !== option.id)
        : [...prev, option.id];
    });
  };

  const selectedUser =
    disableOthersOnSelect && selected.length === 1
      ? options.find((opt) => opt.id === selected[0])
      : null;

  useOutsideClick({
    ref,
    handler: () => setIsOpen(false),
  });

  return (
    <Box ref={ref} position="relative" w="100%">
      <Text fontWeight="semibold" fontSize="xs" mb="10px">
        {label}
      </Text>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        borderRadius="8px"
        border="1px solid #e2e8f0"
        textAlign="start"
        h="40px"
        px="16px"
        bg="white"
        _hover={{ bg: "gray.50" }}
        _focus={{ outline: "none" }}
        _expanded={{ bg: "gray.100" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        fontSize="sm"
      >
        {selectedUser
          ? `${selectedUser.first_name} ${selectedUser.last_name}`
          : "Select a user"}

        <Icon as={ChevronDownIcon} />
      </Button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            style={{
              position: "absolute",
              width: "100%",
              background: "white",
              marginTop: "8px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              maxHeight: "150px",
              zIndex: 10,
              border: "1px solid #e2e8f0",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {options.map((option) => {
              return (
                <Flex
                  key={option.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (disableOthersOnSelect) {
                      setTimeout(() => setIsOpen(false), 200);
                    }
                    handleSelect(option);
                  }}
                  align="center"
                  px="3"
                  py="2"
                  cursor="pointer"
                  fontSize="sm"
                  _hover={{ bg: "gray.100" }}
                >
                  <Checkbox
                    onChange={(e) => {
                      e.stopPropagation();
                      if (disableOthersOnSelect) {
                        setTimeout(() => setIsOpen(false), 200);
                      }
                      handleSelect(option);
                    }}
                    isChecked={selected.includes(option.id)}
                    mr={2}
                  />
                  {`${option.first_name ?? "User"} ${
                    option.last_name ?? "User"
                  }`}
                </Flex>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default MultiSelect;
