export const TURNS = {
    X: '👽',
    O: '👻'
};

export const AVATARS = [
    {avatar: '👻', name: 'Ghostlic'},
    {avatar: '👽', name: 'Himan'},
    {avatar: '🤡', name: 'u'},
    {avatar: '👾', name: 'mi'},
    {avatar: '🦝', name: 'Rackooff'},
    {avatar: '🐰', name: 'GRabbit'},
    {avatar: '🐼', name: 'Pxnda'},
    {avatar: '🐕', name: 'PaxBlax'},
    {avatar: '🐈', name: 'Kiri2'}
];

export const GAME_STATE = {
    NEW_GAME: null,
    TIE: false
}

export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export const LOCAL_STORAGE_ITEMS = {
    BOARD: 'board',
    TURN: 'turn',
    WINS: 'wins',
    PLAYERS: 'players'
};