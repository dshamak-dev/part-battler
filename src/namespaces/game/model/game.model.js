import GameObject from "../../../shared/gameobject/model/gameobject.model.js";
import GameView from "../view/game.view.js";

export default class Game extends GameObject {
  screens;
  activeScreenType;

  constructor() {
    super();

    this.view = new GameView({ model: this });

    this.update();
  }

  getScreen(screenType) {}

  addScreen(screen) {}

  toggleScreen(nextScreenType) {}
}
