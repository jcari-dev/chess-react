import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Box, Center, Text, Tag, HStack } from "@chakra-ui/react";
import axios from "axios";
import { JoinRoom } from "../../utils/Room";
import ChessBoard from "../../components/main/board/Board";
import endpoints from "../../utils/Endpoints";
import { Helmet } from "react-helmet";

function Room() {
  const { roomId } = useParams();
  document.title = `Room ${roomId}`;
  const [userId, setUserId] = useState("");
  const [otherPlayerId, setOtherPlayerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        {isLoading ? (
          <Center height="100vh">
            <Box
              textAlign="center"
              padding="20px"
              boxShadow="lg"
              borderRadius="lg"
            >
              <Spinner size="xl" marginBottom="4" />
              <Text fontSize="lg">Waiting for all players to join...</Text>
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
      </Helmet>
    </div>
  );
}

export default Room;
