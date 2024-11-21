import { useAtomValue } from "jotai";
import { useMenuState } from "../hooks/useMenuState"
import { playerScoreAtom } from "../store";

export function GameOver() {
    // TODO: get score from jotai storage and display it
    // TODO: update highscore accordingly
    const { setCurrentView, toggleMenu } = useMenuState();

    const score = useAtomValue(playerScoreAtom);

    // const [player, setPlayer] = useState<Schema["Players"]["type"]>();

    function handleRestart() {
        toggleMenu();
        console.log('restart');
        setCurrentView('main');
    }

    return (
        <div className='menu-container'>
            <h1>Game Over</h1>
            <h3>Score: {score.toFixed(2)}m</h3>
            <button className="menu-btn" onClick={handleRestart}>Restart</button>
            <button className='menu-btn' onClick={() => setCurrentView('main')}>Main Menu</button>
        </div>
    )

};