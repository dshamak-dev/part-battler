import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";

export default class GameView extends GameObjectView {
  parent;

  get style() {
    return `
      width: 100vw; min-height: 100vh; height: 100dvh;
      background: #2b2b2b;
      display: flex; align-items: center; justify-content: center;
    `;
  }

  get className() {
    return "game";
  }

  constructor(props) {
    super(props);

    this.parent = document.getElementById("root");
  }

  render() {
    this.parent.innerHTML = `
      <div
        class="${this.className}"
        style="${this.style}"
      >
        <div class="game-content" style="text-align: center; color: white;">
          <h4>Insert Coin</h4>
        </div>
      </div>
    `;
  }
}
