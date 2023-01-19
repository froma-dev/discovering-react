export function saveGameToStorage ({board, turn}) {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn);
}

export function resetGameStorage () {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
}

export function getStoredBoard () {
    const boardFromStorage = window.localStorage.getItem('board');

    if (boardFromStorage)
        return JSON.parse(boardFromStorage);

    return null;
}

export function getStoredTurn () {
    return window.localStorage.getItem('turn');
}