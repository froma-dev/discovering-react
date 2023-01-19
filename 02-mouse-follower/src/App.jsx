import {useState, useEffect} from 'react'
import './App.css'

function App() {
    return (
        <main>
            <h3>Project #3</h3>
            <FollowMouse/>
        </main>
    )
}

const FollowMouse = () => {
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [buttonPosition, setButtonPosition] = useState({});

    useEffect(() => {
        const handleMove = (event) => {
            const {clientX, clientY} = event;

            setPosition({x: clientX, y: clientY});
        }

        const resetPointer = () => {
            setPosition({x: 0, y: 0});
            setEnabled(false);
        }

        const cacheButtonPositions = (event) => {
            const toggleButton = document.querySelector('.toggleButton');

            console.log(toggleButton.getBoundingClientRect());
        }

        if (enabled) {
            window.addEventListener('pointermove', handleMove);
        } else {

        }

        return () => {
            window.removeEventListener('pointermove', handleMove);
            resetPointer();
        }
    }, [enabled]);

    return (<>
        <div className="pointer" style={{
            transform: `translate(${position.x}px, ${position.y}px)`
        }}
        >
        </div>
        <button
            className="toggleButton" onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'}
        </button>
    </>);
}

export default App
