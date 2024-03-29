import { Heading, Box } from "@chakra-ui/react";

function Turn({myTurn}) {
  let text = myTurn ? "Your turn." : "Awaiting on your opponent.";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>{text}</Heading>
    </Box>
  );
}

export default Turn;
