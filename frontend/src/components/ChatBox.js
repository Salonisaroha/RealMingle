import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border="1px solid #E2E8F0"
      w={{ base: "100%", md: "68%" }}
      h="91.5vh"
    >
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="xl" color="gray.500">
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
