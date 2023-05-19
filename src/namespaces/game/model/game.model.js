import GameObject from "../../../shared/gameobject/model/gameobject.model.js";

import LoadingScreen from "../../screen/prefabs/loading.screen.js";
import LandingScreen from "../../screen/prefabs/landing.screen.js";
import BattleScreen from "../../screen/prefabs/battle.screen.js";
import PlayerScreen from "../../screen/prefabs/player.screen.js";
import ScoreBoardScreen from "../../screen/prefabs/scoreboard.screen.js";

import GameView from "../view/game.view.js";

export default class Game extends GameObject {
  screens;
  activeScreenType;

  constructor() {
    super();

    this.addScreen(new LoadingScreen());
    this.addScreen(new LandingScreen());
    this.addScreen(new PlayerScreen());
    this.addScreen(new BattleScreen());
    this.addScreen(new ScoreBoardScreen());

    this.toggleScreen(this.screens[0].type);

    this.view = new GameView({ model: this });

    this.update();
  }

  getScreen(screenType) {
    return this.screens.find((s) => s.type === screenType);
  }

  addScreen(screen) {
    if (!Array.isArray(this.screens)) {
      this.screens = [];
    }

    this.screens.push(screen);
  }

  toggleScreen(nextScreenType) {
    this.activeScreenType = nextScreenType;

    this.update();
  }
}
