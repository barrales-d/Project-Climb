import { atom, createStore } from "jotai";

const isMenuVisable = atom(false);

const store = createStore();

export { isMenuVisable, store };