import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header/Header";
import SidebarList from "../../routes/SidebarList";

function Layout({ varient, title, children }) {
  return (
    <Flex
      p={{ base: "20px", md: "30px 20px", lg: "45px 30px" }}
      gap={{ base: "0px", md: "35px" }}
    >
      <Box flex="none" display={{ base: "none", lg: "block" }}>
        <Sidebar routes={SidebarList} />
      </Box>
      <Box width="100%">
        <Header varient={varient} title={title} />
        {children}
      </Box>
    </Flex>
  );
}

export default Layout;
