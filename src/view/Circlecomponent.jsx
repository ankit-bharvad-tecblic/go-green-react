import React, { useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import RightTickImage from "../assets/Images/RightTickImage.svg";
import WrongTickImage from "../assets/Images/WrongTickImage.svg";
import CustomInput from "../components/Elements/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomRadioButton from "../components/Elements/CustomRadioButton";

const CircleComponent = () => {
  const [clickCount, setClickCount] = useState(-1);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const isEvenClick = clickCount >= 0 && clickCount % 2 === 0;

  const schema = yup.object().shape({
    InputFeild: yup.string().required("please fill the field"),
    radioOption: yup.string().required("Please select an option"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  const radioOptions = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "others", label: "others" },
  ];
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CustomInput name="InputFeild" placeholder="Enter here" type="text" />
          <CustomRadioButton name="radioOption" options={radioOptions} />
          <Button
            type="submit"
            backgroundColor={"primary.800"}
            _hover={{ backgroundColor: "primary.800" }}
            color={"white"}
            borderRadius={"full"}
            my={"4"}
            px={"10"}
          >
            save
          </Button>
        </form>
      </FormProvider>

      <Box
        w="50px"
        h="50px"
        borderRadius="full"
        backgroundColor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={handleClick}
      >
        {clickCount >= 0 && (
          <>
            {isEvenClick ? (
              <Image src={RightTickImage} alt="Right tick" />
            ) : (
              <Image src={WrongTickImage} alt="Wrong tick" />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CircleComponent;
