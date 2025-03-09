/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import React from "react";

function TablesReportsRow(props) {
  const {
    name,
    email,
    role,
    createdBy,
    dateCreated,
    id,
    isLast,
    paddingY,
  } = props;
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "white");
  const secondaryColor = useColorModeValue("gray.400", "white");
  const mainColor = useColorModeValue("gray.500", "white");

  return (
    <Tr border="none">
      <Td
        borderColor={borderColor}
        minW={{ sm: "80px", lg: "80px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {id}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "220px", xl: "180px", "2xl": "220px" }}
        ps="0px"
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex
          align="center"
          py={paddingY ? paddingY : ".8rem"}
          minWidth="100%"
          flexWrap="nowrap"
        >
          <Text
            fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "200px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {email}
        </Text>
      </Td>

      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "150px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex direction="column">
          <Text
            fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
            color={mainColor}
            fontWeight="bold"
          >
            {role}
          </Text>
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {dateCreated}
        </Text>
      </Td>

      <Td
        borderColor={borderColor}
        minW={{ sm: "150px", lg: "170px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Text
          fontSize={{ sm: "md", xl: "sm", "2xl": "md" }}
          color={secondaryColor}
          fontWeight="normal"
          pb=".5rem"
        >
          {createdBy}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        minW={{ sm: "100px", lg: "100px" }}
        border={isLast ? "none" : null}
        px={{ xl: "2px", "2xl": "20px" }}
      >
        <Flex gap="16px" alignItems="center">
          <IconBox cursor="pointer" w="20px" h="20px">
            <Icon as={EditIcon} w="18px" h="18px" color="blue.600" />
          </IconBox>
          <IconBox cursor="pointer" w="20px" h="20px">
            <Icon as={DeleteIcon} w="18px" h="18px" color="red.400" />
          </IconBox>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TablesReportsRow;
