import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios'; // Assuming axios is used for HTTP requests
import { JoinRoom } from '../../utils/Room';

function Room() {
  const { roomId } = useParams();
  const [userId, setUserId] = useState('');
  const [userBId, setUserBId] = useState(''); // State to hold user_b ID
  const [isLoading, setIsLoading] = useState(true); // State to control the spinner

  // Function to fetch or generate userId
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).slice(2, 11);
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Function to check if user_b has joined
  const checkUserBJoined = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`http://127.0.0.1:8000/api/check-room/${roomId}`);
      if (response.data.playerBJoined) { // Adjust based on your actual response structure
        setIsLoading(false);
        setUserBId(response.data.playerBJoined); // Set user_b ID from response
      }
    } catch (error) {
      console.error('Failed to check if user_b has joined:', error);
    }
  };

  useEffect(() => {
    const currentUser = getUserId();
    setUserId(currentUser);
    JoinRoom(currentUser, roomId).then(() => {
      // Start polling after successfully joining the room
      const intervalId = setInterval(checkUserBJoined, 2000); // Poll every 2 seconds
      return () => clearInterval(intervalId); // Cleanup on component unmount
    });
  }, [roomId]);

  return (
    <div>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <div>
          <p>Room ID: {roomId}</p>
          <p>User A ID: {userId}</p>
          <p>User B ID: {userBId}</p>
        </div>
      )}
    </div>
  );
}

export default Room;
