import {
  Box,
  Flex,
  HStack,
  Icon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { SidebarContext } from "contexts/SidebarContext";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export const createChildLinks = (routes) => {
  let location = useLocation();
  const { sidebarWidth } = React.useContext(SidebarContext);
  let variantChange = "0.2s linear";

  let activeBg = "blue.500";
  let inactiveBg = useColorModeValue("transparent", "navy.700");
  let activeColor = useColorModeValue("blue.500", "white");
  let inactiveColor = useColorModeValue("gray.400", "gray.400");
  let activeAccordionBg = useColorModeValue("transparent", "navy.700");
  let activeColorIcon = "white";
  let inactiveColorIcon = "blue.500";

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  return routes.map((prop, key) => {
    return (
      <NavLink key={key} to={prop.layout + prop.path}>
        <Box
          boxShadow={activeRoute(prop.path) && prop.icon ? null : null}
          _focus={{
            boxShadow: "none",
          }}
          borderRadius="8px"
          w={{
            sm: sidebarWidth === 275 ? "100%" : "77%",
            xl: sidebarWidth === 275 ? "90%" : "70%",
            "2xl": sidebarWidth === 275 ? "95%" : "77%",
          }}
          ps={prop.icon ? "8px" : null}
          py={prop.icon ? "12px" : null}
          bg={
            activeRoute(prop.path) && prop.icon
              ? activeAccordionBg
              : "transparent"
          }
          ms={sidebarWidth !== 275 ? (prop.icon ? "0px" : "8px") : null}
        >
          {activeRoute(prop.path) ? (
            <Flex
              fontWeight="bold"
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              transition={variantChange}
              mx={{
                xl: "auto",
              }}
              px="0px"
              borderRadius="8px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
                border: "none",
              }}
              _focus={{
                transform: "none",
                borderColor: "transparent",
                border: "none",
              }}
            >
              {prop.icon ? (
                <Flex justify={sidebarWidth === 275 ? "flex-start" : "center"}>
                  <IconBox
                    bg={activeBg}
                    color={activeColorIcon}
                    h="30px"
                    w="30px"
                    me={sidebarWidth === 275 ? "12px" : "0px"}
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                  <Text
                    color={activeColor}
                    my="auto"
                    fontSize="sm"
                    display={sidebarWidth === 275 ? "block" : "none"}
                  >
                    {prop.name}
                  </Text>
                </Flex>
              ) : (
                <ListItem // LIST ITEM FOR COLLAPSE=== false
                  key={key}
                  ms={sidebarWidth === 275 ? null : "10px"}
                >
                  <HStack
                    spacing={
                      sidebarWidth === 275
                        ? activeRoute(prop.path.toLowerCase())
                          ? "22px"
                          : "26px"
                        : "8px"
                    }
                    py="5px"
                    px={sidebarWidth === 275 ? "10px" : "0px"}
                  >
                    <Icon
                      as={FaCircle}
                      w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                      color="blue.500"
                      display={sidebarWidth === 275 ? "block" : "none"}
                    />
                    <Text
                      color={
                        activeRoute(prop.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
                      }
                    >
                      {sidebarWidth === 275 ? prop.name : prop.name[0]}
                    </Text>
                  </HStack>
                </ListItem>
              )}
            </Flex>
          ) : (
            <Flex
              fontWeight="bold"
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mx={{
                xl: "auto",
              }}
              px="0px"
              borderRadius="8px"
              w="100%"
              _hover={{}}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                borderColor: "transparent",
                boxShadow: "none",
              }}
            >
              <Flex justify={sidebarWidth === 275 ? "flex-start" : "center"}>
                <IconBox
                  bg={inactiveBg}
                  color={inactiveColorIcon}
                  h="30px"
                  w="30px"
                  me={sidebarWidth === 275 ? "12px" : "0px"}
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>
                <Text
                  _hover={{
                    color:
                      activeRoute(prop.path) && prop.icon ? "" : "blue.500",
                  }}
                  color={inactiveColor}
                  my="auto"
                  fontSize="sm"
                  display={sidebarWidth === 275 ? "block" : "none"}
                >
                  {prop.name}
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </NavLink>
    );
  });
};

export const createChildLinksResponsive = (routes) => {
  let location = useLocation();

  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  let activeBg = "blue.500";
  let inactiveBg = useColorModeValue("transparent", "navy.700");
  let activeColor = useColorModeValue("blue.500", "white");
  let inactiveColor = useColorModeValue("gray.400", "gray.400");
  let activeAccordionBg = useColorModeValue("transparent", "navy.700");
  let activeColorIcon = "white";
  let inactiveColorIcon = "blue.500";

  return routes.map((prop, key) => {
    return (
      <NavLink key={key} to={prop.layout + prop.path}>
        <Box
          boxShadow={activeRoute(prop.path) && prop.icon ? "none" : "none"}
          borderRadius="8px"
          ps={prop.icon ? "8px" : null}
          py={prop.icon ? "12px" : null}
          bg={
            activeRoute(prop.path) && prop.icon
              ? activeAccordionBg
              : "transparent"
          }
        >
          {activeRoute(prop.path) ? (
            <Flex
              fontWeight="bold"
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              transition={variantChange}
              mx={{
                xl: "auto",
              }}
              px="0px"
              borderRadius="8px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
                border: "none",
              }}
              // _focus={{
              //   transform: "none",
              //   borderColor: "transparent",
              //   border: "none",
              // }}
            >
              {prop.icon ? (
                <Flex>
                  <IconBox
                    bg={activeBg}
                    color={activeColorIcon}
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                  <Text color={activeColor} my="auto" fontSize="sm">
                    {prop.name}
                  </Text>
                </Flex>
              ) : (
                <ListItem // LIST ITEM FOR COLLAPSE=== false
                  key={key}
                  ms="10px"
                >
                  <HStack spacing="22px" py="5px" px="10px">
                    <Icon
                      as={FaCircle}
                      w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                      color="blue.500"
                    />
                    <Text
                      color={
                        activeRoute(prop.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                    >
                      {prop.name}
                    </Text>
                  </HStack>
                </ListItem>
              )}
            </Flex>
          ) : (
            <Flex
              fontWeight="bold"
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mx={{
                xl: "auto",
              }}
              px="0px"
              borderRadius="8px"
              w="100%"
              _hover={{}}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                borderColor: "transparent",
                boxShadow: "none",
              }}
            >
              <Flex>
                <IconBox
                  bg={inactiveBg}
                  color={inactiveColorIcon}
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>
                <Text
                  _hover={{
                    color:
                      activeRoute(prop.path) && prop.icon ? "" : "blue.500",
                  }}
                  color={inactiveColor}
                  my="auto"
                  fontSize="sm"
                >
                  {prop.name}
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </NavLink>
    );
  });
};
