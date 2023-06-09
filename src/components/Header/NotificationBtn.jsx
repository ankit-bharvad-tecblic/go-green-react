import {
  Alert,
  AlertDescription,
  Box,
  CloseButton,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import ReactIcon from "../../assets/Images/reactIcon.svg";
import React from "react";
import { RiGroupLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

function NotificationBtn() {
  return (
    <>
      <Box position="relative">
        <Popover direction="rtl" autoFocus={true}>
          <PopoverTrigger>
            <Flex
              height="40px"
              width="40px"
              borderRadius="full"
              bg="white"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              boxShadow="md"
            >
              <FaBell />
            </Flex>
          </PopoverTrigger>
          <PopoverContent position={"absolute"} right="0px" borderRadius="20px">
            <PopoverBody>
              <Box p="10px">
                <Alert status="error">
                  <Box>
                    <AlertDescription>
                      We will review your application and respond within the next 48 hours.
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                  />
                </Alert>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
}

export default NotificationBtn;
