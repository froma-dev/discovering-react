import {Square} from "./Square.jsx"
import {AVATARS} from "../constants.js";
import {locales} from "../en-EN.js";
import {useState} from "react";

const MAX_PLAYERS = 2;

export function AvatarSelection({onClickHandler}) {
    const [hoveredAvatar, setHoveredAvatar] = useState(null);
    const [selectedAvatars, setSelectedAvatars] = useState([]);

    const handleClick = (index) => {
        if (selectedAvatars[index] || selectedAvatars.length === MAX_PLAYERS) return;

        const selected = [...selectedAvatars];

        selected.push(AVATARS[index]);
        setSelectedAvatars(selected);
    };

    const handleStartGame = () => {
        onClickHandler(selectedAvatars);
    };

    const handleHover = (pointerEnter, index) => {
        if (pointerEnter) {
            setHoveredAvatar(AVATARS[index].name);
        } else {
            setHoveredAvatar(null);
        }
    };

    return (
        <section className="avatar-selection avatar-selection--show">
            <h2 className={hoveredAvatar ? 'avatar-name hover' : 'avatar-name'}>{hoveredAvatar??locales.select_your_avatar}</h2>
            <br/>
            <div className="avatar-grid">
                {
                    AVATARS.map((avatar, index) => {
                        return (
                            <>
                                <Square
                                    key={index}
                                    index={index}
                                    onClickHandler={handleClick}
                                    onHoverHandler={handleHover}
                                    isSelected={selectedAvatars.indexOf(AVATARS[index]) >= 0}
                                >
                                    <span className="avatar">{avatar.avatar}</span>
                                </Square>
                            </>
                        );
                    })
                }
            </div>

            <footer>
                <button onClick={handleStartGame}>{locales.start_game}</button>
            </footer>
        </section>
    )
}