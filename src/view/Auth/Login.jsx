import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Auth_Pages_IMG from "../../assets/Images/Authentication_Pages_IMG.svg";
import logoImg from "../../components/Icons/logo.svg";

function Login() {
  return (
    <Flex>
      {/* login details section box */}

      <Box width={{ base: "40%" }} p={{ base: "5" }}>
        <Box>
          <Image src={logoImg} alt="logo" width={{ base: "30%" }} />
        </Box>
        <Text>Login</Text>
        <Text>Please fill your detail to access your account.</Text>

        <form>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input />
          </FormControl>

          <Flex justify={"space-between"}>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Text>Forgot Password?</Text>
          </Flex>

          <Button type="submit">Sign In</Button>
        </form>
      </Box>

      {/* Authentication Image section box */}
      <Box width={{ base: "60%" }} p={{ base: "5" }}>
        <Image
          src={Auth_Pages_IMG}
          alt="Authentication image"
          width={"100%"}
          borderRadius={"3xl"}
        />
      </Box>
    </Flex>
  );
}

export default Login;
