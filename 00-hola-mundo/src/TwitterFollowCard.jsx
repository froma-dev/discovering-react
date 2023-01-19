import { useState } from "react";

export function TwitterFollowCard ({ userName = 'unknown', name, formatUserName, initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const buttonText = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonTextClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'
    const userNameAvatar = `https://unavatar.io/${userName}`;

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' alt="El avatar de Midu" src={userNameAvatar}/>
                <div className='tw-followCard-info'>
                    <strong className='tw-followCard-infoUserName'>{ name }</strong>
                    <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                </div>
            </header>
            <aside>
                <button className={buttonTextClassName} onClick={handleClick}>{buttonText}</button>
            </aside>
        </article>
    )
}