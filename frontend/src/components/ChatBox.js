import React from "react";
import { Box, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";

const ChatBox = () => {
  return (
    <Box
      display={{ base: "flex", md: "flex" }}
      flexDir="column"
      justifyContent="space-between"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border="1px solid #E2E8F0"
      w={{ base: "100%", md: "68%" }}
      h="91.5vh"
      
    >
      {/* Header */}
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

      {/* Input Area */}
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
          _hover={{
            bg: "teal.500",
          }}
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;
