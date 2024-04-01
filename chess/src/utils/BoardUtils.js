import { getCsrfToken } from "./Auth";
import axios from "axios";

import endpoints from "./Endpoints";

let initBoard = {
  a8: { piece: "b_rook", color: "coral", highlight: false, check: false },
  b8: { piece: "b_knight", color: "white", highlight: false, check: false },
  c8: { piece: "b_bishop", color: "coral", highlight: false, check: false },
  d8: { piece: "b_queen", color: "white", highlight: false, check: false },
  e8: { piece: "b_king", color: "coral", highlight: false, check: false },
  f8: { piece: "b_bishop", color: "white", highlight: false, check: false },
  g8: { piece: "b_knight", color: "coral", highlight: false, check: false },
  h8: { piece: "b_rook", color: "white", highlight: false, check: false },
  a7: { piece: "b_pawn", color: "white", highlight: false, check: false },
  b7: { piece: "b_pawn", color: "coral", highlight: false, check: false },
  c7: { piece: "b_pawn", color: "white", highlight: false, check: false },
  d7: { piece: "b_pawn", color: "coral", highlight: false, check: false },
  e7: { piece: "b_pawn", color: "white", highlight: false, check: false },
  f7: { piece: "b_pawn", color: "coral", highlight: false, check: false },
  g7: { piece: "b_pawn", color: "white", highlight: false, check: false },
  h7: { piece: "b_pawn", color: "coral", highlight: false, check: false },
  a6: { piece: "", color: "coral", highlight: false, check: false },
  b6: { piece: "", color: "white", highlight: false, check: false },
  c6: { piece: "", color: "coral", highlight: false, check: false },
  d6: { piece: "", color: "white", highlight: false, check: false },
  e6: { piece: "", color: "coral", highlight: false, check: false },
  f6: { piece: "", color: "white", highlight: false, check: false },
  g6: { piece: "", color: "coral", highlight: false, check: false },
  h6: { piece: "", color: "white", highlight: false, check: false },
  a5: { piece: "", color: "white", highlight: false, check: false },
  b5: { piece: "", color: "coral", highlight: false, check: false },
  c5: { piece: "", color: "white", highlight: false, check: false },
  d5: { piece: "", color: "coral", highlight: false, check: false },
  e5: { piece: "", color: "white", highlight: false, check: false },
  f5: { piece: "", color: "coral", highlight: false, check: false },
  g5: { piece: "", color: "white", highlight: false, check: false },
  h5: { piece: "", color: "coral", highlight: false, check: false },
  a4: { piece: "", color: "coral", highlight: false, check: false },
  b4: { piece: "", color: "white", highlight: false, check: false },
  c4: { piece: "", color: "coral", highlight: false, check: false },
  d4: { piece: "", color: "white", highlight: false, check: false },
  e4: { piece: "", color: "coral", highlight: false, check: false },
  f4: { piece: "", color: "white", highlight: false, check: false },
  g4: { piece: "", color: "coral", highlight: false, check: false },
  h4: { piece: "", color: "white", highlight: false, check: false },
  a3: { piece: "", color: "white", highlight: false, check: false },
  b3: { piece: "", color: "coral", highlight: false, check: false },
  c3: { piece: "", color: "white", highlight: false, check: false },
  d3: { piece: "", color: "coral", highlight: false, check: false },
  e3: { piece: "", color: "white", highlight: false, check: false },
  f3: { piece: "", color: "coral", highlight: false, check: false },
  g3: { piece: "", color: "white", highlight: false, check: false },
  h3: { piece: "", color: "coral", highlight: false, check: false },
  a2: { piece: "w_pawn", color: "coral", highlight: false, check: false },
  b2: { piece: "w_pawn", color: "white", highlight: false, check: false },
  c2: { piece: "w_pawn", color: "coral", highlight: false, check: false },
  d2: { piece: "w_pawn", color: "white", highlight: false, check: false },
  e2: { piece: "w_pawn", color: "coral", highlight: false, check: false },
  f2: { piece: "w_pawn", color: "white", highlight: false, check: false },
  g2: { piece: "w_pawn", color: "coral", highlight: false, check: false },
  h2: { piece: "w_pawn", color: "white", highlight: false, check: false },
  a1: { piece: "w_rook", color: "white", highlight: false, check: false },
  b1: { piece: "w_knight", color: "coral", highlight: false, check: false },
  c1: { piece: "w_bishop", color: "white", highlight: false, check: false },
  d1: { piece: "w_queen", color: "coral", highlight: false, check: false },
  e1: { piece: "w_king", color: "white", highlight: false, check: false },
  f1: { piece: "w_bishop", color: "coral", highlight: false, check: false },
  g1: { piece: "w_knight", color: "white", highlight: false, check: false },
  h1: { piece: "w_rook", color: "coral", highlight: false, check: false },
};

async function updateMatch(data) {
  try {
    const token = await getCsrfToken();

    const response = await axios.post(
      `${endpoints.updateMatch}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );

    if (response.data && response.data.updated) {
      console.log(response.data.updated, "IT WAS UPDATED");

      return response.data.boardData;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function isItMyTurn(roomId, userId) {
  // This function should take a square and a board.
  try {
    const data = {
      roomId: roomId,
      userId: userId,
    };

    const token = await getCsrfToken();

    const response = await axios.post(
      `${endpoints.checkTurn}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    if (response.data.winner) {
      return response.data;
    } else if (response.data && response.data.myTurn) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function getFEN(data) {
  try {
    const token = await getCsrfToken();

    const response = await axios.post(
      `${endpoints.getFen}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );

    if (response.data && response.data.fen) {
      return response.data.fen;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function getTurn(data) {
  try {
    const token = await getCsrfToken();

    const response = await axios.post(
      `${endpoints.getTurn}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );

    if (response.data && response.data.turn) {
      return response.data.turn;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function getPlayerColor(data) {
  try {
    const token = await getCsrfToken();

    const response = await axios.post(
      `${endpoints.getPlayerColor}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );

    if (response.data && response.data.playerColor) {
      if (response.data.playerColor === "black") {
        return true;
      } else if (response.data.playerColor === "white") {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export { initBoard, isItMyTurn, updateMatch, getFEN, getTurn, getPlayerColor };
