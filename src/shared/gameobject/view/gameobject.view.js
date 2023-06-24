export default class GameObjectView {
  model;
  el;
  // parent element
  parent;
  children;

  get style() {
    return "";
  }

  get className() {
    return "";
  }

  get html() {
    return this.el ? this.el.outerHTML : "";
  }

  constructor(props = {}) {
    Object.assign(this, props);
  }

  render() {}

  onVisibilityChange(visible = false) {
    if (Array.isArray(this.children)) {
      this.children.forEach((it) => it.onVisibilityChange(visible));
    }
  }

  static toHTML(record) {
    return "";
  }
}
