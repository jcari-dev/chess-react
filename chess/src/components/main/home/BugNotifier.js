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

function BugNotifier() {
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
          <ModalHeader>Uh Oh!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Please note, there is a known rendering issue in CPU matches that
              may prevent you from completing the game (but feel free to give it
              a try!).
            </Text>

            <Text mb={4}>
              This bug does not affect player vs player mode and is currently
              being addressed!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Got it, thanks for the heads up!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BugNotifier;
