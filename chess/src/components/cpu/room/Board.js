import Square from "./Square";

import React, { useState, useEffect } from "react";
import Turn from "./Turn";

import {
  getValidMoves,
  getLeftAndRightSquares,
  isItAValidMove,
} from "../../../utils/Moves";
import {
  initBoard,
  isItMyTurn,
  getTurn,
  getPlayerColor,
} from "../../../utils/BoardUtilsCpu";
import { adjacentEnemyPawn } from "../../../utils/Logic";

function BoardCpu({ roomId, userId, otherPlayerId }) {
  const [turnCount, setTurnCount] = useState(1);
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
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isPlayerBlack, setIsPlayerBlack] = useState(false);
  const [check, setCheck] = useState(false);
  const [winner, setWinner] = useState("")

  useEffect(() => {
    // Again this is only meant to run once.
    const fetchTurn = async () => {
      try {
        const turnOnDB = await getTurn({ roomId });
        setTurnCount(turnOnDB); // Update state with fetched data
        const playerColor = await getPlayerColor({
          roomId: roomId,
          userId: userId,
        });
        setIsPlayerBlack(playerColor);
      } catch (error) {
        console.error("Failed to fetch turn:", error);
        // Handle error, maybe set turnCount to a safe value or show error message
      }
    };

    fetchTurn();
  }, []);

  function handleTurn(pieceColor) {
    console.log("This is turn handling", pieceColor);

    let turn = turnCount;

    setTurnOrder((prevState) => !prevState);
    if (pieceColor[0] === "b") {
      turn = turnCount + 1;
      setTurnCount(turn);
    }

    return turn;
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

      const enemyPawnAdjacent = adjacentEnemyPawn(
        board,
        movingFrom,
        leftRightSquares.squareToTheLeft,
        leftRightSquares.squareToTheRight
      );

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

  function handleHalfmoveClock(data) {
    const attacker = data.attacker;
    const captured = data.captured;
    const capturedOcurred = listenForCaptures({
      attacker: attacker,
      captured: captured,
    });

    console.log(attacker, captureOccurred, halfmoveClock);

    if (attacker.includes("pawn") || capturedOcurred) {
      setHalfmoveClock(0);
      return 0;
    } else {
      setHalfmoveClock(halfmoveClock + 1);
      console.log("bro?");
      return halfmoveClock + 1;
    }
  }

  function handleCastling(board, castlingRights) {
    let newCastlingRights = castlingRights;

    if (board["e1"]?.piece !== "w_king") {
      newCastlingRights = newCastlingRights.replace("K", "").replace("Q", "");
    } else if (board["h1"]?.piece !== "w_rook") {
      newCastlingRights = newCastlingRights.replace("K", "");
    } else if (board["a1"]?.piece !== "w_rook") {
      newCastlingRights = newCastlingRights.replace("Q", "");
    } else if (board["e8"]?.piece !== "b_king") {
      newCastlingRights = newCastlingRights.replace("k", "").replace("q", "");
    } else if (board["h8"]?.piece !== "b_rook") {
      newCastlingRights = newCastlingRights.replace("k", "");
    } else if (board["a8"]?.piece !== "b_rook") {
      newCastlingRights = newCastlingRights.replace("q", "");
    }

    if (newCastlingRights === "") {
      newCastlingRights = "-";
    }

    setCastlingRights(newCastlingRights);
    return newCastlingRights;
  }

  function updateHighlights(positions) {
    const updatedBoard = { ...boardData }; // Shallow copy
    positions.forEach(function (position) {
      if (updatedBoard[position]) {
        updatedBoard[position].highlight = true;
      }
    });
    setBoardData(updatedBoard);
  }

  function clearHighlights() {
    const updatedBoard = { ...boardData }; // Shallow copy
    Object.keys(updatedBoard).forEach(function (position) {
      if (updatedBoard[position].highlight) {
        updatedBoard[position].highlight = false;
      }
      if (updatedBoard[position].check) {
        updatedBoard[position].check = false;
      }
    });
    setBoardData(updatedBoard);
  }

  function listenForCaptures(data) {
    if (data.captured && data.attacker) {
      const colorOfPieceMoving = data.attacker[0]; // this is expected to be either b or w as well
      const colorOfPieceCaptured = data.captured[0]; // this is expected to be either b or w as well
      console.log(data.captured);
      console.log(colorOfPieceMoving, "This piece is moving");
      console.log(colorOfPieceCaptured, "This piece was captured.");

      if (colorOfPieceMoving !== colorOfPieceCaptured) {
        setCaptureOccurred(true);
        return true;
      }
    }

    setCaptureOccurred(false);
    console.log("No capture occurred");
    return false;
  }

  function displayCheck(boardData) {
    let checkKingPosition;

    let kingColor = isPlayerBlack ? "b_king" : "w_king";

    for (let position in boardData) {
      if (boardData[position].piece === kingColor) {
        checkKingPosition = position;
        break;
      }
    }
    if (checkKingPosition) {
      let boardWithKingOnCheck = { ...boardData }; // shallow copy

      boardWithKingOnCheck[checkKingPosition].check = true;

      console.log('KING SHOULD BE IN CHECK.', "This is check: ", check)

      setBoardData(boardWithKingOnCheck);
    }
    return checkKingPosition;
  }

  useEffect(() => {
    console.log(boardData);
    // TODO Why is this being used? It has something to do with the board state
  }, [boardData]);
  useEffect(() => {
    if (check) {
      displayCheck(boardData);
    }
    // TODO Why is this being used? It has something to do with the board state
  }, [check]);

  useEffect(() => {
    // Define the polling logic within the effect
    const pollForTurn = () => {
      const intervalId = setInterval(async () => {
        const result = await isItMyTurn(roomId, userId);
        console.log(result)
        if(result.winner){
          setWinner(result.winner)
          clearInterval(intervalId); // Stop polling
          setBoardData(result.boardData);


        }
        if (result && result.myTurn && result.boardData) {

            setIsMyTurn(true);
            setBoardData(result.boardData);
            clearInterval(intervalId); // Stop polling
            setTurnCount(result.turnCount);
            setHalfmoveClock(result.halfmoveClock);
            setCheck(result.check);


        } else {
          setIsMyTurn(false);
          console.log("Not my turn yet, polling...");
        }
      }, 1000);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        console.log("Polling timeout reached. Stopping polling.");
      }, 3000000); // Basically 5 minutes

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    };

    // Start polling if it's not yet the user's turn
    if (!isMyTurn) {
      return pollForTurn();
    }
  }, [isMyTurn, roomId, userId]);



  async function handleMove(data) {
    // Move is only needed if the square isnt empty.
    // Comment is prob outdated but this should still hold true to some degree

    const myTurn = await isItMyTurn(roomId, userId);

    setIsMyTurn(myTurn);

    if (myTurn.myTurn) {
      if (data.piece && myTurn.color !== data.piece[0] && firstClick === null) {
        console.log("Not your piece.");
      } else {
        if (firstClick === null) {
          setPieceToMove(data.piece);

          setNotation(data.notation);

          setFirstClick(data.notation);

          console.log(data.piece, data.notation);

          const validMoves = await getValidMoves({
            board: boardData,
            pieceMoving: data.piece,
            target: data.notation,
            turnCount: turnCount,
            halfmoveClock: halfmoveClock,
            castlingRights: castlingRights,
            enPassant: enPassant,
          });

          setValidMoves(validMoves);

          console.log(validMoves, "These are the valid moves.");

          updateHighlights(validMoves);
        } else {
          if (validMoves.includes(data.notation)) {
            console.log(firstClick);
            console.log(
              "I want to move ",
              pieceToMove,
              " on ",
              firstClick,
              " to ",
              data.notation
            );

            clearHighlights();


            const prev = boardData; // Grabbing the board before posting it

            const boardDataPrePosting = {
              ...prev,
              [firstClick]: { ...prev[firstClick], piece: "" },
              [data.notation]: { ...prev[data.notation], piece: pieceToMove },
            };

            let turn = turnCount;

            if (pieceToMove[0] === "b") {
              turn = turnCount + 1;
              setTurnCount(turn);
            }

            const validClock = handleHalfmoveClock({
              attacker: pieceToMove,
              captured: data.piece,
            });
            setHalfmoveClock(validClock);
            console.log(validClock, "prior to v");

            const newCastlingRights = handleCastling(
              boardDataPrePosting,
              castlingRights
            );

            const validMove = await isItAValidMove({
              board: boardDataPrePosting,
              pieceMoving:
                (pieceToMove.charAt(0) === "w" ? "b" : "w") +
                pieceToMove.slice(1),
              target: data.notation,
              turnCount: turn,
              halfmoveClock: validClock,
              castlingRights: newCastlingRights,
              enPassant: enPassant,
              roomId: roomId,
            });

            console.log(boardDataPrePosting);

            setBoardData(boardDataPrePosting);

            setFirstClick(null);
            console.log("Piece should have been moved.");
            setIsMyTurn(false);
          } else {
            console.log("Illegal move.");
            setFirstClick(null);
            setPieceToMove("");
            setNotation("");
            clearHighlights();
          }
        }
      }
    }
  }

  const boardEntries = Object.entries(boardData);
  const orderedEntries = isPlayerBlack ? boardEntries.reverse() : boardEntries;

  return (
    <div>
      <Turn myTurn={isMyTurn} winner={winner} isPlayerBlack={isPlayerBlack} />
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
          {orderedEntries.map(
            ([notation, { piece, color, highlight, check }]) => (
              <div
                key={notation}
                onClick={() => handleMove({ notation: notation, piece: piece })}
              >
                <Square
                  piece={piece}
                  color={color}
                  notation={notation}
                  highlight={highlight}
                  check={check}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardCpu;
