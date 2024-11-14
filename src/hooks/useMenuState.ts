import { useAtom } from "jotai";
import { currentViewAtom, isMenuVisable } from "../store";

export type MenuView = "main" | "leaderboard" | "settings";
export function useMenuState() {
    const [isMenuVisibleValue, setIsMenuVisible] = useAtom(isMenuVisable);
    const [currentView, setCurrentView] = useAtom(currentViewAtom);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisibleValue);
        if (isMenuVisibleValue) {
            setCurrentView('main');
        }
    }

    return {
        isMenuVisibleValue,
        currentView,
        setCurrentView,
        toggleMenu
    };
}