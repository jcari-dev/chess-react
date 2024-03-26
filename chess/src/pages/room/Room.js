import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Box, Center, Text } from "@chakra-ui/react";
import axios from "axios";
import { JoinRoom } from "../../utils/Room";
import Board from "../../components/main/board/Board";

function Room() {
  const { roomId } = useParams();
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
        const response = await axios.get(`http://127.0.0.1:8000/api/check-room/${roomId}?userId=${userId}`);
        const { playerA, playerB, hasPlayerA, hasPlayerB } = response.data;

        if ((userId === playerA && hasPlayerB) || (userId === playerB && hasPlayerA)) {
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
      {isLoading ? (
        <Center height="100vh">
          <Box textAlign="center" padding="20px" boxShadow="lg" borderRadius="lg">
            <Spinner size="xl" marginBottom="4" />
            <Text fontSize="lg">Waiting for all players to join...</Text>
          </Box>
        </Center>
      ) : (
        <div>
          <p>Room ID: {roomId}</p>
          <p>Your ID: {userId}</p>
          <p>Other Player ID: {otherPlayerId}</p>
          <Board userId={userId} otherPlayerId={otherPlayerId} roomId={roomId}/>
        </div>
      )}
    </div>
  );
}

export default Room;
