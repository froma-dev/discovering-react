import {Square} from "./Square.jsx";

export function PlayerInfo({avatar, wins, isSelected}) {
    return (
        <section className="player-info">
            <Square isSelected={isSelected}>
                <span>{avatar}</span>
            </Square>
            <h2 className="wins">{wins}</h2>
        </section>
    )
}