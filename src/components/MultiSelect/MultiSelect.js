import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Icon, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

function MultiSelect({ label = "member", options, preselected = [] }) {
  const [selected, setSelected] = useState(preselected);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const handleSelect = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <Box position="relative" w="100%">
      <Text fontWeight="semibold" fontSize="xs" mb="10px">
        Select Members
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
        {`${selected.length} ${label}(s)`}

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
            {options.map((option) => (
              <Flex
                key={option}
                onClick={() => handleSelect(option)}
                align="center"
                px="3"
                py="2"
                cursor="pointer"
                fontSize="sm"
                _hover={{ bg: "gray.100" }}
              >
                <Checkbox
                  onChange={() => handleSelect(option)}
                  isChecked={selected.includes(option)}
                  mr={2}
                />
                {option}
              </Flex>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default MultiSelect;
