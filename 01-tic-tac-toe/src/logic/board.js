import { WINNER_COMBOS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;

        console.log(combo, a);
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }

    // No winner.
    return null;
};

export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null);
}