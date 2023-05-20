import GameObject from "../../../shared/gameobject/model/gameobject.model.js";

import LoadingScreen from "../../screen/prefabs/loading.screen.js";
import LandingScreen from "../../screen/prefabs/landing.screen.js";
import BattleScreen from "../../screen/prefabs/battle.screen.js";
import PlayerScreen from "../../screen/prefabs/player.screen.js";
import ScoreBoardScreen from "../../screen/prefabs/scoreboard.screen.js";

import GameView from "../view/game.view.js";
import AuthScreen from "../../screen/prefabs/auth.screen.js";
import { getNextArrayItem } from "../../../shared/object/control/array.control.js";

export default class Game extends GameObject {
  screens;
  activeScreenType;
  // private
  _user;

  get user() {
    if (!this._user) {
      return null;
    }

    return Object.assign({}, this._user);
  }

  set user(data) {
    if (data == null) {
      return;
    }

    this._user = Object.assign({}, data);
    this.nextScreen();
  }

  constructor() {
    super();

    this.addScreen(new AuthScreen({ model: this }));
    this.addScreen(new LoadingScreen({ model: this }));
    this.addScreen(new LandingScreen({ model: this }));
    this.addScreen(new PlayerScreen({ model: this }));
    this.addScreen(new BattleScreen({ model: this }));
    this.addScreen(new ScoreBoardScreen({ model: this }));

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
    this.getScreen(this.activeScreenType)?.hide();

    this.activeScreenType = nextScreenType;

    this.getScreen(this.activeScreenType)?.show();

    this.update();
  }

  nextScreen() {
    let screenTypes = this.screens.map((s) => s.type);
    let nextScreenType = getNextArrayItem(screenTypes, this.activeScreenType);

    this.toggleScreen(nextScreenType);
  }
}
