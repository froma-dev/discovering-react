import './App.css'
import {useState, useEffect} from "react";
import confetti from "canvas-confetti";
import {Square} from "./components/Square.jsx";
import {GAME_STATE} from './constants.js'
import {checkWinner, checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal.jsx'
import {saveGameToStorage, getStoredBoard, getStoredTurn, getStoredWins, getStoredPlayers} from './logic/storage/index.js'
import {AvatarSelection} from "./components/AvatarSelection.jsx";
import {PlayerInfo} from "./components/PlayerInfo.jsx";
import {locales} from "./en-EN.js";

const restoreGame = () => {
    return getStoredBoard() ?? Array(9).fill(null);
}

const restoreTurn = () => {
    return getStoredTurn() || null;
}

const restoreWins = () => {
    return getStoredWins() ?? Array(2).fill(0);
}

const restorePlayers = () => {
    return getStoredPlayers() ?? [];
}

function App() {
    const [avatars, setAvatars] = useState(restorePlayers);
    const [board, setBoard] = useState(restoreGame);
    const [turn, setTurn] = useState(restoreTurn);
    const [winner, setWinner] = useState(GAME_STATE.NEW_GAME);
    const [winningCombo, setWinningCombo] = useState([]);
    const [displayWinner, setDisplayWinner] = useState(false);
    const [hoveredAvatar, setHoveredAvatar] = useState({});
    const [wins, setWins] = useState(restoreWins);

    useEffect(() => {
        let displayWinnerId;

        if (winner !== GAME_STATE.NEW_GAME) {
            displayWinnerId = setTimeout(() => {
                const newBoard = Array(9).fill(null);
                const newTurn = avatars[0].avatar;

                saveGameToStorage({
                    board: newBoard,
                    turn: newTurn,
                    wins: [...wins],
                    avatars: [...avatars]
                });
                setDisplayWinner(true);
            }, 500);
        }

        return () => {
            clearTimeout(displayWinnerId)
        }
    }, [winningCombo]);

    const updateAvatar = (selectedAvatars) => {
        setAvatars(selectedAvatars);
        setTurn(selectedAvatars[0].avatar)
    };

    const updateBoard = (index) => {
        if (board[index] || winner) return;

        // Update board.
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        // Switch turns.
        const newTurn = turn === avatars[0].avatar ? avatars[1].avatar : avatars[0].avatar;
        setTurn(newTurn);

        const {newWinner, combo} = checkWinner(newBoard);
        const newWins = [...wins];

        if (newWinner) {
            confetti();

            if (avatars[0].avatar === newWinner) {
                newWins[0]++;
            } else if (avatars[1].avatar === newWinner) {
                newWins[1]++;
            }

            setWins(newWins);
            setWinningCombo(combo);
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinningCombo([]);
            setWinner(GAME_STATE.TIE);
        }

        saveGameToStorage({
            board: newBoard,
            turn: newTurn,
            wins: newWins,
            avatars: [...avatars]
        });
    };

    const resetGame = () => {
        const newBoard = Array(9).fill(null);
        const newTurn = avatars[0].avatar;

        setBoard(newBoard);
        setTurn(newTurn);
        setWinner(GAME_STATE.NEW_GAME);
        setWinningCombo([]);
        setDisplayWinner(false);

        saveGameToStorage({
            board: newBoard,
            turn: newTurn,
            wins: [...wins],
            avatars: [...avatars]
        });
    }

    const clearGame = () => {
        const newBoard = Array(9).fill(null);
        const newTurn = null;
        const newWins = Array(2).fill(0);
        const newAvatars = [];

        setBoard(newBoard);
        setTurn(newTurn);
        setWins(newWins);
        setWinner(GAME_STATE.NEW_GAME);
        setWinningCombo([]);
        setDisplayWinner(false);

        saveGameToStorage({
            board: newBoard,
            turn: newTurn,
            wins: newWins,
            avatars: newAvatars
        });
    }

    const handleHover = (pointerEnter, index) => {
        if (pointerEnter) {
            const avatar = {};

            avatar[index] = turn;
            setHoveredAvatar(avatar);
        } else {
            setHoveredAvatar({});
        }
    };

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>

            {!turn &&
                <section className="avatar-selection">
                    <AvatarSelection
                        onClickHandler={updateAvatar}
                    ></AvatarSelection>
                </section>
            }

            {turn &&
                <section>
                    <button onClick={resetGame}>{locales.reset_game}</button>
                    <button onClick={clearGame}>{locales.clear_game}</button>
                    <section className="game">
                        {
                            board.map((square, index) => {
                                return (
                                    <Square
                                        key={index}
                                        index={index}
                                        onClickHandler={updateBoard}
                                        isWinningCombo={winningCombo.indexOf(index) >= 0}
                                        onHoverHandler={handleHover}
                                    >
                                        <span
                                            className={hoveredAvatar[index] && !square ? 'avatar avatar--hover' : 'avatar'}
                                        >
                                            {!square && hoveredAvatar[index] || square}
                                        </span>
                                    </Square>
                                )
                            })
                        }
                    </section>
                    <section className='turn'>
                        <PlayerInfo
                            isSelected={turn === avatars[0].avatar}
                            wins={wins[0]}
                            avatar={avatars[0].avatar}
                        ></PlayerInfo>

                        <PlayerInfo
                            isSelected={turn === avatars[1].avatar}
                            wins={wins[1]}
                            avatar={avatars[1].avatar}
                        ></PlayerInfo>
                    </section>
                </section>
            }

            {displayWinner &&
                <WinnerModal
                    resetGame={resetGame}
                    winner={winner}
                />
            }
        </main>
    )
}

export default App
