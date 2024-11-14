import { Authenticator, Input, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAtom, useSetAtom } from "jotai";
import { isMenuVisable, playerName } from "./store";
import { useEffect } from "react";
import { MainMenu } from "./react_components/MainMenu";

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
        <>
            <Authenticator components={components}>
                {({ signOut }) => (
                    name != '' ? (
                        // <div className="test-text">
                        //     <h1>Hello {user?.username}</h1>
                        //     <h2>Hello {name}</h2>
                        //     <button onClick={signOut}>Sign out</button>
                        // </div>
                        <>
                            <MainMenu signOut={signOut}/>
                        </>
                    ) : (
                        <div className="menu-container">
                            <h1>Signing in...</h1>
                        </div>
                    )
                    // if isMenuVisisble:
                    //  render menu and handle states
                    //  when play clicks on Play, set isMenuVisible to false
                    // if isMenuVisible is false:
                    //  render pause button on top right corner
                    //  when clicked set isMenuVisible to true 
                )}
            </Authenticator>
            {/* <p className="test-text">Tap to move</p> */}
            {/* TODO: Bring the UI Components here */}
        </>
    );
}

export default ReactUI;