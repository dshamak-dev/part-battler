import { log } from "../../../shared/debug/control/debug.control.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { onDOMEvent, removeDOMEvent } from "../../../shared/utils/dom.utils.js";
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
    const hasSelectedCharacter = this.selectedCharacterId != null;

    return `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div style="width: 100%; padding: 0 1vw;display: grid; grid-template: repeat(2, max-content) / 1fr; gap: 1vw;">
          <div style="width: 100%; display: grid; grid-template: 1fr / repeat(2, 1fr); gap: 1vw;">
            <div style="min-height: 40vh;">${
              this.selectedCharacterView?.html() || ""
            }</div>
            <div>${
              this.characterListView ? this.characterListView.html() : ""
            }</div>
          </div>
          <div>
            <div id="start-session" style="margin: 0 auto; width: fit-content; padding: 0.5rem 2rem; background: #b2b2b2; color: black;  ${
              hasSelectedCharacter
                ? "cursor: pointer;"
                : "pointer-events: none; opacity: 0.4;"
            }">select</div>
          </div>
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);

    const self = this;

    this.selectedCharacterView = null;
    this.characterListView = null;
    this.handleStartSession = (e) => {
      Game.instance.loadScreen(screenType.character, {
        characterId: self.selectedCharacterId,
      });
    };
    this.handleCharacterSelect = (e) => {
      const game = Game.instance;
      const target = e.target;

      const id = Number(target.getAttribute("data-id")) || null;
      const isNew = target.getAttribute("data-empty") === "true";
      const isLocked = target.getAttribute("data-locked") === "true";

      if (isLocked) {
        return false;
      }

      if (isNew) {
        const character = new Character();
        game.addCharacter(character.json);
        self.onSelectCharacter(character);

        return true;
      }

      if (isLocked || (id != null && self.selectedCharacterId === id)) {
        return;
      }

      const character = game.characters.find((it) => it.id === id);

      if (character) {
        self.onSelectCharacter(character);
      }
    };
  }

  onVisibilityChange(visible) {
    super.onVisibilityChange();

    if (visible) {
      this.startSessionEventKey = onDOMEvent("click", {
        query: "#start-session",
        callback: this.handleStartSession,
      });
  
      this.characterSelectEventKey = onDOMEvent("click", {
        callback: this.handleCharacterSelect,
        query: ".character-preview",
      });
    } else {
      removeDOMEvent(this.startSessionEventKey);
      removeDOMEvent(this.characterSelectEventKey);
    }
  }
  

  reset() {
    const self = this;

    this.selectedCharacterView = null;
    this.characterListView = new CharacterListView({
      model: this,
      onSelect: self.onSelectCharacter.bind(self),
    });
  }

  onSelectCharacter(character) {
    this.selectedCharacterId = character?.id;

    this.selectedCharacterView = character
      ? new CharacterPreview({ model: this, character })
      : null;

    if (Game.instance?.render) {
      Game.instance.render();
    }
  }
}
