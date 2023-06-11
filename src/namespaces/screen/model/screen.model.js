import { registerScreen } from "../../../shared/api/control/screen.api.js";

export default class Screen {
  register = false;
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

  get html() {
    return this.view?.html || null;
  }

  get json() {
    const { type } = this;

    return { type };
  }

  constructor(props) {
    Object.assign(
      this,
      {
        type: this.constructor.name,
      },
      props || {}
    );
  }

  show() {
    this.visible = true;

    if (this.register) {
      registerScreen(this);
    }

    if (this.view) {
      this.view.onVisibilityChange(true);
    }
  }

  hide() {
    this.visible = false;

    if (this.view) {
      this.view.onVisibilityChange(false);
    }
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
