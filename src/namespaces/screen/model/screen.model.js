import GameObject from "../../../shared/gameobject/model/gameobject.model.js";

export default class Screen extends GameObject {
  _visible;
  _message;
  _error;

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;

    if (this.model) {
      this.model.update();
    }
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;

    if (this.model) {
      this.model.update();
    }
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = value;

    if (this.model) {
      this.model.update();
    }
  }

  get type() {
    return this.constructor.name;
  }

  constructor(props) {
    super(props);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
