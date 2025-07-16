import { Avatar, Tooltip, Box, Text } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef } from "react";

const ScrollableChat = ({ messages = [] }) => {
  const { user } = ChatState();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Safe message rendering
  const renderMessage = (m, i) => {
    if (!m || !m.sender || !user) return null;
    
    return (
      <Box display="flex" key={m._id || i} mb={2}>
        {(isSameSender(messages, m, i, user._id) ||
          isLastMessage(messages, i, user._id)) && (
          <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
            <Avatar
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
              name={m.sender.name}
              src={m.sender.pic}
            />
          </Tooltip>
        )}
        <Box
          bg={m.sender._id === user._id ? "blue.100" : "green.100"}
          ml={isSameSenderMargin(messages, m, i, user._id)}
          mt={isSameUser(messages, m, i, user._id) ? 1 : 2}
          borderRadius="lg"
          px={3}
          py={2}
          maxWidth="75%"
        >
          {m.content}
        </Box>
      </Box>
    );
  };

  return (
    <Box overflowY="auto" p={3} h="100%">
      {!messages || messages.length === 0 ? (
        <Box p={3} textAlign="center">
          <Text color="gray.500">No messages yet</Text>
        </Box>
      ) : (
        messages.map(renderMessage)
      )}
      <div ref={bottomRef} />
    </Box>
  );
};

export default ScrollableChat;