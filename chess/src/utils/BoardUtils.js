import { getCsrfToken } from "./Auth";
import axios from "axios";

let initBoard = {
  a8: { piece: "b_rook", color: "coral", highlight: false },
  b8: { piece: "b_knight", color: "white", highlight: false },
  c8: { piece: "b_bishop", color: "coral", highlight: false },
  d8: { piece: "b_queen", color: "white", highlight: false },
  e8: { piece: "b_king", color: "coral", highlight: false },
  f8: { piece: "b_bishop", color: "white", highlight: false },
  g8: { piece: "b_knight", color: "coral", highlight: false },
  h8: { piece: "b_rook", color: "white", highlight: false },
  a7: { piece: "b_pawn", color: "white", highlight: false },
  b7: { piece: "b_pawn", color: "coral", highlight: false },
  c7: { piece: "b_pawn", color: "white", highlight: false },
  d7: { piece: "b_pawn", color: "coral", highlight: false },
  e7: { piece: "b_pawn", color: "white", highlight: false },
  f7: { piece: "b_pawn", color: "coral", highlight: false },
  g7: { piece: "b_pawn", color: "white", highlight: false },
  h7: { piece: "b_pawn", color: "coral", highlight: false },
  a6: { piece: "", color: "coral", highlight: false },
  b6: { piece: "", color: "white", highlight: false },
  c6: { piece: "", color: "coral", highlight: false },
  d6: { piece: "", color: "white", highlight: false },
  e6: { piece: "", color: "coral", highlight: false },
  f6: { piece: "", color: "white", highlight: false },
  g6: { piece: "", color: "coral", highlight: false },
  h6: { piece: "", color: "white", highlight: false },
  a5: { piece: "", color: "white", highlight: false },
  b5: { piece: "", color: "coral", highlight: false },
  c5: { piece: "", color: "white", highlight: false },
  d5: { piece: "", color: "coral", highlight: false },
  e5: { piece: "", color: "white", highlight: false },
  f5: { piece: "", color: "coral", highlight: false },
  g5: { piece: "", color: "white", highlight: false },
  h5: { piece: "", color: "coral", highlight: false },
  a4: { piece: "", color: "coral", highlight: false },
  b4: { piece: "", color: "white", highlight: false },
  c4: { piece: "", color: "coral", highlight: false },
  d4: { piece: "", color: "white", highlight: false },
  e4: { piece: "", color: "coral", highlight: false },
  f4: { piece: "", color: "white", highlight: false },
  g4: { piece: "", color: "coral", highlight: false },
  h4: { piece: "", color: "white", highlight: false },
  a3: { piece: "", color: "white", highlight: false },
  b3: { piece: "", color: "coral", highlight: false },
  c3: { piece: "", color: "white", highlight: false },
  d3: { piece: "", color: "coral", highlight: false },
  e3: { piece: "", color: "white", highlight: false },
  f3: { piece: "", color: "coral", highlight: false },
  g3: { piece: "", color: "white", highlight: false },
  h3: { piece: "", color: "coral", highlight: false },
  a2: { piece: "w_pawn", color: "coral", highlight: false },
  b2: { piece: "w_pawn", color: "white", highlight: false },
  c2: { piece: "w_pawn", color: "coral", highlight: false },
  d2: { piece: "w_pawn", color: "white", highlight: false },
  e2: { piece: "w_pawn", color: "coral", highlight: false },
  f2: { piece: "w_pawn", color: "white", highlight: false },
  g2: { piece: "w_pawn", color: "coral", highlight: false },
  h2: { piece: "w_pawn", color: "white", highlight: false },
  a1: { piece: "w_rook", color: "white", highlight: false },
  b1: { piece: "w_knight", color: "coral", highlight: false },
  c1: { piece: "w_bishop", color: "white", highlight: false },
  d1: { piece: "w_queen", color: "coral", highlight: false },
  e1: { piece: "w_king", color: "white", highlight: false },
  f1: { piece: "w_bishop", color: "coral", highlight: false },
  g1: { piece: "w_knight", color: "white", highlight: false },
  h1: { piece: "w_rook", color: "coral", highlight: false },
};

async function updateMatch(data) {
  try {
    const token = await getCsrfToken();

    const response = await axios.post(
      "http://127.0.0.1:8000/api/update-match/",

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
      "http://127.0.0.1:8000/api/check-turn/",

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

    if (response.data && response.data.myTurn) {

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
      "http://127.0.0.1:8000/api/get-fen/",

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
      "http://127.0.0.1:8000/api/get-turn/",

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

export { initBoard, isItMyTurn, updateMatch, getFEN, getTurn };
