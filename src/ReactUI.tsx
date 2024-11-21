import "@aws-amplify/ui-react/styles.css";
import { useSetAtom } from "jotai";
import { isMenuVisable} from "./store";
import { MainMenu } from "./react_components/MainMenu";
import { useEffect } from "react";

const ReactUI = () => {
    const setIsMenuVisible = useSetAtom(isMenuVisable);

    useEffect(() => {
        setIsMenuVisible(true);
    }, []);

    return (
        <MainMenu />
    );
}

export default ReactUI;