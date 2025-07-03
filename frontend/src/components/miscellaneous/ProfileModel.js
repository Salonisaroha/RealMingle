import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  IconButton,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="2xl"
            fontFamily="Work sans"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              borderRadius="full"
              p="2px"
              bgGradient="linear(to-tr, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)"
              display="inline-block"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
            </Box>
            <Text
              mt={4}
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
