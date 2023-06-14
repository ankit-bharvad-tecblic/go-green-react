import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactIcon from "../../assets/Images/reactIcon.svg";
import { FaBell } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import Sidebar from "../Sidebar";
import SidebarList from "../../routes/SidebarList";
import ProfileBtn from "./ProfileBtn";
import NotificationBtn from "./NotificationBtn";
import { CommunityIcon } from "../Icons/Icons";

function Header({ variant, title, sidebarVisibility, setSidebarVisibility }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scrolled, setScrolled] = useState(false);

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", changeNavbar);

  return (
    <>
      {variant === "fixed" ? (
        <Box width="100%" mb={{ base: "10px", md: "15px", lg: "20px" }}>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Flex gap={{ base: "10px", lg: "0px" }} alignItems="center">
              <Box display={{ base: "block", lg: "none" }}>
                <VscThreeBars fontSize="32px" onClick={onOpen} />
              </Box>
              <Box
                display={{ base: "none", lg: "block" }}
                cursor="pointer"
                mr={"10px"}
              >
                <VscThreeBars
                  fontSize="32px"
                  onClick={() => {
                    setSidebarVisibility(!sidebarVisibility);
                  }}
                />
              </Box>
              <Heading fontSize="32px" fontWeight="700">
                {title}
              </Heading>
            </Flex>
            <Flex gap="10px">
              <ProfileBtn />
              <NotificationBtn />
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box height={{ base: "73px", md: "70px", lg: "80px" }}>
          <Box
            position={scrolled ? "fixed" : "absolute"}
            top={{ base: "20px", md: "30px", lg: "45px" }}
            zIndex="10"
            width={{
              base: "calc(100% - 40px)",
              lg: sidebarVisibility
                ? "calc(100% - 395px)"
                : "calc(100% - 60px)",
            }}
            transition="width 0.5s ease-in-out"
          >
            <Box
              bg="white"
              width="100%"
              boxShadow={scrolled ? "md" : "none"}
              p={{ base: "10px", md: "10px 20px", lg: "15px 25px" }}
              borderRadius="15px"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Flex gap={{ base: "10px", lg: "0px" }} alignItems="center">
                  <Box display={{ base: "block", lg: "none" }}>
                    <VscThreeBars fontSize="32px" onClick={onOpen} />
                  </Box>
                  <Box
                    display={{ base: "none", lg: "block" }}
                    cursor="pointer"
                    mr="10px"
                  >
                    <VscThreeBars
                      fontSize="32px"
                      onClick={() => {
                        setSidebarVisibility(!sidebarVisibility);
                      }}
                    />
                  </Box>
                  <Heading
                    fontSize="32px"
                    fontWeight="700"
                    textTransform="capitalize"
                  >
                    {title}
                  </Heading>
                </Flex>
                <Flex gap="10px">
                  <ProfileBtn />
                  <NotificationBtn />
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent id="tempraw">
          <DrawerBody bg="transparent">
            <Sidebar routes={SidebarList} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
