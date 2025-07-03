import React, { useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Signup from "../components/Authentication/Signup";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Homepage = () => {
  const history =  useHistory();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push("/chats");
  }, [history]);
  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      justify="center"
      
      px={4}
      py={2}
    >
      {/* App Name */}
      <Text
        fontSize="4xl"
        fontWeight="extrabold"
        color="purple.600"
        mb={3}
        textAlign="center"
      >
        🌐 RealMingle
      </Text>

      {/* Wider Card */}
      <Box
        bg="white"
        w="130%"
        maxW="1400px"    // ✅ Wider card (adjust as you like)
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
      >
        <Signup />
      </Box>
    </Flex>
  );
};

export default Homepage;
