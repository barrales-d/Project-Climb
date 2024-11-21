import { atom, createStore } from "jotai";
import { MenuView } from "./hooks/useMenuState";

const isMenuVisable = atom(false);
const currentViewAtom = atom<MenuView>('main');
const playerName = atom<string>("");

const playerScoreAtom = atom<number>(0.00);

const store = createStore();

export { isMenuVisable, currentViewAtom, playerName, playerScoreAtom, store };