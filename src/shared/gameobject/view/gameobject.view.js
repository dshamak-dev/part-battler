export default class GameObjectView {
  model;
  // parent element
  parent;

  get style() {
    return "";
  }

  get className() {
    return "";
  }

  constructor(props = {}) {
    Object.assign(this, props);
  }

  render() {}
}
