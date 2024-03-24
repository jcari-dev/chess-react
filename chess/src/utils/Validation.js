import axios from "axios";
import { getCsrfToken } from "./Auth";

function validatePieceSelection(data) {
  const pieceColor = data.piece[0];

  if (
    (pieceColor === "b" && data.turn === true) ||
    (pieceColor === "w" && data.turn === false)
  ) {
    return true;
  }
  return false;
}

async function ValidateMove(data) {
  try {
    const token = await getCsrfToken();
    const response = await axios.post(
        "http://127.0.0.1:8000/api/validate-move/",
      
        data,
      
        {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );
    if (response.data && response.data.valid) {
        console.log(response.data.valid)
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export { validatePieceSelection, ValidateMove };
