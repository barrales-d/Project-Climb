import { useMenuState } from "../hooks/useMenuState";

export function Setting() {
    const { setCurrentView } = useMenuState();
    function logOff() {
        setCurrentView('main');
    }
    return (
        <div className="menu-container">
            <h2>Settings</h2>
            <button
                className="menu-btn"
                onClick={logOff}
            >
                Sign out
            </button>
            <button
                className="menu-btn"
                onClick={() => setCurrentView('main')}
            >
                Back
            </button>
        </div>
    );
}