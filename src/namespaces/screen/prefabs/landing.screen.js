import ScreenLinkView from "../../../shared/components/screen.link.view.js";
import { log } from "../../../shared/debug/control/debug.control.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { onDOMEvent, recordToStyle, removeDOMEvent } from "../../../shared/utils/dom.utils.js";
import Character from "../../character/model/character.model.js";
import {
  CharacterPreview,
  CharacterListView,
} from "../../character/view/character.view.js";
import Game from "../../game/model/game.model.js";
import { screenType } from "../const/screen.cont.js";
import Screen from "../model/screen.model.js";

export default class LandingScreen extends Screen {
  type = screenType.landing;
  register = true;

  constructor(props) {
    super(props);

    this.view = new View({ model: this });
  }

  show() {
    super.show();

    this.view.reset();

    log("info", "Game State", this.model);
  }

  hide() {
    super.hide();
  }
}

class View extends GameObjectView {
  get style() {
    return `
      width: 100%; height: 100%;
      background: #2b2b2b;
      display: flex;
    `;
  }

  get className() {
    return "screen landing-screen";
  }

  get html() {
    return `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div style="width: 100%; padding: 0 1vw;display: grid; grid-template: repeat(2, max-content) / 1fr; gap: 1vw;">
          ${this.charactersView.html}
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);

    // const self = this;
    this.charactersView = new ScreenLinkView({
      type: screenType.characterList,
      content: "View Characters",
      style: recordToStyle({
        background: '#c1c1c1',
        padding: '1vh 3vh'
      })
    });
  }

  onVisibilityChange(visible) {
    super.onVisibilityChange();

    this.charactersView.onVisibilityChange(visible);
  }

  reset() {
    const self = this;
  }
}
