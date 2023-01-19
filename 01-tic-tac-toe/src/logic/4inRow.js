const getWinningModels = ({ rows, columns }) => {

}

export const checkWinner = (boardToCheck, boardConfig) => {
    for (const combo of getWinningModels(boardConfig)) {
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