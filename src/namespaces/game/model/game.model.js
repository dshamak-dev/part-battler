import GameObject from "../../../shared/gameobject/model/gameobject.model.js";

import LoadingScreen from "../../screen/prefabs/loading.screen.js";
import LandingScreen from "../../screen/prefabs/landing.screen.js";

import GameView from "../view/game.view.js";
import AuthScreen from "../../screen/prefabs/auth.screen.js";
import { getNextArrayItem } from "../../../shared/object/control/array.control.js";
import { updateUser } from "../../../shared/api/control/user.api.control.js";
import { createScreenByType } from "../../screen/contol/screen.control.js";

export default class Game extends GameObject {
  static instance;

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

    this._user = Object.assign(
      {
        maxCharactersNum: 5,
        availableCharactersNum: 2,
      },
      data
    );
  }

  get characters() {
    return this._user?.characters?.slice() || [];
  }

  get json() {
    const base = super.json;
    const { user } = this;

    return Object.assign({}, base, { user });
  }

  constructor() {
    super();

    Game.instance = this;

    this.addScreen(new AuthScreen({ model: this }));
    this.addScreen(new LoadingScreen({ model: this }));
    this.addScreen(new LandingScreen({ model: this }));

    this.toggleScreen(this.screens[0].type);

    this.view = new GameView({ model: this });

    this.update();
  }

  // region Data
  save() {
    const { user, ...game } = this.json;

    updateUser(user.id, user);
    // updateGame(game.id, game);
  }

  // region Character
  addCharacter(character) {
    const characters = this.characters;

    characters.push(character);

    this._user.characters = characters;

    this.save();
    this.update();
    this.render();
  }

  // region Screen
  getScreen(screenType) {
    return this.screens.find((s) => s.type === screenType);
  }

  addScreen(screen) {
    if (!Array.isArray(this.screens)) {
      this.screens = [];
    }

    const index = this.screens.findIndex((it) => it.type === screen.type);

    if (index === -1) {
      this.screens.push(screen);
    } else {
      this.screens.splice(index, 1, screen);
    }
  }

  loadScreen(type, props) {
    let screen = createScreenByType(
      type,
      Object.assign({}, props, { model: this })
    );

    this.addScreen(screen);

    this.toggleScreen(type);
  }

  toggleScreen(nextScreenType) {
    this.getScreen(this.activeScreenType)?.hide();

    this.activeScreenType = nextScreenType;

    const nextScreen = this.getScreen(this.activeScreenType);

    if (nextScreen) {
      nextScreen.show();
    }

    this.update();
  }

  nextScreen() {
    let screenTypes = this.screens.map((s) => s.type);
    let nextScreenType = getNextArrayItem(screenTypes, this.activeScreenType);

    this.toggleScreen(nextScreenType);
  }
}
