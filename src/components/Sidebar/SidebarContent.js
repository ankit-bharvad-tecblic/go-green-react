/*eslint-disable*/
// chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import { Separator } from "../Separator/Separator";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../Icons/logo.svg";

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, routes }) => {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    console.log(location.pathname);
    console.log(routeName);
    return location.pathname === routeName ? "active" : "";
  };
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        <NavLink to={prop.path} key={prop.name}>
          {activeRoute(prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={"#A6CE39"}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              p="12px"
              brorderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "#A6CE39",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="white"
                    color="#A6CE39"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text
                  color={"#FFFFFF"}
                  my="auto"
                  fontSize="14px"
                  fontWeight="700"
                >
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              p="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox bg={""} color="#4FD1C5" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={"#A0AEC0"} fontWeight="600" my="auto" fontSize="">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={"25px"} mb="12px" borderRadius="16px">
        <Link
          href={`${process.env.PUBLIC_URL}/`}
          target="_blank"
          display="flex"
          lineHeight="100%"
          mb="30px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          {/* <CreativeTimLogo w="32px" h="32px" me="10px" /> */}
          <Image size="30" width={24} height={24} src={logo} />
          {/* <Text fontSize="sm" mt="3px">
            {logoText}
          </Text> */}
        </Link>
        <Separator></Separator>
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
      {/* <SidebarHelp /> */}
    </>
  );
};

export default SidebarContent;
