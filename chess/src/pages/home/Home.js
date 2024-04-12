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
} from "@chakra-ui/react";
import Cover from "../../data/pages/home/knight-chess.webp";
import { CreateRoom } from "../../utils/Room";
import { Helmet } from "react-helmet";
import BackdropExample from "../../components/main/home/BackendDown";
import LoginButton from "../../components/main/login/Login";
import { useNavigate } from "react-router-dom";

function PlayCard() {
  const [showUrl, setShowUrl] = useState(false);
  const [uniqueUrl, setUniqueUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { hasCopied, onCopy } = useClipboard(uniqueUrl);

  async function generateRoomUrl() {
    setIsLoading(true);
    const roomId = await CreateRoom();
    setUniqueUrl(`${window.location.origin}/room/${roomId}`);
      window.open(`${window.location.origin}/room/${roomId}`, '_blank', 'noopener,noreferrer');

    setShowUrl(true);
    setIsLoading(false);
  }



  const navigate = useNavigate();
  const redirectToCpu = () => {
    navigate("/cpu");
  };
  return (
    <div>
      <LoginButton />
      <BackdropExample />
      <Helmet>
        <meta name="description" content="Home Page - Welcome to PlayChess!" />
      </Helmet>

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
            <Button colorScheme="teal" onClick={redirectToCpu}>
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
                Made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by
                <Link
                  href="https://github.com/jcari-dev"
                  isExternal
                  color="teal.500"
                  marginLeft="1"
                >
                  Jorge Caridad
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </div>
  );
}

export default PlayCard;
