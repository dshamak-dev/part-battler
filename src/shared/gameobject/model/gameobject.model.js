import Dimension from "../../dimension/model/dimension.model.js";
import Vector from "../../vector/model/vector.model.js";

export default class GameObject {
  position;
  dimension;

  view;

  get json() {
    const { dimension, position } = this;

    return { dimension, position };
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

  render() {
    if (this.view && this.view.render) {
      this.view.render();
    }
  }
}
