import {Square} from "./Square.jsx"
import {AVATARS} from "../constants.js";
import {locales} from "../en-EN.js";
import {useState} from "react";

const MAX_PLAYERS = 2;

export function AvatarSelection({onClickHandler}) {
    const [hoveredAvatar, setHoveredAvatar] = useState(null);
    const [selectedAvatars, setSelectedAvatars] = useState([]);

    const handleClick = (index) => {
        const selected = [...selectedAvatars];
        const selectedIndex = selected.indexOf(AVATARS[index]);

        if (selected.length === 2 && !selectedAvatars[selectedIndex]) {
            return
        }

        if (selectedIndex >= 0) {
            selected.splice(selectedIndex, 1);
        } else {
            selected.push(AVATARS[index]);
        }

        setSelectedAvatars(selected);
    };

    const handleStartGame = () => {
        if (selectedAvatars.length === MAX_PLAYERS) {
            onClickHandler(selectedAvatars);
        }
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
            <h3>{locales.select_your_avatar}</h3>
            <h2 className={hoveredAvatar ? 'avatar-name hover' : 'avatar-name'}>{hoveredAvatar}</h2>
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

            <section className='turn'>
                {
                    selectedAvatars.map((avatar, index) => {
                      return <Square> {avatar.avatar} </Square>
                    })
                }
            </section>

            <footer>
                <button
                    className={selectedAvatars.length === MAX_PLAYERS ? '--enabled' : ''}
                    onClick={handleStartGame}
                >{locales.start_game} </button>
            </footer>
        </section>
    )
}