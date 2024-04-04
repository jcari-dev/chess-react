import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Link,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCsrfToken } from "../../utils/Auth";
import endpoints from "../../utils/Endpoints";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const userId =
    isAuthenticated && user ? user.name : localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getCsrfToken();

        const response = await axios.post(
          `${endpoints.getProfile}`,
          { userId: userId },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": token,
            },
            withCredentials: true,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoadingError(true);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // Calculate stats function moved inside component to be used after data is fetched
  const calculateStats = (matches) => {
    let wins = 0;
    let losses = 0;
    matches.forEach((match) => {
      if (match.winner === "Unknown") return; // Skip pending matches

      const userColor =
        userId === match.player_a ? match.player_a_color : match.player_b_color;
      if (match.winner === userColor) {
        wins += 1;
      } else {
        losses += 1;
      }
    });

    const totalGames = wins + losses;
    const winrate = totalGames ? Math.round((wins / totalGames) * 100) : 0;
    return { wins, losses, winrate };
  };

  // Only calculate stats if profileData is available
  const stats = profileData
    ? calculateStats(profileData.matches)
    : { wins: 0, losses: 0, winrate: 0 };

  if (loadingError) {
    return (
      <Center height="100vh">
        <Box textAlign="center" padding="20px" boxShadow="lg" borderRadius="lg">
          <Text fontSize="lg" color="red.500">
            Failed to fetch profile. Please try again later.
          </Text>
        </Box>
      </Center>
    );
  }

  if (!profileData) {
    return (
      <Center height="100vh">
        <Box textAlign="center" padding="20px" boxShadow="lg" borderRadius="lg">
          <Spinner size="xl" marginBottom="4" />
          <Text fontSize="lg">Gathering your profile details...</Text>
        </Box>
      </Center>
    );
  }

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="2xl">Player: {userId}</Text>
      <Box>
        <Text>Wins: {stats.wins}</Text>
        <Text>Loses: {stats.losses}</Text>
        <Text>Winrate: {stats.winrate}%</Text>
      </Box>
      <VStack align="start" spacing={3}>
        <Text fontSize="xl">Match History:</Text>
        {profileData.matches.map((match, index) => (
          <Box
            key={index}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="full"
            bg={
              match.winner === "Unknown"
                ? "gray.100"
                : (userId === match.player_a &&
                    match.player_a_color === match.winner) ||
                  (userId === match.player_b &&
                    match.player_b_color === match.winner)
                ? "green.100"
                : "red.100"
            }
          >
            <HStack justify="space-between">
              <Text>
                Room:{" "}
                <Link color="teal.500" href={`/match-history/${match.room_id}`}>
                  {match.room_id}
                </Link>
              </Text>
              <Text>Status: {match.status}</Text>
            </HStack>
            <Text>
              Opponent:{" "}
              {userId === match.player_a ? match.player_b : match.player_a}
            </Text>
            <Text>
              Result:{" "}
              {match.winner === "Unknown"
                ? "PENDING"
                : (userId === match.player_a &&
                    match.player_a_color === match.winner) ||
                  (userId === match.player_b &&
                    match.player_b_color === match.winner)
                ? "Won"
                : "Lost"}
            </Text>
            <Text>
              Date Played: {new Date(match.last_played).toLocaleDateString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Profile;
