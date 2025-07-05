import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.error("Failed to load the chats", error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      w={{ base: "100%", md: "30%" }}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border="1px solid #E2E8F0" // subtle border
    >
      <Box
        pb={4}
        px={3}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "24px", md: "26px" }}
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          color="gray.700"
        >
          My Chats
        </Text>

        <Button
          size="sm"
          rounded="md"
          px={3}
          fontSize="sm"
          leftIcon={<AddIcon />}
          bg="teal.400"
          color="white"
          _hover={{
            bg: "teal.500",
          }}
        >
          New
        </Button>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={2}
        bg="gray.50"
        w="100%"
        h="100%"
        borderRadius="md"
        overflowY="scroll"
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #EDF2F7",
        }}
      >
        {chats ? (
          <Stack spacing={2}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "teal.400" : "white"}
                color={selectedChat === chat ? "white" : "gray.800"}
                px={4}
                py={2}
                borderRadius="md"
                border="1px solid #E2E8F0"
                _hover={{
                  bg: selectedChat === chat ? "teal.500" : "gray.100",
                }}
              >
                <Text fontSize="sm" fontWeight="medium">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
