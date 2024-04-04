import { Heading, Box } from "@chakra-ui/react";

function Turn({ myTurn, winner, isPlayerBlack }) {
  let status;
  let text = myTurn ? "Your turn." : "Awaiting on your opponent.";

  if (winner) {
    status = "Checkmate.";
    text =
      (isPlayerBlack && winner === "black") ||
      (!isPlayerBlack && winner === "white")
        ? "You win!"
        : "Your Opponent Won.";
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {status && <Heading size="lg">{status}</Heading>}
      <Heading size="md">{text}</Heading>
    </Box>
  );
}

export default Turn;
