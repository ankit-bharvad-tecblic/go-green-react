import React, { useState } from "react";
import { Box, Button, Image } from "@chakra-ui/react";
import RightTickImage from "../assets/Images/RightTickImage.svg";
import WrongTickImage from "../assets/Images/WrongTickImage.svg";

import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomCheckbox from "../components/Element/CustomCheckbox";
import CustomSelector from "../components/Element/CustomSelector";
import CustomInput from "../components/Element/CustomInput";
import CustomTextarea from "../components/Element/CustomTextarea";
import CustomRadioButton from "../components/Element/CustomRadioButton";

const Circlecomponent = () => {
  const [clickCount, setClickCount] = useState(-1);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const schema = yup.object().shape({
    checkboxField: yup.boolean().oneOf([true], "Please accept the checkbox"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const isEvenClick = clickCount >= 0 && clickCount % 2 === 0;

  return (
    <>
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CustomCheckbox
            name="checkboxField"
            label="Checkbox Label"
            color="green"
            size={"md"}
          />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
      <Testing />
      <TestTextArea />
      <RadioTest />
      {/* <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CustomInput
            name="checkboxField"
            label="Checkbox Label"
            color="green"
            size={"md"}
          />

          <button type="submit">Submit</button>
        </form>
      </FormProvider> */}
    </>
  );
};

export default Circlecomponent;

const Testing = () => {
  const schema = yup.object().shape({
    selectorField: yup.string().required("Please select an option"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CustomSelector
            name="selectorField"
            label="Select an option"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            rules={{
              required: "Please select an option",
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </>
  );
};

const TestTextArea = () => {
  const schema = yup.object().shape({
    selectorField: yup.string().required("Please write something"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CustomTextarea
            name="selectorField"
            label="write someting here"
            size={"sm"}
          />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </>
  );
};

const RadioTest = () => {
  const schema = yup.object().shape({
    option1: yup.string().required("Please select an option for Option 1"),
    option2: yup.string().required("Please select an option for Option 2"),
    option3: yup.string().required("Please select an option for Option 3"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {["option1", "option2"].map((item) => (
            <CustomRadioButton
              Heading="xender"
              name={item}
              labels={["Option A", "Option B", "Option C"]}
              color="whatsapp"
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </>
  );
};
