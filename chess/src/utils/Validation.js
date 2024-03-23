import axios from 'axios';

function validatePieceSelection(data) {
    const pieceColor = data.piece[0];

    if ((pieceColor === "b" && data.turn === true) || (pieceColor === "w" && data.turn === false)) {
        return true;
    }
    return false;
}

async function ValidateMove(data) {
    try {
        const response = await axios.post(url, data);
        if(response.data && response.data.valid){
            return true;
        } else {
            return false
        }

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}


export { validatePieceSelection, ValidateMove };
