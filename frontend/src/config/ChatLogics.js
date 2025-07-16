export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return "Unknown";
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return null;
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages = [], m, i, userId) => {
  if (!messages || !m || !m.sender || !userId || i === undefined) return false;
  if (i >= messages.length - 1) return false;
  
  const nextMessage = messages[i + 1];
  if (!nextMessage || !nextMessage.sender) return false;
  
  return (
    nextMessage.sender._id !== m.sender._id &&
    m.sender._id !== userId
  );
};

export const isLastMessage = (messages = [], i, userId) => {
  if (!messages || !userId || i === undefined) return false;
  if (messages.length === 0) return false;
  
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || !lastMessage.sender) return false;
  
  return (
    i === messages.length - 1 &&
    lastMessage.sender._id !== userId
  );
};

export const isSameSenderMargin = (messages = [], m, i, userId) => {
  if (!messages || !m || !m.sender || !userId || i === undefined) return "auto";
  
  // Check if next message exists and has same sender
  if (i < messages.length - 1) {
    const nextMessage = messages[i + 1];
    if (nextMessage && nextMessage.sender) {
      if (nextMessage.sender._id === m.sender._id && m.sender._id !== userId) {
        return 33;
      }
    }
  }

  // Check if different sender or last message
  if (
    (i < messages.length - 1 && 
     messages[i + 1].sender._id !== m.sender._id &&
     m.sender._id !== userId) ||
    (i === messages.length - 1 && m.sender._id !== userId)
  ) {
    return 0;
  }

  return "auto";
};

export const isSameUser = (messages = [], m, i, userId) => {
  if (!messages || !m || !m.sender || i === undefined || i <= 0) return false;
  
  const prevMessage = messages[i - 1];
  if (!prevMessage || !prevMessage.sender) return false;
  
  return prevMessage.sender._id === m.sender._id;
};