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
import axios from "axios";
import endpoints from "../../../utils/Endpoints";

function BackdropExample() {
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
    const checkServerResponse = async () => {
      try {
        const response = await axios.get(`${endpoints.vitals}`, {
          withCredentials: true,
          timeout: 1500,
        });
        if (response.status !== 200) {
          onOpen();
        }
      } catch (error) {
        console.error("Error contacting the server: ", error);
        onOpen();
      }
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
              The backend server seems to be down, which means playing will not
              be possible at this moment. The server is responsible for managing
              room creation, move validation, and other critical functions.
            </Text>
            <Text mb={4}>
              If you're trying to use this app and are seeing this message, it
              indicates a problem with the backend, which is locally hosted on
              an old laptop running Ubuntu Server.
            </Text>
            <Text>
              Please let me know by clicking one of the buttons below. Your
              assistance is greatly appreciated!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              as="a"
              href="https://github.com/jcari-dev/chess-react/issues/new?title=Chess+Project+Backend+Down!"
              target="_blank"
              colorScheme="orange"
              mr={3}
            >
              Report on GitHub
            </Button>
            <Button
              as="a"
              href={`mailto:contactme@jorgecaridad.dev?subject=Chess project backend down!&body=Hello Jorge,%0D%0A%0D%0AI am currently trying to test your project but I am unable because the backend seems to be down, can you please take a look?%0D%0ABest,%0D%0ASomeoneAwesome`}
              target="_blank"
              colorScheme="teal"
            >
              Report to Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BackdropExample;
