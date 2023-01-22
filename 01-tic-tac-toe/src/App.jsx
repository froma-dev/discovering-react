import './App.css'
import {useState, useEffect} from "react";
import confetti from "canvas-confetti";
import {Square} from "./components/Square.jsx";
import {GAME_STATE} from './constants.js'
import {checkWinner, checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal.jsx'
import {saveGameToStorage, resetGameStorage, getStoredBoard, getStoredTurn} from './logic/storage/index.js'
import {AvatarSelection} from "./components/AvatarSelection.jsx";

const board = Array(9).fill(null);
const restoreGame = () => {
    return getStoredBoard() ?? Array(9).fill(null);
}

const restoreTurn = () => {
    return getStoredTurn();
}

function App() {
    const [avatars, setAvatars] = useState([]);
    const [board, setBoard] = useState(restoreGame);
    const [turn, setTurn] = useState(restoreTurn);
    const [winner, setWinner] = useState(GAME_STATE.NEW_GAME);
    const [winningCombo, setWinningCombo] = useState([]);
    const [displayWinner, setDisplayWinner] = useState(false);
    const [hoveredAvatar, setHoveredAvatar] = useState({});
    const [wins, setWins] = useState(Array(2).fill(0));

    useEffect(() => {
        let displayWinnerId;

        if (winner !== GAME_STATE.NEW_GAME) {
            displayWinnerId = setTimeout(() => {
                const newWins = [...wins];

                if (avatars[0].avatar === winner) {
                    newWins[0]++;
                } else if (avatars[1].avatar === winner) {
                    newWins[1]++;
                }

                setWins(newWins);
                setDisplayWinner(true);
            }, 500);
        }

        return () => {
            clearTimeout(displayWinnerId)
        }
    }, [winningCombo]);

    const updateAvatar = (selectedAvatars) => {
        console.log('updateAvatar');
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

        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        });

        const {newWinner, combo} = checkWinner(newBoard);

        if (newWinner) {
            confetti();
            setWinningCombo(combo);
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinningCombo([]);
            setWinner(GAME_STATE.TIE);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(avatars[0].avatar);
        setWinner(GAME_STATE.NEW_GAME);
        setWinningCombo([]);
        setDisplayWinner(false);
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
            <button onClick={resetGame}>Reset Game</button>

            {!turn &&
                <section className="avatar-selection">
                    <AvatarSelection
                        onClickHandler={updateAvatar}
                    ></AvatarSelection>
                </section>
            }

            {turn &&
                <section>
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
                        <section className="player-info">
                            <Square isSelected={turn === avatars[0].avatar}>
                                <span>
                                    {avatars[0].avatar}
                                </span>
                            </Square>
                            <h2 className="wins">{wins[0]}</h2>
                        </section>

                        <section className="player-info">
                            <Square isSelected={turn === avatars[1].avatar}>
                                <span>
                                    {avatars[1].avatar}
                                </span>
                            </Square>
                            <h2 className="wins">{wins[1]}</h2>
                        </section>
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
