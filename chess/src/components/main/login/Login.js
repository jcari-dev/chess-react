import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import React from "react";

const NavBar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <Flex bg="orange.200" color="white" justifyContent="space-between" p={1}>
      <Box p="2">
        {isAuthenticated && user ? (
          <Text color="black">Welcome, {user.name}</Text>
        ) : (
          <Text color="black">PlayChess</Text>
        )}
      </Box>
      <Box>
        <Button colorScheme="teal" onClick={navigateToProfile} mr={4}>
          Check Your Profile!
        </Button>{" "}
        {isAuthenticated ? (
          <>
            {" "}
            <Button
              colorScheme="red"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button colorScheme="red" onClick={loginWithRedirect}>
            Log In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
