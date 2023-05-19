import Dimension from "../../dimension/model/dimension.model.js";
import Vector from "../../vector/model/vector.model.js";

export default class GameObject {
  position;

  view;

  get json() {
    return JSON.stringify(this);
  }

  get html() {
    return this.view?.html || null;
  }

  constructor({ position, dimension, ...other } = {}) {
    Object.assign(
      this,
      {
        position: new Vector(position),
        dimension: new Dimension(dimension),
      },
      other
    );
  }

  update() {
    if (this.view) {
      this.view.render();
    }
  }
}
