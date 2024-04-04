import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import endpoints from "../../utils/Endpoints";
import { getCsrfToken } from "../../utils/Auth";
import { useAuth0 } from "@auth0/auth0-react";


function CpuDispatch() {
  const [difficulty, setDifficulty] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState("random");
  const navigate = useNavigate(); // Initialize navigate
  const { isAuthenticated, user } = useAuth0();
  const userId =
    isAuthenticated && user ? user.name : localStorage.getItem("userId");
  const difficulties = [
    "Village Hero (Beginner)",
    "Defender of the Realm (Easy)",
    "Knight of the Chess Table (Medium)",
    "Grandmaster Quest (Hard)",
    "Legend of the Kings (Expert)",
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const beginGame = async () => {
    try {
      const token = await getCsrfToken();
      console.log(difficulties[difficulty], selectedColor);
      const { data } = await axios.post(
        endpoints.cpuCreateRoom,
        {
          difficulty: difficulties[difficulty],
          color: selectedColor,
          userId: userId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": token,
          },
          withCredentials: true,
        }
      );
      navigate(`/cpu/${data.room}`); // Redirect to the new room
    } catch (error) {
      console.error("Error starting the game:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box width="60%" p={5} shadow="md" borderWidth="1px">
        <VStack spacing={4}>
          <Text fontSize="xl">Choose Your Difficulty</Text>
          <Slider
            aria-label="difficulty-slider"
            defaultValue={0}
            min={0}
            max={4}
            step={1}
            onChange={(val) => setDifficulty(val)}
            colorScheme="red"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb sx={{ bg: "blue.500" }} />
          </Slider>
          <Flex justify="space-between" width="100%">
            {difficulties.map((label, index) => (
              <Box key={index} textAlign="center" width="20%">
                {index === difficulty ? (
                  <Text fontWeight="bold">{label}</Text>
                ) : (
                  <Text fontSize="sm">{label}</Text>
                )}
              </Box>
            ))}
          </Flex>
          <Text fontSize="xl">Choose Your Pieces</Text>

          <ButtonGroup variant="outline" spacing="6">
            <Button
              bg={selectedColor === "white" ? "white" : undefined}
              color={selectedColor === "white" ? "black" : undefined}
              border="1px"
              borderColor={selectedColor === "white" ? "black" : "gray.200"}
              onClick={() => handleColorClick("white")}
            >
              White
            </Button>
            <Button
              colorScheme={selectedColor === "random" ? "blue" : "gray"}
              onClick={() => handleColorClick("random")}
            >
              Random
            </Button>
            <Button
              bg={selectedColor === "black" ? "black" : undefined}
              color={selectedColor === "black" ? "white" : undefined}
              border="1px"
              borderColor={selectedColor === "black" ? "white" : "gray.200"}
              onClick={() => handleColorClick("black")}
            >
              Black
            </Button>
          </ButtonGroup>

          <Button colorScheme="red" onClick={beginGame}>
            BEGIN!
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default CpuDispatch;
