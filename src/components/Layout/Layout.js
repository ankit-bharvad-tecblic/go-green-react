import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header/Header";
import SidebarList from "../../routes/SidebarList";

function Layout({ variant, title, children }) {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);

  return (
    <Flex
      p={{ base: "20px", md: "30px 20px", lg: "45px 30px" }}
      gap={{ base: "0px", md: sidebarVisibility ? "35px" : "0px" }}
    >
      <Box
        flex="none"
        // width="250px"
        width={sidebarVisibility ? "250px" : 0}
        transition="width 0.5s ease-in-out"
        opacity={sidebarVisibility ? 1 : 0}
        // display={{ base: "none", lg: sidebarVisibility ? "block" : "none" }}
      >
        <Box
          position="fixed"
          top={{ base: "20px", md: "30px", lg: "45px" }}
          transition="opacity 1.5s ease-in-out"
          opacity={sidebarVisibility ? 1 : 0}
        >
          <Sidebar routes={SidebarList} />
        </Box>
      </Box>
      <Box width="100%" transition="opacity width 0.9s ease-in-out">
        <Header
          variant={variant}
          title={title}
          sidebarVisibility={sidebarVisibility}
          setSidebarVisibility={setSidebarVisibility}
        />
        {children}
      </Box>
    </Flex>
  );
}

export default Layout;
