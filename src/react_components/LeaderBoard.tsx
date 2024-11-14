import { useMenuState } from "../hooks/useMenuState";

export function Leaderboard() {
    const { setCurrentView } = useMenuState();
    return (
        <div className="menu-container">
            <h2>Leaderboard</h2>
            <button className="menu-btn" onClick={() => setCurrentView('main')}>Back</button>
        </div>
    );
}