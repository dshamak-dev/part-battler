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

  get html() {
    return null;
  }

  constructor(props = {}) {
    Object.assign(this, props);
  }

  render() {}

  onVisibilityChange(visible = false) {}

  static toHTML(record) {
    return '';
  }
}
