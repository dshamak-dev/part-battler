
import GameObject from "../../../shared/gameobject/model/gameobject.model.js";
import { generateId } from "../../../shared/utils/data.utils.js";

export default class Character extends GameObject {
  id;
  name;
  parts;
  items;
  health;

  get json() {
    const base = super.json;
    const { id, name, parts, items, health } = this;

    return Object.assign({}, base, { id, name, parts, items, health });
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
  }
}