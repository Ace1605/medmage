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

// Chakra imports
import {
  Box,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import {
  ChakraLogoDark,
  ChakraLogoLight,
  ArgonLogoDark,
  ArgonLogoLight,
} from "components/Icons/Icons";
import PropTypes from "prop-types";
import { SidebarContext } from "contexts/SidebarContext";
import logoWhite from "assets/logos/Logo_white.png";

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();

  // Chakra color mode

  let mainText = "#fff";
  let navbarBg = "none";
  let navbarShadow = "initial";
  let navbarPosition = "absolute";
  if (props.secondary === true) {
    brand = (
      <Link
        href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <Stack direction="row" spacing="12px" align="center" justify="center">
          {colorMode === "light" ? (
            <ArgonLogoDark w="74px" h="27px" />
          ) : (
            <ArgonLogoLight w="74px" h="27px" />
          )}
          <Box w="1px" h="20px" bg={useColorModeValue("gray.700", "white")} />
          {colorMode === "light" ? (
            <ChakraLogoDark w="82px" h="21px" />
          ) : (
            <ChakraLogoLight w="82px" h="21px" />
          )}
        </Stack>

        <Text fontSize="sm" mt="3px">
          {logoText}
        </Text>
      </Link>
    );
    mainText = useColorModeValue("gray.700", "gray.200");
    navbarBg = useColorModeValue("white", "navy.800");
    navbarShadow = useColorModeValue(
      "0px 7px 23px rgba(0, 0, 0, 0.05)",
      "none"
    );
    bgButton = useColorModeValue("gray.700", "white");
    colorButton = useColorModeValue("white", "gray.700");
    navbarPosition = "fixed";
  }

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Stack
        mt="4px"
        direction="row"
        spacing="12px"
        align="center"
        justify="center"
      >
        {/* <ArgonLogoLight w="74px" h="27px" /> */}
        <Image src={logoWhite} w="22px" />
        <Text fontSize="sm" mt="2px" letterSpacing="1px">
          {"Medmage"}
        </Text>
        <Box w="1px" h="20px" bg={"white"} />
      </Stack>
    </Link>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top="16px"
        left="50%"
        transform="translate(-50%, 0px)"
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius="15px"
        px="16px"
        py="22px"
        mx="auto"
        width="1044px"
        maxW="90%"
        alignItems="center"
        zIndex="3"
      >
        <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
          {brand}
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
