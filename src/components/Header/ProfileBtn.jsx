import {
  Box,
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

function ProfileBtn() {
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
              <Image src={ReactIcon} alt="icon" height="30px" width="30px" />
            </Flex>
          </PopoverTrigger>
          <PopoverContent position={"absolute"} right="0px" borderRadius="20px">
            <PopoverBody>
              <Box p="10px">
                <Flex bg="primary.100" p="16px" gap="10px" alignItems="center">
                  <Flex
                    height="40px"
                    width="40px"
                    borderRadius="full"
                    bg="white"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <Image
                      src={ReactIcon}
                      alt="profile image"
                      height="30px"
                      width="30px"
                    />
                  </Flex>
                  <Box>
                    <Text fontSize="16px" color="gray.800" fontWeight="600">
                      Johnathan Joy
                    </Text>
                    <Text
                      fontSize="14px"
                      color="gray.800"
                      mt="-5px"
                      fontWeight="400"
                    >
                      jonathan@gmail.com{" "}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  mt="10px"
                  p="16px"
                  gap="10px"
                  alignItems="center"
                  borderBottom="1px"
                  borderColor="gray.100"
                >
                  <Flex
                    height="40px"
                    width="40px"
                    borderRadius="8px"
                    bg="secondary.100"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <RiGroupLine stroke="secondary.500" />
                  </Flex>
                  <Box>
                    <Text fontSize="16px" color="black" fontWeight="600">
                      Change password
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  p="16px"
                  gap="10px"
                  alignItems="center"
                  borderBottom="1px"
                  borderColor="gray.100"
                >
                  <Flex
                    height="40px"
                    width="40px"
                    borderRadius="8px"
                    bg="secondary.100"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <IoLogOutOutline color="secondary.500" />
                  </Flex>
                  <Box>
                    <Text fontSize="16px" color="black" fontWeight="600">
                      Change password
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
}

export default ProfileBtn;
