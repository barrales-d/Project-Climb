import { Authenticator, Input, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAtom, useSetAtom } from "jotai";
import { isMenuVisable, playerName } from "./store";
import { useEffect } from "react";
import { MainMenu } from "./react_components/MainMenu";
import { Overlay } from "./react_components/Overlay";

const ReactUI = () => {
    const components = {
        SignUp: {
            FormFields() {
                return (
                    <>
                        <Authenticator.SignUp.FormFields />
                        <div>
                            <Label htmlFor="PlayerName">Player Name</Label>
                            <Input
                                id="PlayerName"
                                name="custom:PlayerName"
                                placeholder="Player Name"
                                type="text"
                                required />
                        </div>
                    </>
                );
            }
        }
    }
    const [name, setName] = useAtom(playerName);
    const setIsMenuVisible = useSetAtom(isMenuVisable);
    useEffect(() => {
        (async () => {
            const attributes = await fetchUserAttributes();
            if (attributes["custom:PlayerName"]) {
                setName(attributes["custom:PlayerName"]);
                setIsMenuVisible(true);
            }
        })();
    });
    return (
        <Authenticator components={components}>
            {({ signOut }) => (
                name != '' ? (
                    <MainMenu signOut={signOut} />
                ) : (
                    <Overlay>
                        <div className="menu-container">
                            <h1>Signing in...</h1>
                        </div>
                    </Overlay>
                )
            )}
        </Authenticator>
    );
}

export default ReactUI;