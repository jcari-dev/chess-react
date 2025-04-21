import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function ServerMigration() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const checkServerResponse = () => {
      onOpen();
    };

    checkServerResponse();
  }, [onOpen]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Server Migration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Hey, thank you for checking my project! I am currently migrating
              its infrastructure so it is easier for me to maintain! The migration
              should be completed no later than April 26th, 2025.
            </Text>
            <Text mb={4}>
              The app is currently not functional. My apologies for any
              inconvenience caused!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Got it, I will be back later!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ServerMigration;
