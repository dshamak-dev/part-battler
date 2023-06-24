import ScreenLinkView from "../../../shared/components/screen.link.view.js";
import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import {
  onDOMEvent,
  recordToStyle,
  removeDOMEvent,
} from "../../../shared/utils/dom.utils.js";
import {
  screenType,
  screensWithNavigation,
} from "../../screen/const/screen.cont.js";
import Game from "../model/game.model.js";

export default class GameView extends GameObjectView {
  parent;

  get style() {
    return `
      position: relative;
      width: 100vw; min-height: 100vh; height: 100dvh;
      background: #2b2b2b;
      max-width: calc(100vh / 16 * 9);
      display: grid;
    `;
  }

  get className() {
    return "game";
  }

  constructor(props) {
    super(props);

    this.parent = document.getElementById("root");
    this.navigationView = new GameNavigationView({ model: this.model });

    this.children = [this.navigationView];

    this.handleLinkClick = (e) => {
      const target = e.target;
      const screenType = Number(target?.getAttribute("data-type"));

      if (Number.isNaN(screenType)) {
        return;
      }

      Game.instance.loadScreen(screenType);
    };
  }

  onVisibilityChange(visible) {
    super.onVisibilityChange(visible);

    if (visible) {
      this.navLinkEventKey = onDOMEvent("click", {
        query: ".nav-link",
        callback: this.handleLinkClick,
      });
    } else {
      removeDOMEvent(this.navLinkEventKey);
    }
  }

  render() {
    const activeScreen = this.model.getScreen(this.model.activeScreenType);

    const hasNavigation = screensWithNavigation.includes(activeScreen?.type);

    this.parent.innerHTML = `
      <div
        class="${this.className}"
        style="${this.getStyle(hasNavigation)}"
      >
        ${activeScreen ? activeScreen.html : ""}
        ${hasNavigation ? this.navigationView.html : ""}
      </div>
    `;
  }

  getStyle(hasNavigation) {
    return `${this.style}grid-template: ${
      hasNavigation ? "1fr auto" : "1fr"
    } / 1fr;`;
  }
}

class GameNavigationView extends GameObjectView {
  get style() {
    return `width: 100%; overflow: hidden; min-height: 5vw; display: grid; grid-template-columns: repeat(5, auto); justify-content: space-between;`;
  }

  get linkStyle() {
    return recordToStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "center",
      padding: '1vh',
      color: "white",
    });
  }

  get className() {
    return `game-navigation`;
  }

  get html() {
    return `<div
      style="${this.style}"
    >
      ${this.children.map((it) => it.html).join("")}
      <div style="${this.linkStyle}cursor: default;opacity: 0.4;">🎯</div>
      <div style="${this.linkStyle}cursor: default;opacity: 0.4;">🎰</div>
      <div style="${this.linkStyle}cursor: default;opacity: 0.4;">🛠</div>
    </div>`;
  }

  constructor(props) {
    super(props);

    this.landingLink = new ScreenLinkView({
      type: screenType.landing,
      content: "<span>💡</span><span style='font-size: 0.5rem;'>Home</span>",
      style: this.linkStyle,
    });
    this.characterListLink = new ScreenLinkView({
      type: screenType.characterList,
      content: "<span>🧸</span><span style='font-size: 0.5rem;'>Characters</span>",
      style: this.linkStyle,
    });

    this.children = [this.landingLink, this.characterListLink];
  }
}
