import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import Game from "../../game/model/game.model.js";

export class CharacterPreview extends GameObjectView {
  get style() {
    return "height: 100%; min-height: 5vh; background: #b2b2b2;";
  }

  html() {
    const character = this.character;

    const isLocked = !!character?.locked;
    const isEmpty = character?.id == null;
    let hint = isLocked ? "locked" : "empty";

    return `<div style="${
      this.style
    }" data-empty="${isEmpty}" data-locked="${isLocked}" data-id="${
      character?.id || null
    }" class="character-preview">${character?.name || hint}</div>`;
  }
}

export class CharacterListView extends GameObjectView {
  get style() {
    return 'display: flex; flex-direction: column; gap: 1vh;';
  }

  constructor(props) {
    super(props);

    const game = Game.instance;
    this.onSelect = props?.onSelect;

    const userCharacters = game?.characters || [];
    const availableCharactersNum =
      game?.user?.availableCharactersNum || userCharacters.length;
    const charactersList = new Array(game?.user?.maxCharactersNum || 0)
      .fill({})
      .map((_, index) => {
        const character = userCharacters[index] || {};
        const locked = index >= availableCharactersNum;

        return Object.assign(
          {
            locked,
          },
          character
        );
      });

    this.characterPreviewList =
      charactersList?.map(
        (it) => new CharacterPreview({ model: this.model, character: it })
      ) || [];

    if (this.onSelect && game?.characters) {
      this.onSelect(game.characters[0]);
    }
  }

  html() {
    return `<div style="${
      this.style
    }" class="character-list">${this.characterPreviewList.map((it) =>
      it.html()
    ).join('')}</div>`;
  }
}
