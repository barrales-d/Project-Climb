import { useMenuState } from "../hooks/useMenuState"

export function GameOver() {
    // TODO: get score from jotai storage and display it
    // TODO: update highscore accordingly
    const { setCurrentView, toggleMenu } = useMenuState();

    function handleRestart() {
        toggleMenu();
        setCurrentView('main');
    }

    return (
        <div className='menu-container'>
            <h1>Game Over</h1>
            <h3>Score: 100</h3>
            <h2>High Score: 100</h2>
            <button className="menu-btn" onClick={handleRestart}>Restart</button>
            <button className='menu-btn' onClick={() => setCurrentView('main')}>Main Menu</button>
        </div>
    )

};