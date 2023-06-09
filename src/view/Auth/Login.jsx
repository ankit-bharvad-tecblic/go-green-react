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
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Auth_Pages_IMG from "../../assets/Images/Authentication_Pages_IMG.svg";
import logoImg from "../../components/Icons/logo.svg";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import { RiErrorWarningFill } from "react-icons/ri";
import * as yup from "yup";
import { useLoginMutation } from "../../features/auth/loginApiSlice";
import { localStorageService } from "../../services/localStorge.service";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string().trim().required("Password is required"),
});

function Login() {
  const toast = useToast();
  const [errorMsg, setErrorMsg] = useState({ msg: "" });
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, { error: loginApiErr, isLoading: loginApiIsLoading }] =
    useLoginMutation();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
    onLogin({ ...data, fcm_token: "test" });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (credentials) => {
    try {
      setErrorMsg({
        msg: "",
      });
      console.log("credentials ", credentials);
      const res = await login(credentials).unwrap();
      console.log("login api res ---> ", res);
      if (res.status === 200) {
        localStorageService.set("GG_ADMIN", { userDetails: res.data });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("error --> ", error);

      toast({
        title: "Error",
        description: error.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      setErrorMsg({
        msg: error.data.message,
      });

      // ThrowErrors(error?.data?.message, error?.status);
    } finally {
      // setIsSubmitting(false); // Set submission state back to false after API call completes
    }
  };

  return (
    <Box
      display={{ base: "column", md: "flex" }}
      justifyContent={{ base: "space-between" }}
    >
      <Box mx="auto" p={{ base: "20" }}>
        <Box height={40}>
          <Image src={logoImg} alt="logo" width={{ base: "30%" }} />
        </Box>
        <Text fontWeight="bold" fontSize="4xl">
          Login
        </Text>
        <Text my="4">Please fill your detail to access your account.</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email} mb={4}>
            <Text my="2" fontWeight="bold">
              Email
            </Text>
            <Input
              type="text"
              p="6"
              borderRadius={6}
              placeholder="Email"
              borderColor="gray.600"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && (
                <>
                  <RiErrorWarningFill style={{ marginRight: "0.5rem" }} />
                  {errors.email.message}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={4}>
            <Text my="2" fontWeight="bold">
              Password
            </Text>

            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                borderRadius={6}
                p="6"
                //   borderColor={errors.password ? "red" : "Boxborder"}
                borderColor="gray.600"
                {...register("password")}
              />

              <InputRightElement>
                {showPassword ? (
                  <FaEyeSlash onClick={handleTogglePassword} />
                ) : (
                  <FaEye onClick={handleTogglePassword} />
                )}
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.password && (
                <>
                  <RiErrorWarningFill style={{ marginRight: "0.5rem" }} />
                  {errors.password.message}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          <Box fontSize="sm" mb="2" textAlign="right">
            <Text color="red">{errorMsg.msg}</Text>
          </Box>

          <Flex justifyContent="space-between">
            <Stack spacing={5} direction="row">
              <Checkbox>Remember me</Checkbox>
            </Stack>
            <Box>
              <Text color="primary.700">
                <Link to="/forgot-password">Forgot Password?</Link>
              </Text>
            </Box>
          </Flex>

          <Button
            my="10"
            bg="primary.700"
            type="submit"
            color="white"
            isLoading={loginApiIsLoading}
            borderRadius={"30"}
            w="full"
            p="7"
            _hover={{}}
          >
            Sign In
          </Button>
        </form>
      </Box>

      <Box boxSize="2xl" p={{ base: "5" }}>
        <Image
          src={Auth_Pages_IMG}
          size="xl"
          alt="Authentication image"
          width={"100%"}
          borderRadius={"3xl"}
        />
      </Box>
    </Box>
  );
}

export default Login;
