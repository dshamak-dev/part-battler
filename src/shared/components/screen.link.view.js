import Game from "../../namespaces/game/model/game.model.js";
import GameObjectView from "../gameobject/view/gameobject.view.js";
import { generateId } from "../utils/data.utils.js";
import { removeDOMEvent } from "../utils/dom.utils.js";
import { onDOMEvent } from "../utils/dom.utils.js";

export default class ScreenLinkView extends GameObjectView {
  screenType;

  constructor({ type, style, className, content, ...other }) {
    super(other);

    this.id = generateId(4, true);
    this.screenType = type;

    const el = (this.el = document.createElement("div"));

    el.setAttribute("id", this.id);
    el.setAttribute("style", style || "");
    el.setAttribute("class", className || "");
    el.innerHTML = content || this.screenType || "screen link";
  }

  onVisibilityChange(visible) {
    if (visible) {
      this.clickEventId = onDOMEvent("click", {
        query: `#${this.id}`,
        callback: this.handleClick.bind(this),
      });
    } else if (this.clickEventId != null) {
      removeDOMEvent(this.clickEventId);
    }
  }

  handleClick(e) {
    if (this.screenType) {
      Game.instance.loadScreen(this.screenType);
    }
  }
}
