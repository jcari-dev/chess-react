import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  useClipboard,
  VStack,
  Flex,
  Text,
  Image,
  Spinner, // Make sure to include Spinner in the import
} from "@chakra-ui/react";
import Cover from "../../data/pages/home/knight-chess.webp";
import { CreateRoom } from "../../utils/Room";

function PlayCard() {
  const [showUrl, setShowUrl] = useState(false);
  const [uniqueUrl, setUniqueUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { hasCopied, onCopy } = useClipboard(uniqueUrl);

  async function generateRoomUrl() {
    setIsLoading(true); // Start loading
    const roomId = await CreateRoom();
    setUniqueUrl(`http://localhost:3000/room/${roomId}`);
    setShowUrl(true);
    setIsLoading(false); // End loading
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor={"wheat"}
    >
      <Box w="500px" p={4} boxShadow="md" borderRadius="md" bg="white">
        <VStack spacing={4}>
          <Text fontSize="3xl" fontWeight="bold">
            Chess Online
          </Text>
          <Image
            src={Cover}
            boxSize="150px"
            objectFit="cover"
            alt="Chess"
            transform="scaleX(-1)"
          />
          <Button colorScheme="teal" onClick={() => setShowUrl(false)}>
            Play vs CPU
          </Button>
          <Button
            colorScheme="orange"
            onClick={generateRoomUrl}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Play vs a Friend"}
          </Button>
          {showUrl && (
            <VStack spacing={2}>
              {isLoading ? (
                <Spinner size="md" />
              ) : (
                <>
                  <Input
                    value={uniqueUrl}
                    isReadOnly
                    placeholder="Unique URL"
                    width="auto"
                  />
                  <Button onClick={onCopy}>
                    {hasCopied ? "Copied" : "Copy URL"}
                  </Button>
                <Text>Share the URL to play with your friend! :) </Text>
                </>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default PlayCard;
