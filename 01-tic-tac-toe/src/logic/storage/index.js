import {LOCAL_STORAGE_ITEMS} from "../../constants.js";

export function saveGameToStorage ({board, turn, wins, avatars}) {
    window.localStorage.setItem(LOCAL_STORAGE_ITEMS.BOARD, JSON.stringify(board));
    window.localStorage.setItem(LOCAL_STORAGE_ITEMS.TURN, turn);
    window.localStorage.setItem(LOCAL_STORAGE_ITEMS.WINS, JSON.stringify(wins));
    window.localStorage.setItem(LOCAL_STORAGE_ITEMS.PLAYERS, JSON.stringify(avatars));
}

export function resetGameStorage () {
    window.localStorage.removeItem(LOCAL_STORAGE_ITEMS.BOARD);
    window.localStorage.removeItem(LOCAL_STORAGE_ITEMS.TURN);
}

export function clearGameStorage () {
    resetGameStorage();
    window.localStorage.removeItem(LOCAL_STORAGE_ITEMS.WINS);
    window.localStorage.removeItem(LOCAL_STORAGE_ITEMS.PLAYERS);
}

export function getStoredBoard () {
    const boardFromStorage = window.localStorage.getItem(LOCAL_STORAGE_ITEMS.BOARD);

    if (boardFromStorage)
        return JSON.parse(boardFromStorage);

    return null;
}

export function getStoredTurn () {
    return window.localStorage.getItem(LOCAL_STORAGE_ITEMS.TURN);
}

export function getStoredWins () {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ITEMS.WINS));
}

export function getStoredPlayers () {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ITEMS.PLAYERS));
}