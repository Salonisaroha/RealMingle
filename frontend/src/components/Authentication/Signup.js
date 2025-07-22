import React, { useState } from "react";
import '../../App.css'; 


import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; 

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setLoading(true);

    if (!pics) {
      toast({ title: "Please select an image!", status: "warning" });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");

      console.log("Uploading file:", pics);
      console.log("FormData:", [...data.entries()]);

      fetch("https://api.cloudinary.com/v1_1/dmqj6q6np/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Cloudinary upload response:", data); 
          if (data.secure_url) {
            setPic(data.secure_url);
            console.log("Uploaded image URL:", data.secure_url); 
          } else {
            console.error("Upload failed:", data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    } else {
      toast({ title: "Invalid file type!", status: "warning" });
      setLoading(false);
    }
  };

const submitHandler = async () => {
  if (loading) return; 
  setLoading(true);

  if (!name || !email || !password || !confirmpassword) {
    toast({
      title: "Please Fill all the Fields",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (password !== confirmpassword) {
    toast({
      title: "Passwords Do Not Match",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user",
      { name, email, password, pic },
      config
    );
    toast({
      title: "Registration is Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    history.push("/chats");
  } catch (error) {
    toast({
      title: "Error Occured!",
      description:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};


 return (
  <div className="App"> {/* 👈 This applies your background image */}
    <Flex
      direction={{ base: "column", md: "row" }}
      w="100%"
      borderRadius="lg"
      boxShadow="xl"
      overflow="hidden"
      bg="white"
      minH={{ base: "auto", md: "420px" }}
    >
      {/* Left Gradient Panel */}
      <Flex
        flex="1"
        bgGradient="linear(to-b, teal.400, purple.400)"
        color="white"
        p={6}
        align="center"
        justify="center"
        textAlign="center"
      >
        <Box maxW="800px">
          <Text fontSize="4xl" fontWeight="bold" mb={3}>
            💬 Digital Chat
          </Text>
          <Text fontSize="md" fontWeight="bold" mb={3} lineHeight="1.6">
            Share your smile with the world
            <br />
            and find your people.
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            ☕ Enjoy!
          </Text>
        </Box>
      </Flex>

      {/* Right Form Panel */}
      <Box flex="1" p={{ base: 5, md: 8 }}>
        <Text fontSize="1xl" fontWeight="bold" color="purple.600" mb={5}>
          SIGN UP HERE
        </Text>

        <VStack spacing={4} fontSize="sm">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              size="sm"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="sm">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.5rem" size="xs" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="sm">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.5rem" size="xs" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="pic">
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
              size="sm"
              type="file"
              p={1}
              h="32px"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>

          <Button
            width="80%"
            mt={2}
            size="sm"
            bgGradient="linear(to-r, teal.400, purple.400)"
            color="white"
            fontWeight="bold"
            _hover={{ opacity: 0.9 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Continue
          </Button>

          <Text fontSize="sm" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#805AD5", fontWeight: "bold" }}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  </div>
);
}

export default Signup;
