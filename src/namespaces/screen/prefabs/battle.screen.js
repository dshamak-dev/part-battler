import GameObjectView from "../../../shared/gameobject/view/gameobject.view.js";
import { recordToStyle } from "../../../shared/utils/dom.utils.js";
import {
  connectToSession,
  findSession,
} from "../../session/control/session.control.js";
import SessionParticipantView from "../../session/view/session.participant.view.js";
import SessionTurnView from "../../session/view/session.turn.view.js";
import { screenType } from "../const/screen.cont.js";
import Screen from "../model/screen.model.js";

export default class BattleScreen extends Screen {
  type = screenType.battle;
  register = true;
  loading;
  _request;

  get json() {
    return Object.assign(super.json, {
      characterId: this.characterId,
    });
  }

  constructor(props) {
    super(props);

    this.view = new View({ model: this });
  }

  show() {
    super.show();
    const self = this;

    this.load();
  }

  hide() {
    super.hide();
  }

  async load() {
    const self = this;

    this.loading = true;
    this.update();

    if (this.model.connectionId != null) {
      this.session = await connectToSession(this.model.connectionId).then(
        (res) => {
          if (res == null) {
            alert("Session is not found");
          }

          return res;
        }
      );
    } else {
      this.session = await findSession(this.model.character?.id);
    }

    this.loading = false;
    this.update();
  }
}

const sessionGridStyle = {
  display: "grid",
  gridTemplate: "1fr auto 1fr / 1fr",
  width: "100%",
  height: "100%",
};

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
        <div class="battle-screen_grid" style="${recordToStyle(
          sessionGridStyle
        )}">
          <div>${this.enemyGroupSessionView.html}</div>
          <div style="height: 100%; width: 100%;">${
            this.sessionTurnView.html
          }</div>
          <div>${this.allyGroupSessionView.html}</div>
        </div>
      </div>
    `;
  }

  constructor(props) {
    super(props);

    const emeny = this.model?.session?.enemy;
    // {
    //   preview: "https://i.pinimg.com/474x/97/8f/ce/978fce70337acabe8c07cf7a578a2810.jpg"
    // };
    const ally = {
      preview:
        "https://i.pinimg.com/474x/ae/74/0e/ae740e93ff84652cdaf20ba9eabc473c.jpg",
    };

    this.enemyGroupSessionView = new SessionParticipantView({
      model: emeny,
      reverse: true,
    });
    this.allyGroupSessionView = new SessionParticipantView({ model: ally });
    this.sessionTurnView = new SessionTurnView({ model: this.model });
  }
}
