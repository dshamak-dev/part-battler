import GameObject from "../../../shared/gameobject/model/gameobject.model.js";

export default class Screen extends GameObject {
  get type() {
    return this.constructor.name;
  }

  constructor(props) {
    super(props);
  }
}