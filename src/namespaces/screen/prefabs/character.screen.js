import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import Character from "../../character/model/character.model.js";
import {
  CharacterActiveItemsView,
  CharacterPreview,
} from "../../character/view/character.view.js";
import Game from "../../game/model/game.model.js";
import { screenType } from "../const/screen.cont.js";
import Screen from "../model/screen.model.js";

export default class CharacterScreen extends Screen {
  type = screenType.character;
  register = true;

  get json() {
    const base = super.json;
    const { characterId } = this;

    return Object.assign({}, base, { characterId });
  }

  constructor(props) {
    super(props);

    this.view = new View({ model: this });
  }
}

class View extends GameObjectView {
  get style() {
    return `
      width: 100%; height: 100%;
      background: #2b2b2b;
    `;
  }

  get className() {
    return "character-screen screen";
  }

  get html() {
    return `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div style="width: 100%; padding: 0 1vw;display: grid; grid-template: repeat(2, max-content) / 1fr; gap: 1vw;">
          <div style="width: 100%; display: grid; grid-template: 1fr / repeat(2, 1fr); gap: 1vw;">
            <div style="min-height: 40vh;">${
              this.characterPreview?.html() || ""
            }</div>
            <div style="font-size: 0.5rem;">${this.characterItemsView.html()}</div>
          </div>
          <div>
            <div id="start-session" style="margin: 0 auto; width: fit-content; padding: 0.5rem 2rem; background: #b2b2b2; color: black;  ${
              this.canStart
                ? "cursor: pointer;"
                : "pointer-events: none; opacity: 0.4;"
            }">start battle</div>
          </div>
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);

    const character = Game.instance.characters.find(
      (it) => it.id === this?.model?.characterId
    );

    this.character = new Character(character);

    this.characterPreview = character
      ? new CharacterPreview({ model: this.model, character })
      : null;

    this.characterItemsView = new CharacterActiveItemsView({
      model: this,
    });
  }
}
