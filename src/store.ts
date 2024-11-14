import { atom, createStore } from "jotai";
import { MenuView } from "./hooks/useMenuState";

const isMenuVisable = atom(false);
const currentViewAtom = atom<MenuView>('main');
const playerName = atom<string>("");

const store = createStore();

export { isMenuVisable, currentViewAtom, playerName, store };