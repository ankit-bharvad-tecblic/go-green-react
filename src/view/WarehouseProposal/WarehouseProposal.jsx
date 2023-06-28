import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";

import Pwh from "./Pwh.jsx";

const commonStyle = {
  mt: 2,
  w: {
    base: "100%",
    sm: "80%",
    md: "60%",
    lg: "55%",
  },
};

const WarehouseProposal = () => {
  const methods = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data==>", data);
  };

  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <Box bg="gray.50" p="5">
      {/* <Box p="2">
        <BreadcrumbCmp BreadcrumbList={BreadcrumbLinks} />
      </Box> */}

      <Box>
        <Heading as="h2" size="lg">
          Hiring Proposal
        </Heading>
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            bg="white"
            p="5"
            borderRadius={10}
            mt="4"
            display={{ base: "column", md: "flex" }}
          >
            <Box w="full" p="3">
              <MotionSlideUp duration={0.2 * 0.5} delay={0.1 * 0.5}>
                <ReactCustomSelect
                  name="Select-warehouse-Type"
                  label="Select warehouse Type"
                  options={[{ label: "testing ", value: "dslfj" }]}
                  selectedValue={{ label: "test", value: "test" }}
                  isClearable={false}
                  selectType="label"
                  style={{ w: commonStyle.w }}
                  handleOnChange={(val) =>
                    console.log("selectedOption @@@@@@@@@@@------> ", val)
                  }
                />
              </MotionSlideUp>
            </Box>

            <Box w="full" p="3">
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <ReactCustomSelect
                  name="Select-warehouse-Type"
                  label="Select warehouse Type"
                  options={[{ label: "testing ", value: "dslfj" }]}
                  selectedValue={{ label: "test", value: "test" }}
                  isClearable={false}
                  selectType="label"
                  style={{ w: commonStyle.w }}
                  handleOnChange={(val) =>
                    console.log("selectedOption @@@@@@@@@@@------> ", val)
                  }
                />
              </MotionSlideUp>
            </Box>
          </Box>

          <Box mt="10">
            <Pwh />
          </Box>

          <Box display="flex" justifyContent="flex-end" mt="10" px="0">
            <Button
              type="submit"
              //w="full"
              backgroundColor={"primary.700"}
              _hover={{ backgroundColor: "primary.700" }}
              color={"white"}
              borderRadius={"full"}
              isLoading={false}
              my={"4"}
              px={"10"}
            >
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default WarehouseProposal;
