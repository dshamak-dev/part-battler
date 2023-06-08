import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";

export default class GameView extends GameObjectView {
  parent;

  get style() {
    return `
      position: relative;
      width: 100vw; min-height: 100vh; height: 100dvh;
      background: #2b2b2b;
      max-width: calc(100vh / 16 * 9);
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
    const activeScreen = this.model.getScreen(this.model.activeScreenType);

    this.parent.innerHTML = `
      <div
        class="${this.className}"
        style="${this.style}"
      >${activeScreen ? activeScreen.html : ''}</div>
    `;
  }
}
