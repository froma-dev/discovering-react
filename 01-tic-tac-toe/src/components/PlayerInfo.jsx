import {Square} from "./Square.jsx";

export function PlayerInfo({avatar, wins, isSelected, name}) {
    return (
        <section className="player-info">
            <Square isSelected={isSelected}>
                <span>{avatar}</span>
            </Square>
            <h2 className="name">{name}</h2>
            <h2 className="wins">{wins}</h2>
        </section>
    )
}