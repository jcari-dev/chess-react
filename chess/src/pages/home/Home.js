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
} from "@chakra-ui/react";
import Cover from "../../data/pages/home/knight-chess.webp";
import { CreateRoom } from "../../utils/Room";

function PlayCard() {
  const [showUrl, setShowUrl] = useState(false);
  // const uniqueUrl = "http://localhost:3000/room/123";
  const [uniqueUrl, setUniqueUrl] = useState("");

  const { hasCopied, onCopy } = useClipboard(uniqueUrl);

  async function generateRoomUrl() {
    const roomId = await CreateRoom();
    setUniqueUrl(`http://localhost:3000/room/${roomId}`);
    setShowUrl(true);
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor={"wheat"}
    >
      <Box w="300px" p={4} boxShadow="md" borderRadius="md" bg="white">
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
          <Button colorScheme="orange" onClick={generateRoomUrl}>
            Play vs a Friend
          </Button>
          {showUrl && (
            <VStack spacing={2}>
              <Input value={uniqueUrl} isReadOnly placeholder="Unique URL" />
              <Button onClick={onCopy}>
                {hasCopied ? "Copied" : "Copy URL"}
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default PlayCard;
