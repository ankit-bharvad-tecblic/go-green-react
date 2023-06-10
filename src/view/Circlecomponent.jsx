import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import RightTickImage from "../assets/Images/RightTickImage.svg";
import WrongTickImage from "../assets/Images/WrongTickImage.svg";

const CircleComponent = () => {
  const [clickCount, setClickCount] = useState(-1);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const isEvenClick = clickCount >= 0 && clickCount % 2 === 0;

  return (
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
  );
};

export default CircleComponent;
