export const Square = ({ children, isSelected, index, isWinningCombo, onClickHandler, onHoverHandler}) => {
    const className = `square ${isSelected ? 'is-selected' : ''} ${isWinningCombo ? 'win' : ''}`

    const handleClick = () => {
        onClickHandler(index);
    };

    const handleMouseEnter = () => {
        onHoverHandler(true, index);
    };

    const handleMouseLeave = () => {
        onHoverHandler(false, index);
    };

    return (
        <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className}>
            {children}
        </div>
    )
}