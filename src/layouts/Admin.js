// Chakra imports
import {
  Portal,
  Box,
  useColorMode,
  Stack,
  useDisclosure,
  useColorModeValue,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import "assets/css/plugin-styles.css";
import Configurator from "components/Configurator/Configurator";

// Custom components
import MainPanel from "components/Layout/MainPanel";
import PanelContainer from "components/Layout/PanelContainer";
import PanelContent from "components/Layout/PanelContent";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import routes from "routes.js";

import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
  ArgonLogoMinifiedDark,
  ArgonLogoMinifiedLight,
} from "components/Icons/Icons";
import { AppContext } from "contexts/AppContext";
import { useGetProfile } from "hooks/api/auth/useGetProfile";
import { toast } from "sonner";
import FullScreenLoader from "components/FullScreenLoader/FullScreenLoader";
import Modal from "components/Modal/Modal";
import { useResendConfirmationEmail } from "hooks/api/auth/useResendConfirmationEmail";
// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;

  // states and functions
  const [fixed, setFixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(275);

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondaryNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === "/admin") {
        return <Route path={route.path} element={route.component} key={key} />;
      }
      if (route.collapse) {
        return getRoutes(route.items);
      }
      if (route.category) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  const sideBarFullwidth = sidebarWidth + 16;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  document.documentElement.dir = "ltr";
  document.documentElement.layout = "admin";
  // Chakra Color Mode
  // Get profile
  const navigate = useNavigate();

  const {
    handleResendConfirmation,
    isLoading: isResending,
  } = useResendConfirmationEmail();

  const { token, setUser, user, setProviders } = useContext(AppContext);

  const { data, isLoading, error, isFetching } = useGetProfile(token);

  const goToInbox = (email) => {
    if (email.includes("gmail.com")) {
      window.open("https://mail.google.com/", "_blank");
    } else if (email.includes("yahoo.com")) {
      window.open("https://mail.yahoo.com/", "_blank");
    } else if (email.includes("outlook.com")) {
      window.open("https://outlook.live.com/mail/", "_blank");
    } else {
      alert("Email provider not supported");
    }
  };

  useEffect(() => {
    if (data) {
      setProviders(data.providers);
      setUser(data.user);
    } else {
    }
  }, [data]);

  if (error) {
    toast.error("Unable to get user profie");
    navigate("/auth/authentication/sign-in");
  }

  if (isLoading) return <FullScreenLoader />;

  return (
    <Box H="100vh" bg="#f3f5f7">
      <SidebarContext.Provider
        value={{
          sidebarWidth,
          setSidebarWidth,
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        {user?.status.toLowerCase() === "unconfirmed" && (
          <Modal
            maxWidth={"530px"}
            handleCloseModal={() => {}}
            bg={"#000000de"}
            height="330px"
          >
            <Text
              color={"#000"}
              fontWeight="bold"
              fontSize={{ sm: "20px", lg: "22px" }}
              textAlign="center"
              mt="10px"
              mb="10px"
            >
              Your account has not been confirmed
            </Text>
            <div style={{ margin: "auto" }}>
              <Text
                color={"#000"}
                fontWeight="normal"
                fontSize={{ sm: "16px", lg: "17px" }}
                textAlign="center"
                maxW={"350px"}
                mx={"auto"}
                my={"20px"}
              >
                Kindly click on the button below to confirm your account or
                resend confirmation email if the confirmation period has expired
              </Text>

              <Text
                color={"#000"}
                fontWeight="normal"
                fontSize={{ sm: "16px", lg: "17px" }}
                textAlign="center"
                maxW={"350px"}
                mx={"auto"}
                my={"30px"}
              >
                Has your confirmation expired?{" "}
                <button
                  onClick={() => {
                    handleResendConfirmation(
                      user?.id,
                      {},
                      (res) => {
                        if (res.status === 200) {
                          toast.success("Email resent successfully");
                        } else {
                          toast.error(res?.message);
                        }
                      },
                      (err) => {
                        toast.error(
                          err?.response?.data?.message || "Something went wrong"
                        );
                      }
                    );
                  }}
                  style={{ color: "#3182ce", width: "65px" }}
                >
                  {isResending ? (
                    <Spinner color="#3182ce" w="18px" h="18px" />
                  ) : (
                    "Resend"
                  )}
                </button>
              </Text>
              <Button
                onClick={() => goToInbox(user?.email)}
                _disabled={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                  _hover: { bg: "gray.700" },
                }}
                fontSize="14px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="14px"
              >
                Go to email
              </Button>
            </div>
          </Modal>
        )}
        <Sidebar
          routes={routes}
          logo={
            sidebarWidth === 275 ? (
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
            ) : colorMode === "light" ? (
              <ArgonLogoMinifiedDark w="36px" h="36px" />
            ) : (
              <ArgonLogoMinifiedLight w="36px" h="36px" />
            )
          }
          display="none"
          {...rest}
        />
        <MainPanel
          w={{
            base: "100%",
            xl: `calc(100% - ${sideBarFullwidth}px)`,
          }}
        >
          <Portal>
            <Box>
              <AdminNavbar
                onOpen={onOpen}
                logoText={"Argon Dashboard Chakra PRO"}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <PanelContent>
              <PanelContainer>
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/admin/dashboard/default" replace />}
                  />
                </Routes>
              </PanelContainer>
            </PanelContent>
          ) : null}
          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          />
        </MainPanel>
      </SidebarContext.Provider>
    </Box>
  );
}
