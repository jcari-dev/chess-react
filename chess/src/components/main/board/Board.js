import Square from "./Square";

import React, { useState } from "react";
import Turn from "./Turn";

import {
  validatePieceSelection,
  ValidateMove,
} from "../../../utils/Validation";

function Board() {
  const [turnCount, setTurnCount] = useState(0);
  const [firstClick, setFirstClick] = useState(null);
  const [turnOrder, setTurnOrder] = useState(false);
  const [captureOccurred, setCaptureOccurred] = useState(false);
  const [halfmoveClock, setHalfmoveClock] = useState(0);
  const [boardData, setBoardData] = useState({
    a8: { piece: "b_rook", color: "coral" },
    b8: { piece: "b_knight", color: "white" },
    c8: { piece: "b_bishop", color: "coral" },
    d8: { piece: "b_queen", color: "white" },
    e8: { piece: "b_king", color: "coral" },
    f8: { piece: "b_bishop", color: "white" },
    g8: { piece: "b_knight", color: "coral" },
    h8: { piece: "b_rook", color: "white" },
    a7: { piece: "b_pawn", color: "white" },
    b7: { piece: "b_pawn", color: "coral" },
    c7: { piece: "b_pawn", color: "white" },
    d7: { piece: "b_pawn", color: "coral" },
    e7: { piece: "b_pawn", color: "white" },
    f7: { piece: "b_pawn", color: "coral" },
    g7: { piece: "b_pawn", color: "white" },
    h7: { piece: "b_pawn", color: "coral" },
    a6: { piece: "", color: "coral" },
    b6: { piece: "", color: "white" },
    c6: { piece: "", color: "coral" },
    d6: { piece: "", color: "white" },
    e6: { piece: "", color: "coral" },
    f6: { piece: "", color: "white" },
    g6: { piece: "", color: "coral" },
    h6: { piece: "", color: "white" },
    a5: { piece: "", color: "white" },
    b5: { piece: "", color: "coral" },
    c5: { piece: "", color: "white" },
    d5: { piece: "", color: "coral" },
    e5: { piece: "", color: "white" },
    f5: { piece: "", color: "coral" },
    g5: { piece: "", color: "white" },
    h5: { piece: "", color: "coral" },
    a4: { piece: "", color: "coral" },
    b4: { piece: "", color: "white" },
    c4: { piece: "", color: "coral" },
    d4: { piece: "", color: "white" },
    e4: { piece: "", color: "coral" },
    f4: { piece: "", color: "white" },
    g4: { piece: "", color: "coral" },
    h4: { piece: "", color: "white" },
    a3: { piece: "", color: "white" },
    b3: { piece: "", color: "coral" },
    c3: { piece: "", color: "white" },
    d3: { piece: "", color: "coral" },
    e3: { piece: "", color: "white" },
    f3: { piece: "", color: "coral" },
    g3: { piece: "", color: "white" },
    h3: { piece: "", color: "coral" },
    a2: { piece: "w_pawn", color: "coral" },
    b2: { piece: "w_pawn", color: "white" },
    c2: { piece: "w_pawn", color: "coral" },
    d2: { piece: "w_pawn", color: "white" },
    e2: { piece: "w_pawn", color: "coral" },
    f2: { piece: "w_pawn", color: "white" },
    g2: { piece: "w_pawn", color: "coral" },
    h2: { piece: "w_pawn", color: "white" },
    a1: { piece: "w_rook", color: "white" },
    b1: { piece: "w_knight", color: "coral" },
    c1: { piece: "w_bishop", color: "white" },
    d1: { piece: "w_queen", color: "coral" },
    e1: { piece: "w_king", color: "white" },
    f1: { piece: "w_bishop", color: "coral" },
    g1: { piece: "w_knight", color: "white" },
    h1: { piece: "w_rook", color: "coral" },
  });

  function handleTurn() {
    setTurnOrder((prevState) => !prevState);
    setTurnCount(turnCount + 1);
  }

  function handleHalfmoveClock(reset = false) {
    if (reset) {
      setHalfmoveClock(0);
    } else {
      setHalfmoveClock(halfmoveClock + 1);
    }
  }

  function listenForCaptures(data) {

    if(data.captured && data.attacker){
      const colorOfPieceMoving = data.captured[0]; // this is expected to be either b or w as well
      const colorOfPieceCaptured = data.attacker[0]; // this is expected to be either b or w as well
  
      console.log(colorOfPieceCaptured, colorOfPieceMoving)
      if (colorOfPieceMoving !== colorOfPieceCaptured) {
        setCaptureOccurred(true);
        return true;
      }
    }

    setCaptureOccurred(false);
    console.log('No capture occurred')
    return false;
  }
  async function handleMove(data) {
    // Move is only needed if the square isnt empty.

    const notation = data.notation;
    const piece = data.piece;

    if (piece || firstClick) {
      if (
        firstClick ||
        validatePieceSelection({ piece: piece, turn: turnOrder })
      ) {
        if (firstClick === null) {
          setFirstClick(notation);
          console.log(piece, "was selected");
        } else {
          // Move the piece to the new square
          const pieceToMove = boardData[firstClick].piece;

          const isMoveValid = await ValidateMove({
            board: boardData,
            pieceMoving: pieceToMove,
            target: notation,
            turnCount: turnCount,
            halfmoveClock: halfmoveClock
          });

          if (isMoveValid) {
            console.log(pieceToMove, "moved into", notation);

            setBoardData((prev) => ({
              ...prev,
              [firstClick]: { ...prev[firstClick], piece: "" },
              [notation]: { ...prev[notation], piece: pieceToMove },
            }));

            handleTurn();

            const possiblePieceBeingCaptured = boardData[notation].piece;

            if (possiblePieceBeingCaptured) {
              console.log(possiblePieceBeingCaptured, "captured");
            }

            if (
              pieceToMove.includes("pawn") ||
              listenForCaptures({
                captured: possiblePieceBeingCaptured,
                attacker: pieceToMove,
              })
            ) {
              console.log("Halfmove clock resets.")
              const reset = true;
              handleHalfmoveClock(reset);
            } else {
              handleHalfmoveClock();
            }

            setFirstClick(null); // Reset the first click

            console.log(boardData);
          }
        }
      } else {
        console.log("Not your turn.");
      }
    }
  }

  return (
    <div>
      <Turn status={turnOrder} turnNo={turnCount} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
          }}
        >
          {Object.entries(boardData).map(([notation, { piece, color }]) => (
            <div
              key={notation}
              onClick={() => handleMove({ notation: notation, piece: piece })}
            >
              <Square piece={piece} color={color} notation={notation} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
