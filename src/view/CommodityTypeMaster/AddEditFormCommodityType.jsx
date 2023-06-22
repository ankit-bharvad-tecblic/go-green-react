import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import generateFormField from "../../components/Elements/GenerateFormField";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formFields } from "./fields";

const schema = yup.object().shape({
  commodity_type: yup.string().required("please fill the commodity type."),
  description: yup.string().required("Please fill the description."),
});

function AddEditFormCommodityType() {
  const location = useLocation();

  const details = location?.state?.detail || {};

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (details?.id) {
      let obj = {
        commodity_type: details.commodity_type,
        description: details.description,
      };

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
  }, [details]);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Box border="0px" p="30px" borderRadius="15px" background="white">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {formFields &&
              formFields.map((item, index) => (
                <Flex key={index} alignItems="center" gap="10px">
                  <Text flex={"none"} width="250px" textAlign="right">
                    {" "}
                    {item.label}{" "}
                  </Text>
                  {generateFormField({ ...item, label: "", style: { mb: 4 } })}
                </Flex>
              ))}
            <Flex direction="row-reverse">
              <Button
                type="submit"
                w={"200px"}
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                my={"4"}
                px={"10"}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </>
  );
}

export default AddEditFormCommodityType;
