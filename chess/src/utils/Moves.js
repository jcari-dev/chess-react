import axios from "axios";
import { getCsrfToken } from "./Auth";

import endpoints from "./Endpoints";

async function getValidMoves(data) {
  // This function should take a square and a board.
  try {
    const token = await getCsrfToken();
    const response = await axios.post(
      `${endpoints.getValidMoves}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );
    if (response.data && response.data.legalMoves) {
      const legalMoves = response.data.legalMoves;
      // console.log(legalMoves)
      return legalMoves;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

function getLeftAndRightSquares(location) {
  const file = location[0];

  const fileToLeft = {
    b: "a",
    c: "b",
    d: "c",
    e: "d",
    f: "e",
    g: "f",
    h: "g",
    // 'a' has nothing to its left
  };

  const fileToRight = {
    a: "b",
    b: "c",
    c: "d",
    d: "e",
    e: "f",
    f: "g",
    g: "h",
    // 'h' has nothing to its right
  };

  const leftFile = fileToLeft[file];
  const rightFile = fileToRight[file];
  let squareToTheLeft = "";
  let squareToTheRight = "";

  if (leftFile) {
    squareToTheLeft = leftFile + location[1];
  }

  if (rightFile) {
    squareToTheRight = rightFile + location[1];
  }

  return {
    squareToTheLeft: squareToTheLeft,
    squareToTheRight: squareToTheRight,
  };
}

async function isItAValidMove(data) {
  // This function should take a square and a board.
  try {
    const token = await getCsrfToken();
    const response = await axios.post(
      `${endpoints.checkMoveContinuation}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );
    if (response.data && response.data.legalMoves) {
      const legalMoves = response.data.legalMoves;
      // console.log(legalMoves)
      return legalMoves;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export { getValidMoves, getLeftAndRightSquares, isItAValidMove };
