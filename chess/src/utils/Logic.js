function adjacentEnemyPawn(
  board,
  pawnToCheck,
  squareToTheLeft,
  squareToTheRight
) {
  console.log("Checking for adjacent pawns at: ", pawnToCheck);
  const colorOfPawnToCheck = pawnToCheck[0]; // should be either b or w
  const result = {};
  result[squareToTheLeft] = false;
  result[squareToTheRight] = false;
  if (
    squareToTheLeft &&
    board[squareToTheLeft].piece[0] !== colorOfPawnToCheck
  ) {
    result[squareToTheLeft] = true;
  }

  if (
    squareToTheRight &&
    board[squareToTheRight].piece[0] !== colorOfPawnToCheck
  ) {
    result[squareToTheRight] = true;
  }

  if (result[squareToTheLeft] && result[squareToTheRight]) {
    return result;
  }

  return false;
}

export { adjacentEnemyPawn };
