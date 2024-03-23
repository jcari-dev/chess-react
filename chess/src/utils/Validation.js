

function validatePieceSelection(data){

    // This essentially takes [b] from b_pawn, which would mean that it is the `black` pawn, etc.
    const pieceColor = data.piece[0]


    if(pieceColor === "b" && data.turn === true){
        return true
    } else if(pieceColor === "w" && data.turn === false){
        return true
    } 
    return false

}

export default validatePieceSelection;