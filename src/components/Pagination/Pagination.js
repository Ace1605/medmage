import { HStack, Button, Text, Icon } from "@chakra-ui/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  // Generate page numbers dynamically
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <HStack mt={4} justifyContent="center" spacing="4px">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        _hover={{ bg: "gray.200", opacity: "0.7" }}
      >
        <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
      </Button>

      {/* Numbered Page Buttons */}
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          w="40px"
          h="40px"
          borderRadius="8px"
          bg={page === currentPage ? "blue.500" : "#fff"}
          border={page === currentPage ? "none" : "1px solid lightgray"}
          _hover={{ opacity: "0.7", borderColor: "gray.500" }}
        >
          <Text
            fontSize="sm"
            color={page === currentPage ? "#fff" : "gray.600"}
          >
            {page}
          </Text>
        </Button>
      ))}

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        _hover={{ bg: "gray.200", opacity: "0.7" }}
      >
        <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
      </Button>
    </HStack>
  );
};

export default Pagination;
