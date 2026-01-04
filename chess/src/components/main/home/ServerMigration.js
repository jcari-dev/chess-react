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
  Link,
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
    onOpen();
  }, [onOpen]);

  const GITHUB_URL = "https://github.com/jcari-dev/chess-react";

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Project Sunset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Hey, thank you for checking out this project. It is no longer
              maintained and the live app has been sunsetted.
            </Text>

            <Text fontSize="sm" opacity={0.8}>
              Every time I checked the server logs, I noticed quite a few visitors.
              Thanks again for all the support, it truly means a lot!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              as={Link}
              href={GITHUB_URL}
              isExternal
              colorScheme="blue"
              mr={3}
            >
              View on GitHub
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ServerMigration;
