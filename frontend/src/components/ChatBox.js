import React from "react";
import { Box, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border="1px solid #E2E8F0"
      w={{ base: "100%", md: "68%" }}
      h="91.5vh"
    >
      {/* Always show ChatBox heading */}
      <Box
        mb={4}
        px={3}
        py={2}
        borderBottom="1px solid #E2E8F0"
      >
        <Text
          fontSize={{ base: "20px", md: "22px" }}
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          color="gray.700"
        >
          ChatBox
        </Text>
      </Box>

      {selectedChat ? (
        <>
          {/* Show SingleChat header */}
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

          {/* Chat Messages */}
          <VStack
            flex="1"
            w="100%"
            spacing={4}
            overflowY="auto"
            p={3}
            bg="gray.50"
            borderRadius="md"
            sx={{
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E0 #EDF2F7",
            }}
          >
            <Text color="gray.500">Your messages will appear here...</Text>
          </VStack>

          {/* Input Box */}
          <HStack mt={4} spacing={3}>
            <Input
              placeholder="Type a message..."
              bg="gray.100"
              borderRadius="md"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px teal.400",
              }}
            />
            <Button
              rounded="md"
              px={4}
              bg="teal.400"
              color="white"
              _hover={{ bg: "teal.500" }}
            >
              Send
            </Button>
          </HStack>
        </>
      ) : (
        // Centered message below ChatBox heading
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex="1"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="gray.600" textAlign="center">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
