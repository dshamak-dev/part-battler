import {
  addUser,
  getCachedUser,
  getUser,
} from "../../../shared/api/control/user.api.control.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import Screen from "../model/screen.model.js";

export default class AuthScreen extends Screen {
  constructor(props) {
    super(props);

    this.view = new View({ model: this });

    this.message = 'AUTH';

    this.sync();
  }

  async sync() {
    this.error = null;
    this.message = 'Auth in Progress';

    const cachedUser = await getCachedUser().catch((err) => null);

    if (cachedUser != null) {
      return this.model.user  = cachedUser;
    }

    this.auth();
  }

  async auth() {
    this.message = 'Sign In. Please Wait';

    const self = this;
    // todo: Add auth form
    const id = Date.now();
    const userData = { id, name: "John Doe" };
    let user = await addUser(id, userData).catch((err) => {
      self.error = err?.message || err;

      return userData;
    });

    this.model.user = user;
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
    return `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div class="auth-screen" style="text-align: center; color: white;">
          <h3>${this.model.message}</h3>
          ${this.model.error ? `<h5 style="color: red;">${this.model.error}</h5>` : ""}
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);
  }
}
