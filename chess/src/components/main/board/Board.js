import Square from "./Square";

import React, { useState, useEffect } from "react";
import Turn from "./Turn";

import { getValidMoves, getLeftAndRightSquares } from "../../../utils/Moves";
import { initBoard, updateMatch, isItMyTurn } from "../../../utils/BoardUtils";
import { adjacentEnemyPawn } from "../../../utils/Logic";

function Board({ roomId, userId, otherPlayerId }) {
  const [turnCount, setTurnCount] = useState(0);
  const [firstClick, setFirstClick] = useState(null);
  const [turnOrder, setTurnOrder] = useState(false);
  const [captureOccurred, setCaptureOccurred] = useState(false);
  const [halfmoveClock, setHalfmoveClock] = useState(0);
  const [castlingRights, setCastlingRights] = useState("KQkq");
  const [pieceToMove, setPieceToMove] = useState("");
  const [notation, setNotation] = useState("");
  const [enPassant, setEnPassant] = useState("-");
  const [validMoves, setValidMoves] = useState([]);
  const [boardData, setBoardData] = useState(initBoard);

  function handleTurn() {
    setTurnOrder((prevState) => !prevState);
    setTurnCount(turnCount + 1);
  }

  function handleEnPassant(board, movingFrom, movedTo) {
    // This function is supposed to only run if a pawn is moved.

    const startRank = movingFrom[1];
    const endRank = movedTo[1];
    // En Passant is only possible in these ranks 3 and 6.
    const conditions = {
      2: "3",
      7: "6",
    };

    // Check if the move matches one of the en passant conditions to determine the target square
    if (
      conditions[startRank] &&
      ((startRank === "2" && endRank === "4") ||
        (startRank === "7" && endRank === "5"))
    ) {
      console.log(
        "En Passant Possible at: ",
        movedTo[0] + conditions[startRank]
      );

      console.log("This is movedTo: ", movedTo);
      const leftRightSquares = getLeftAndRightSquares(movedTo);

      // console.log(leftRightSquares);

      const enemyPawnAdjacent = adjacentEnemyPawn(
        board,
        movingFrom,
        leftRightSquares.squareToTheLeft,
        leftRightSquares.squareToTheRight
      );

      // console.log(enemyPawnAdjacent);

      if (enemyPawnAdjacent) {
        const keys = Object.keys(enemyPawnAdjacent);
        // keys[0] and keys[1] should stand for enemyPawnAdjacent.squareToTheLeft and enemyPawnAdjacent.squareToTheRight
        console.log("Enemy pawns detected at: ", keys[0], keys[1]);
        setEnPassant(movedTo[0] + conditions[startRank]);
        return movedTo[0] + conditions[startRank];
      }
    }
    setEnPassant("-");
    return false;
  }

  function handleHalfmoveClock(reset = false) {
    if (reset) {
      setHalfmoveClock(0);
    } else {
      setHalfmoveClock(halfmoveClock + 1);
    }
  }

  useEffect(() => {
    // Async function to send the update
    const sendUpdate = async () => {
      await updateMatch({
        board: boardData,
        pieceMoving: pieceToMove,
        target: notation,
        turnCount: turnCount,
        halfmoveClock: halfmoveClock,
        castlingRights: castlingRights,
        enPassant: enPassant,
        roomId: roomId,
      });
    };

    if (notation) {
      sendUpdate();
    }
  }, [turnCount]);

  useEffect(() => {
    // Async function to send the update

    console.log(firstClick, notation, pieceToMove);
    setBoardData((prev) => ({
      ...prev,
      [firstClick]: { ...prev[firstClick], piece: "" },
      [notation]: { ...prev[notation], piece: pieceToMove },
    }));
  }, [notation]);

  function handleCastling(board) {
    if (board["e1"].piece !== "w_king") {
      setCastlingRights(castlingRights.replace("K", "").replace("Q", ""));
    } else if (board["h1"].piece !== "w_rook") {
      setCastlingRights(castlingRights.replace("K", ""));
    } else if (board["a1"].piece !== "w_rook") {
      setCastlingRights(castlingRights.replace("Q", ""));
    } else if (board["e8"].piece !== "b_king") {
      setCastlingRights(castlingRights.replace("k", "").replace("q", ""));
    } else if (board["h8"].piece !== "b_rook") {
      setCastlingRights(castlingRights.replace("k", ""));
    } else if (board["a8"].piece !== "b_rook") {
      setCastlingRights(castlingRights.replace("q", ""));
    }

    if (castlingRights === "") {
      setCastlingRights("-");
    }
  }

  function updateHighlights(positions) {
    const updatedBoard = { ...boardData }; // Create a shallow copy of the board
    positions.forEach(function (position) {
      if (updatedBoard[position]) {
        updatedBoard[position].highlight = true;
      }
    });
    setBoardData(updatedBoard);
  }

  function clearHighlights() {
    // console.log(boardData);
    const updatedBoard = { ...boardData }; // Create a shallow copy of the board
    Object.keys(updatedBoard).forEach(function (position) {
      if (updatedBoard[position].highlight) {
        updatedBoard[position].highlight = false;
      }
    });
    setBoardData(updatedBoard);
  }

  function listenForCaptures(data) {
    if (data.captured && data.attacker) {
      const colorOfPieceMoving = data.captured[0]; // this is expected to be either b or w as well
      const colorOfPieceCaptured = data.attacker[0]; // this is expected to be either b or w as well

      // console.log(colorOfPieceCaptured, colorOfPieceMoving);
      if (colorOfPieceMoving !== colorOfPieceCaptured) {
        setCaptureOccurred(true);
        return true;
      }
    }

    setCaptureOccurred(false);
    console.log("No capture occurred");
    return false;
  }

  async function handleMove(data) {
    // Move is only needed if the square isnt empty.

    // setNotation(data.notation)
    console.log(data.notation);

    const notation = data.notation;

    const piece = data.piece;

    if (piece || firstClick) {
      // console.log(firstClick, validatePieceSelection({ piece: piece, turn: turnOrder }))
      const myTurn = await isItMyTurn(roomId, userId);
      if (
        firstClick ||
        myTurn
      ) {
        if (firstClick === null) {
          // This is basically when you click something.
          console.log(
            notation,
            "This is notation, which is technically target as well."
          );
          setFirstClick(notation);
          console.log(piece, "was selected");
          setPieceToMove(piece);
          setNotation(notation);
          const validMoves = await getValidMoves({
            board: boardData,
            pieceMoving: piece,
            target: notation,
            turnCount: turnCount,
            halfmoveClock: halfmoveClock,
            castlingRights: castlingRights,
            enPassant: enPassant,
          });

          setValidMoves(validMoves);

          if (validMoves) {
            updateHighlights(validMoves);
          }
        } else {
          clearHighlights();

          // Move the piece to the new square
          setPieceToMove(boardData[firstClick].piece);

          if (validMoves.includes(notation)) {
            console.log(pieceToMove, "moved into", notation);

            console.log("Board pre, change: ", boardData);

            console.log("Board post, change: ", boardData);

            // Turn is over at this point and things have been moved

            const possiblePieceBeingCaptured = boardData[notation].piece;

            if (possiblePieceBeingCaptured) {
              console.log(possiblePieceBeingCaptured, "captured");
            }
            if (pieceToMove.includes("pawn")) {
              handleEnPassant(boardData, firstClick, notation);
            }

            handleCastling(boardData);

            handleTurn();

            if (
              pieceToMove.includes("pawn") ||
              listenForCaptures({
                captured: possiblePieceBeingCaptured,
                attacker: pieceToMove,
              })
            ) {
              console.log("Halfmove clock resets.");
              const reset = true;
              handleHalfmoveClock(reset);
            } else {
              handleHalfmoveClock();
            }

            setFirstClick(null); // Reset the first click

            const matchUpdated = await updateMatch({
              board: boardData,
              pieceMoving: pieceToMove,
              target: notation,
              turnCount: turnCount,
              halfmoveClock: halfmoveClock,
              castlingRights: castlingRights,
              enPassant: enPassant,
              roomId: roomId,
            });

            console.log(boardData, "before updating?");

            if (matchUpdated) {
              console.log("Match updated nicely.");
              console.log(matchUpdated);
              setBoardData(matchUpdated);
            }
          } else {
            setFirstClick(null);
            setNotation("");
            console.log("Illegal move.");
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
          {Object.entries(boardData).map(
            ([notation, { piece, color, highlight }]) => (
              <div
                key={notation}
                onClick={() => handleMove({ notation: notation, piece: piece })}
              >
                <Square
                  piece={piece}
                  color={color}
                  notation={notation}
                  highlight={highlight}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
