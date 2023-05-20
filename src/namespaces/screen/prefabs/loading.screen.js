import { getAllBundles } from "../../../shared/api/control/bundle.api.control.js";
import {
  addPlayer,
  getPlayer,
} from "../../../shared/api/control/player.api.control.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import Screen from "../model/screen.model.js";

export default class LoadingScreen extends Screen {
  constructor(props) {
    super(props);

    this.view = new View({ model: this });

    this.message = "Loading...";
    this.error = null;
  }

  show() {
    super.show();

    this.load();
  }

  async load() {
    const self = this;

    await this.loadBundles().catch((err) => {
      self.error = err?.message || err;
    });
    await this.loadPlayer().catch((err) => {
      self.error = err?.message || err;
    });

    self.model.nextScreen();
  }

  async loadBundles() {
    const self = this;
    this.error = null;
    this.message = "Loading Bundles...";

    const bundles = await getAllBundles().catch((err) => {
      self.error = err.message || err;

      return null;
    });

    return (this.model.bundles = bundles || []);
  }

  async loadPlayer() {
    const self = this;
    this.error = null;
    this.message = "Loading Player...";

    const userId = this.model?.user?.id;

    if (userId == null) {
      return;
    }

    let player = await getPlayer(userId).catch((err) => {
      self.error = err.message || err;

      return null;
    });

    if (player == null) {
      player = await addPlayer(userId, { parts: [], name: "Wooden Boy" })
        .then((player) => {
          return (self.model.player = player || null);
        })
        .catch((err) => {
          self.error = err.message || err;

          return null;
        });
    }

    return (this.model.player = player || null);
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
        <div class="loading-screen" style="text-align: center; color: white;">
        <h3>${this.model.message}</h3>
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
  }
}
