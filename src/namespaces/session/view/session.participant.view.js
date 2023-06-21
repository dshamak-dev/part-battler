import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { recordToStyle } from "../../../shared/utils/dom.utils.js";
import { numberToText } from "../../../shared/utils/format.utils.js";

const gridStyle = {
  height: "100%",
  display: "grid",
};

export default class SessionParticipantView extends GameObjectView {
  get html() {
    const { preview, name, health, maxHealth } = Object.assign(
      {
        preview:
          "https://i.pinimg.com/474x/af/69/fd/af69fd12c6d684c27b20923489ebc21a.jpg",
        name: "???",
        health: 0,
        maxHealth: 0,
      },
      this.model
    );

    return `<div class="session-participant" style="${recordToStyle(
      Object.assign(
        gridStyle,
        this.reverse
          ? {
              gridTemplate: "25vh 1fr / 1fr",
              gridTemplateAreas: "'b' 'a'",
            }
          : {
              gridTemplate: "1fr 25vh / 1fr",
              gridTemplateAreas: "'a' 'b'",
            }
      )
    )}">
      <div class="stats" style="${recordToStyle({
        gridArea: "a",
        display: "flex",
        padding: "2vw",
        color: 'white',
        justifyContent: "space-between",
      })}">
        <div data-label="health">${numberToText(health, 2)}/${numberToText(maxHealth, 2)}</div>
        <div data-label="name">${name}</div>
      </div>
      <div style="${recordToStyle({
        gridArea: "b",
        height: "100%",
        background: `url(${preview}) center`,
        backgroundSize: "cover",
      })}"></div>
    </div>`;
  }
}
