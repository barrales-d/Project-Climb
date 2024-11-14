import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";

import { createGame } from "./phaserGame";
import ReactUI from "./ReactUI";
import { store } from "./store";

// Configure Amplify
Amplify.configure(config);

const ui = document.getElementById("ui");
if (!ui) throw new Error("No UI element found");
const root = createRoot(ui);
if (!root) throw new Error("No root was created");

root.render(
    <StrictMode>
        <Provider store={store}>
            <ReactUI />
        </Provider>
    </StrictMode>
);

createGame();