import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import RightTickImage from "../assets/Images/RightTickImage.svg";
import WrongTickImage from "../assets/Images/WrongTickImage.svg";
import AccessWebcamWithLocation from "../components/AccessWebcamWithLocation/AccessWebcamWithLocation";

const CircleComponent = () => {
  const [clickCount, setClickCount] = useState(-1);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const isEvenClick = clickCount >= 0 && clickCount % 2 === 0;

  return (
    <Box>
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
      <AccessWebcamWithLocation />
    </Box>
  );
};

export default CircleComponent;
