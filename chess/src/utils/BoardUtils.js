import { getCsrfToken } from "./Auth";
import axios from "axios";

import endpoints from "./Endpoints";

let initBoard = {
  a8: {
    piece: "b_rook",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  b8: {
    piece: "b_knight",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  c8: {
    piece: "b_bishop",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  d8: {
    piece: "b_queen",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  e8: {
    piece: "b_king",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  f8: {
    piece: "b_bishop",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  g8: {
    piece: "b_knight",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  h8: {
    piece: "b_rook",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  a7: {
    piece: "b_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  b7: {
    piece: "b_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  c7: {
    piece: "b_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  d7: {
    piece: "b_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  e7: {
    piece: "b_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  f7: {
    piece: "b_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  g7: {
    piece: "b_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  h7: {
    piece: "b_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  a6: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  b6: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  c6: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  d6: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  e6: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  f6: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  g6: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  h6: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  a5: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  b5: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  c5: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  d5: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  e5: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  f5: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  g5: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  h5: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  a4: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  b4: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  c4: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  d4: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  e4: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  f4: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  g4: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  h4: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  a3: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  b3: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  c3: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  d3: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  e3: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  f3: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  g3: {
    piece: "",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  h3: {
    piece: "",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  a2: {
    piece: "w_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  b2: {
    piece: "w_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  c2: {
    piece: "w_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  d2: {
    piece: "w_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  e2: {
    piece: "w_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  f2: {
    piece: "w_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  g2: {
    piece: "w_pawn",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  h2: {
    piece: "w_pawn",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  a1: {
    piece: "w_rook",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  b1: {
    piece: "w_knight",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  c1: {
    piece: "w_bishop",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  d1: {
    piece: "w_queen",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  e1: {
    piece: "w_king",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  f1: {
    piece: "w_bishop",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
  g1: {
    piece: "w_knight",
    color: "white",
    highlight: false,
    check: false,
    score: null,
  },
  h1: {
    piece: "w_rook",
    color: "coral",
    highlight: false,
    check: false,
    score: null,
  },
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
