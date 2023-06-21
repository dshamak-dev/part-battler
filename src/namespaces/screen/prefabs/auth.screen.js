import {
  addUser,
  getCachedUser,
  getUser,
  signInUser,
} from "../../../shared/api/control/user.api.control.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { getFormFields, mapToObject } from "../../../shared/utils/data.utils.js";
import { onDOMEvent } from "../../../shared/utils/dom.utils.js";
import Game from "../../game/model/game.model.js";
import Screen from "../model/screen.model.js";

export default class AuthScreen extends Screen {
  constructor(props) {
    super(props);

    this.view = new View({ model: this });

    this.message = "Loading..";

    this.sync();
  }

  async sync() {
    this.loading = true;
    this.error = null;
    this.update();
    // this.message = "Auth in Progress";

    const cachedUser = await getCachedUser().catch((err) => null);

    if (cachedUser != null) {
      this.user = cachedUser;
    }

    this.loading = false;
    this.message = "Sign In";

    this.update();
  }

  async auth({ email, name }) {
    this.loading = true;
    this.message = "Sign In. Please Wait";
  
    this.update();

    const self = this;
    // todo: Add auth form
    const id = email;
    const userData = {
      id,
      name,
      email,
    };
    let user = await signInUser(id, userData).catch((err) => {
      self.error = err?.message || err;

      return userData;
    });

    this.model.user = user;
    this.loading = false;

    this.update();

    Game.instance.nextScreen();

    return user;
  }
}

class View extends GameObjectView {
  get style() {
    return `
      width: 100%; height: 100%;
      background: #2b2b2b;
      display: flex; align-items: center; justify-content: center;
    `;
  }

  get className() {
    return "screen";
  }

  get html() {
    const disabled = this.model.loading;

    return `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div class="auth-screen" style="text-align: center; color: white;">
          <h3>${this.model.message}</h3>
          <form id="auth-form">
            <div style="font-size: 1.4rem; display: flex; flex-direction: column; gap: 1vh;">
              <div data-label="email"><input required id="email" name="email" ${disabled ? 'disabled="disabled"' : ''} /></div>
              <div data-label="name"><input required id="name" name="name"  ${disabled ? 'disabled="disabled"' : ''} /></div>
            </div>
            <div><button ${disabled ? 'disabled="disabled"' : ''}>confirm</button></div>
          </form>
          ${
            this.model.error
              ? `<h5 style="color: red;">${this.model.error}</h5>`
              : ""
          }
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);

    const self = this;

    onDOMEvent('submit', {
      callback: (e) => {
        e.preventDefault();
        const target = e.target;
        const authData = getFormFields(target);

        self.model.auth(authData);
      },
      query: '#auth-form'
    });
  }

  render() {
    super.render();

    if (this.model?.user == null) {
      return;
    }
    const { email = null, name = null } = this.model.user;

    const emailEl = document.getElementById('email');
    
    if (emailEl && email) {
      emailEl.setAttribute('value', email);
    }

    const nameEl = document.getElementById('name');

    if (nameEl && name) {
      nameEl.setAttribute('value', name);
    }
  }
}
