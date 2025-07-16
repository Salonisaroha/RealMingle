import React, { useEffect, useState, useCallback } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = useCallback(async () => {
    if (!user?.token) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.error("Fetch chats error:", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }, [user, setChats, toast]);

  useEffect(() => {
    fetchChats();
  }, [fetchAgain, fetchChats]);

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
      border="1px solid"
      borderColor="gray.200"
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
        <GroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
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
            New Group
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="md"
        overflowY="hidden"
      >
        {chats && chats.length > 0 ? (
          <Stack overflowY="auto" spacing={2}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat?._id === chat._id ? "teal.400" : "#E8E8E8"}
                color={selectedChat?._id === chat._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="md"
                key={chat._id}
                _hover={{
                  bg:
                    selectedChat?._id === chat._id ? "teal.500" : "gray.200",
                }}
                transition="all 0.2s ease"
              >
                <Text
                  fontWeight={
                    selectedChat?._id === chat._id ? "bold" : "normal"
                  }
                >
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs" mt={1} isTruncated>
                    <b>{chat.latestMessage.sender?.name} : </b>
                    {chat.latestMessage.content}
                  </Text>
                )}
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
