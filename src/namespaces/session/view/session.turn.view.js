import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { recordToStyle } from "../../../shared/utils/dom.utils.js";

export default class SessionTurnView extends GameObjectView {
  get style() {
    return recordToStyle({
      position: "relative",
    });
  }

  get html() {
    return `
      <div style="${this.style}">
        <div style="position: absolute; z-index: 0; width: 100%; top: 50%; margin-top: -1px; height: 2px; background-color: rgba(255,255,255,0.2);"></div>
        <div style="position: relative; z-index: 1; margin: 0 auto; width: 10vh; height: 10vh; border-radius: 100%; background: #c9c9c9;"></div>
      </div>
    `;
  }
}
