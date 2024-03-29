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
  Spinner,
  Link,
  useToast,
} from "@chakra-ui/react";
import Cover from "../../data/pages/home/knight-chess.webp";
import { CreateRoom } from "../../utils/Room";

function PlayCard() {
  const [showUrl, setShowUrl] = useState(false);
  const [uniqueUrl, setUniqueUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { hasCopied, onCopy } = useClipboard(uniqueUrl);

  async function generateRoomUrl() {
    setIsLoading(true);
    const roomId = await CreateRoom();
    setUniqueUrl(`${window.location.origin}/room/${roomId}`);
    setShowUrl(true);
    setIsLoading(false);
  }

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Coming up soon!",
      description: (
        <>
          Follow development on{" "}
          <a
            href="https://github.com/jcari-dev/chess-react/issues?q=is%3Aissue+is%3Aopen+label%3ACPU"
            style={{ color: "blue.500" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub! 👀
          </a>
        </>
      ),
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

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
            Select Game Mode:
          </Text>
          <Image
            src={Cover}
            boxSize="150px"
            objectFit="cover"
            alt="Chess"
            transform="scaleX(-1)"
          />
          <Button colorScheme="teal" onClick={showToast}>
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
              <Box as="footer" width="full" padding="4" textAlign="center">
      <Text>
        Made with <span role="img" aria-label="heart">❤️</span> by 
        <Link href="https://github.com/jcari-dev" isExternal color="teal.500" marginLeft="1">
          Jorge Caridad
        </Link>
      </Text>
    </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default PlayCard;
