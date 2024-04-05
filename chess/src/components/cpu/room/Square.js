import React from 'react';
import { ReactComponent as BKing } from "../../../data/pieces/b_king.svg";
import { ReactComponent as BQueen } from "../../../data/pieces/b_queen.svg";
import { ReactComponent as BBishop } from "../../../data/pieces/b_bishop.svg";
import { ReactComponent as BKnight } from "../../../data/pieces/b_knight.svg";
import { ReactComponent as BRook } from "../../../data/pieces/b_rook.svg";
import { ReactComponent as BPawn } from "../../../data/pieces/b_pawn.svg";
import { ReactComponent as WKing } from "../../../data/pieces/w_king.svg";
import { ReactComponent as WQueen } from "../../../data/pieces/w_queen.svg";
import { ReactComponent as WBishop } from "../../../data/pieces/w_bishop.svg";
import { ReactComponent as WKnight } from "../../../data/pieces/w_knight.svg";
import { ReactComponent as WRook } from "../../../data/pieces/w_rook.svg";
import { ReactComponent as WPawn } from "../../../data/pieces/w_pawn.svg";

const pieceToSVG = {
  b_king: BKing,
  b_queen: BQueen,
  b_bishop: BBishop,
  b_knight: BKnight,
  b_rook: BRook,
  b_pawn: BPawn,
  w_king: WKing,
  w_queen: WQueen,
  w_bishop: WBishop,
  w_knight: WKnight,
  w_rook: WRook,
  w_pawn: WPawn,
};

function Square({ piece, color, notation, highlight, check, score }) {
  const PieceSVG = piece ? pieceToSVG[piece] : null;

  const border = highlight ? "2px solid teal" : "";

  const svgStyle = {
    filter: check ? "drop-shadow(0 0 8px red) drop-shadow(0 0 10px red) drop-shadow(0 0 12px red)" : "none",
  };

  return (
    <div
      title={notation.toUpperCase()}
      style={{
        width: "64px",
        height: "64px",
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        position: "relative", 
        border: border,
      }}
      onClick={() => {}}
    >
      {score && (
        <div style={{
          position: 'absolute',
          left: '5px',
          top: '5px',
          color: 'green',
          fontWeight: 'bold',
          fontSize: '12px',
          // textShadow: '1px 1px 2px black', 
        }}>
          {score}
        </div>
      )}
      {PieceSVG && <PieceSVG style={svgStyle} />}
    </div>
  );
}

export default Square;
