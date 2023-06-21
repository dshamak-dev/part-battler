import { generateId } from "../../../shared/utils/data.utils.js";

export default class Session {
  participants;
  id;
  state;
  turn;
  startedAt;
  endedAt;

  constructor(props) {
    this.clear();

    Object.assign(this, props);

    if (this.id == null) {
      this.id = generateId(4);
    }
  }

  clear() {
    this.participants = [];
    this.id = null;
    this.state = null;
    this.turn = 0;
    this.startedAt = null;
    this.endedAt = null;
  }

  addParticipant(userId, characterId) {
    this.participants.push({
      userId, characterId
    });
  }
}
