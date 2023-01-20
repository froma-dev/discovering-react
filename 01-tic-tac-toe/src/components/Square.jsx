export const Square = ({ children, isSelected, updateBoard, index, isWinningCombo}) => {
    const className = `square ${isSelected ? 'is-selected' : ''} ${isWinningCombo ? 'win' : ''}`

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}