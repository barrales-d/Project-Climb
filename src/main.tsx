import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGame } from "./phaserGame";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./store";

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