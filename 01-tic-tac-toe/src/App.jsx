import './App.css'
import {useState, useEffect} from "react";
import confetti from "canvas-confetti";
import {Square} from "./components/Square.jsx";
import {TURNS, GAME_STATE} from './constants.js'
import {checkWinner, checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal.jsx'
import {saveGameToStorage, resetGameStorage, getStoredBoard, getStoredTurn} from './logic/storage/index.js'

const board = Array(9).fill(null);
const restoreGame = () => {
    return getStoredBoard() ?? Array(9).fill(null);
}

const restoreTurn = () => {
    return getStoredTurn() ?? TURNS.X;
}

function App() {
    const [board, setBoard] = useState(restoreGame);
    const [turn, setTurn] = useState(restoreTurn);
    const [winner, setWinner] = useState(GAME_STATE.NEW_GAME);
    const [winningCombo, setWinningCombo] = useState([]);
    const [displayWinner, setDisplayWinner] = useState(false);

    useEffect(() => {
        let displayWinnerId;

        if (winner !== GAME_STATE.NEW_GAME) {
            displayWinnerId = setTimeout(() => {
                setDisplayWinner(true);
            }, 500);
        }

        return () => {
            clearTimeout(displayWinnerId)
        }
    }, [winningCombo]);

    const updateBoard = (index) => {
        if (board[index] || winner) return;

        // Update board.
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        // Switch turns.
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
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
        setTurn(TURNS.X);
        setWinner(GAME_STATE.NEW_GAME);
        setWinningCombo([]);
        setDisplayWinner(false);
    }

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reset Game</button>
            <section className="game">
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                                isWinningCombo={winningCombo.indexOf(index) >= 0}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>
            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>

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
