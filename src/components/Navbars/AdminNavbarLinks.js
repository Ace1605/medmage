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

// Chakra Icons
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Stack,
  Box,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import routes from "routes.js";
import {
  ArgonLogoDark,
  ChakraLogoDark,
  ArgonLogoLight,
  ChakraLogoLight,
} from "components/Icons/Icons";
import { ellipsizeText } from "hooks/formatter/useEllipsizeText";
import { AppContext } from "contexts/AppContext";

export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { colorMode } = useColorMode();
  const notificationColor = useColorModeValue("gray.700", "white");
  const [isOn, setIsOn] = useState(false);
  const { providers, user } = useContext(AppContext);
  const [selected, setSelected] = useState(providers?.[0]?.name);
  const dropdownRef = useRef(null);

  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("gray.600", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection={{ sm: "column", md: "row" }}
    >
      {/* <SearchBar me={{ sm: "0", md: "18px" }} w={{ sm: "100%" }} /> */}
      <Flex
        alignItems={"center"}
        justifyContent={{ sm: "end" }}
        w={{ sm: "100%", md: "auto" }}
        marginTop={{ sm: "15px", md: "0" }}
        height="100%"
      >
        <div
          onClick={() => setIsOn(!isOn)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <Text
            fontWeight="semibold"
            fontSize="16px"
            me="10px"
            color="blackAlpha"
          >
            <ProfileIcon
              color="blackAlpha"
              w="22px"
              h="22px"
              me={{ sm: "0px" }}
            />{" "}
            {user?.first_name}
          </Text>
          <div
            ref={dropdownRef}
            className={`dropdown-menu ${
              isOn ? "dropdown-show" : "dropdown-hide"
            }`}
          >
            <div className="dropdown-item">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="dropdown-item">{user?.email}</div>
          </div>
        </div>

        <Menu>
          <MenuButton
            as={Button}
            variant="outlined"
            borderWidth="2px"
            color="#a0aec0"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            rightIcon={<ChevronDownIcon fontSize="20px" />}
            me={{ sm: "0px", md: "10px" }}
            minW="80px"
            maxW="140px"
            fontSize="15px"
          >
            {ellipsizeText(selected ?? providers?.[0]?.name, 10)}
          </MenuButton>

          <MenuList p="16px 8px" bg={menuBg}>
            <Flex flexDirection="column">
              {(providers ?? []).map(({ name }, i) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setSelected(name);
                    }}
                    key={i}
                    borderRadius="8px"
                    mb="10px"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="14px"
                      mb="5px"
                      color={notificationColor}
                    >
                      {name}
                    </Text>
                  </MenuItem>
                );
              })}
            </Flex>
          </MenuList>
        </Menu>

        <SidebarResponsive
          logo={
            <Stack
              direction="row"
              spacing="12px"
              align="center"
              justify="center"
            >
              {colorMode === "dark" ? (
                <ArgonLogoLight w="74px" h="27px" />
              ) : (
                <ArgonLogoDark w="74px" h="27px" />
              )}
              <Box
                w="1px"
                h="20px"
                bg={colorMode === "dark" ? "white" : "gray.700"}
              />
              {colorMode === "dark" ? (
                <ChakraLogoLight w="82px" h="21px" />
              ) : (
                <ChakraLogoDark w="82px" h="21px" />
              )}
            </Stack>
          }
          colorMode={colorMode}
          secondary={props.secondary}
          routes={routes}
          {...rest}
        />

        <Menu>
          <MenuButton>
            <BellIcon color={navbarIcon} w="18px" h="18px" />
          </MenuButton>
          <MenuList p="16px 8px" bg={menuBg}>
            <Flex flexDirection="column">
              <MenuItem borderRadius="8px" mb="10px">
                <ItemContent
                  time="13 minutes ago"
                  info="from Alicia"
                  boldInfo="New Message"
                  aName="Alicia"
                  aSrc={avatar1}
                />
              </MenuItem>
              <MenuItem borderRadius="8px" mb="10px">
                <ItemContent
                  time="2 days ago"
                  info="by Josh Henry"
                  boldInfo="New Album"
                  aName="Josh Henry"
                  aSrc={avatar2}
                />
              </MenuItem>
              <MenuItem borderRadius="8px">
                <ItemContent
                  time="3 days ago"
                  info="Payment succesfully completed!"
                  boldInfo=""
                  aName="Kara"
                  aSrc={avatar3}
                />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
