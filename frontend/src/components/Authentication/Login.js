import React, { useState } from "react";
import {
  
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Flex,
  Container,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);
  const submitHandler = async() => {
setLoading(true);
if(!email || !password){
  toast({
     title: "Please Fill all the Fields",
     status : "warning",
     duration: 5000,
     isClosable: true,
     position : 'bottom',
  });
  setLoading(false);
  return;
}
try{
  const config = {
   headers:{
    "Content-type":"application/json",
   },
  };
  const {data} = await axios.post(
    "api/user/login",
    {email, password},
    config
  );
  toast({
    title:"Login Successful",
    status : "success",
    duration:5000,
    isClosable:true,
    position : "bottom",
  });
  localStorage.setItem("userInfo", JSON.stringify(data));
  setLoading(false);
  history.push("/chats");
} catch(error){
  toast({
    title:'Error Occured!',
    description:error.response.data.message,
    status:"error",
    duration:5000,
    isClosable:true,
    position:"bottom",
  });
  setLoading(false);
}
  };

  return (
    <Container maxW="5xl" centerContent py={10}>
      {/* App Name */}
      <Text
        fontSize="4xl"
        fontWeight="extrabold"
        color="purple.600"
        mb={8}
        textAlign="center"
      >
        🌐 RealMingle
      </Text>

      {/* Login Card */}
      <Flex
        direction="column"
        w="100%"
        maxW="500px"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        bg="white"
        p={{ base: 5, md: 8 }}
      >
        <Text fontSize="2xl" fontWeight="bold" color="purple.600" mb={5} textAlign="center">
          LOGIN HERE
        </Text>

        <VStack spacing={4} fontSize="sm">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="sm">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.5rem" size="xs" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            width="50%"
            mt={2}
            size="sm"
            bgGradient="linear(to-r, teal.400, purple.400)"
            color="white"
            fontWeight="bold"
            _hover={{ opacity: 0.9 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Login
          </Button>

          <Button
            width="50%"
            size="sm"
            bgGradient="linear(to-r, pink.400, purple.400)"
            color="white"
            fontWeight="bold"
            _hover={{ opacity: 0.9 }}
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Get Guest User Credentials
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Login;
