import GameObject from "../../../shared/gameobject/model/gameobject.model.js";
import { generateId } from "../../../shared/utils/data.utils.js";
import { characterItemType } from "../const/character.const.js";
import { generateDraftCharacterItems } from "../control/character.control.js";

export default class Character extends GameObject {
  id;
  name;
  parts;
  items;
  inventory;
  health;

  get json() {
    const base = super.json;
    const { id, name, parts, items, health } = this;

    return Object.assign({}, base, { id, name, parts, items, health });
  }

  get head() {
    return this.items?.find((it) => it.type === characterItemType.head) || null;
  }

  get body() {
    return this.items?.find((it) => it.type === characterItemType.body) || null;
  }

  get hands() {
    return this.items?.filter((it) => it.type === characterItemType.hand) || [];
  }

  get legs() {
    return this.items?.filter((it) => it.type === characterItemType.leg) || [];
  }

  constructor(props) {
    super(props);

    Object.assign(this, props);

    if (this.id == null) {
      this.id = generateId(4);
    }

    if (this.name == null) {
      this.name = this.id;
    }

    if (!this.items?.length) {
      this.items = generateDraftCharacterItems();
    }
  }
}
