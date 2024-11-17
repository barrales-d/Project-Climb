import { useAtom } from "jotai"
import { isMenuVisable } from "../store"
import { useMenuState } from "../hooks/useMenuState";
import { Leaderboard } from "./LeaderBoard";
import { Setting } from "./Setting";
import { GameOver } from "./GameOver";
import { Overlay } from "./Overlay";

export function MainMenu({ signOut }: { signOut: any }) {

    const { currentView, setCurrentView } = useMenuState();
    const [isMenuVisibleValue, setIsMenuVisible] = useAtom(isMenuVisable);
    function toggleMenu() {
        setIsMenuVisible(!isMenuVisibleValue);
    }
    if (!isMenuVisibleValue) {
        return (
            <button className="pause-btn" onClick={toggleMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                </svg>
            </button>
        );
    }

    const renderView = () => {
        switch (currentView) {
            case 'leaderboard':
                return <Leaderboard />
            case 'settings':
                return <Setting signOut={signOut} />
            case 'gameover':
                return <GameOver />
            case 'main':
            default:
                return (
                    <div className="menu-container">
                        <h1>Project Climb</h1>
                        <button className="menu-btn" onClick={toggleMenu}>Play</button>
                        <button className="menu-btn" onClick={() => setCurrentView('leaderboard')}>Leaderboard</button>
                        <button className="menu-btn" onClick={() => setCurrentView('settings')}>Settings</button>
                    </div>
                );
        }
    };

    return (
        <Overlay>
            {renderView()}
        </Overlay>
    );
}