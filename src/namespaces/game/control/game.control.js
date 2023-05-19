import Game from "../model/game.model.js";

let game = null;

export const createGame = () => {
  return game = new Game();
};

export const getGame = () => {
  return game;
};
