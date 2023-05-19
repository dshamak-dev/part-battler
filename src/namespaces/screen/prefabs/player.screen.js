import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import Screen from "../model/screen.model.js";

export default class PlayerScreen extends Screen {
  constructor(props) {
    super(props);

    this.view = new View();
  }
}

class View extends GameObjectView{
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
          <h4>Player Screen</h4>
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);
  }
}