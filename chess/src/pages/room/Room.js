import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Spinner,
  Box,
  Center,
  Text,
  Tag,
  HStack,
  Button,
  Input,
  useClipboard,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { JoinRoom } from "../../utils/Room";
import ChessBoard from "../../components/main/board/Board";
import endpoints from "../../utils/Endpoints";
import { Helmet } from "react-helmet";
import { FaCopy } from "react-icons/fa";

function Room() {
  const { roomId } = useParams();
  document.title = `Room ${roomId}`;
  const [userId, setUserId] = useState("");
  const [otherPlayerId, setOtherPlayerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const url = window.location.href;
  const { hasCopied, onCopy } = useClipboard(url);

  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: "URL Successfully Copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Join room and start polling once userId is set

  useEffect(() => {
    if (!userId) return; // Exit if userId is not set

    const joinAndCheckRoomStatus = async () => {
      await JoinRoom(userId, roomId);

      // Start polling
      const intervalId = setInterval(async () => {
        const response = await axios.get(
          `${endpoints.checkRoom}/${roomId}?userId=${userId}`
        );
        const { playerA, playerB, hasPlayerA, hasPlayerB } = response.data;

        if (
          (userId === playerA && hasPlayerB) ||
          (userId === playerB && hasPlayerA)
        ) {
          clearInterval(intervalId); // Stop polling
          setIsLoading(false);
          setOtherPlayerId(userId === playerA ? playerB : playerA); // Set other player ID
        }
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    };

    joinAndCheckRoomStatus();
  }, [userId, roomId]);

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content={`Let's play together, join my room now!`}
        />
      </Helmet>

      {isLoading ? (
        <Center height="100vh">
          <Box
            textAlign="center"
            p="20px"
            boxShadow="2xl"
            borderRadius="lg"
            bg="white"
            maxW="lg"
            w="full"
            m="auto"
            spacing={4}
          >
            <Spinner size="xl" marginBottom="4" />
            <Text fontSize="lg" mb="4">
              Waiting for all players to join...
            </Text>
            <InputGroup size="md" mb="4">
              <Input
                pr="4.5rem"
                value={url}
                isReadOnly
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleCopy}>
                  <FaCopy />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="lg" mt="4">
              Copy this URL with the friend you wish to play against. :)
            </Text>
          </Box>
        </Center>
      ) : (
        <div>
          <ChessBoard
            userId={userId}
            otherPlayerId={otherPlayerId}
            roomId={roomId}
          />
          <Box display="flex" justifyContent="center">
            <HStack spacing={4}>
              <Tag colorScheme="blue">Your ID: {userId}</Tag>

              <Tag colorScheme="green">Room ID: {roomId}</Tag>

              <Tag colorScheme="red">Opponent's ID: {otherPlayerId}</Tag>
            </HStack>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Room;
