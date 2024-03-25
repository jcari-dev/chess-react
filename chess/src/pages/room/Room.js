import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Room() {
  // Access the roomId parameter from the URL
  const { roomId } = useParams();

  useEffect(() => {
    // Function to generate or retrieve a unique user identifier
    const getUserId = () => {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        // Simple method to generate a UUID
        userId = 'user_' + Math.random().toString(36).slice(2, 11);
        localStorage.setItem('userId', userId);
      }
      console.log(userId)
      return userId;
    };

    const logPageView = async () => {
      const userId = getUserId();
      const data = { userId, roomId, timestamp: new Date().toISOString() };
      
      // Send a POST request to your logging endpoint
      await fetch('/api/log-page-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    };

    // Call the logging function for the current page load
    logPageView();
  }, [roomId]); // Dependency array with roomId ensures the effect runs again if the roomId changes

  return (
    <div>
      <p>Room ID: {roomId}</p>
      {/* Render your game UI based on the roomId */}
    </div>
  );
}

export default Room;
