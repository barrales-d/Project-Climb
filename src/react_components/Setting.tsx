import { useMenuState } from "../hooks/useMenuState";

export function Setting({ signOut }: { signOut: any }) {
    const { setCurrentView } = useMenuState();
    function logOff() {
        setCurrentView('main');
        signOut();
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