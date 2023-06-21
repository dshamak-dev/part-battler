export default class SessionClient {
  // type: offline | online
  type;
  // status: pending | active | done
  status;
  // participants: [{ userId, characterId }]
  participants;
  // listeners: Map<id, handler>
  listeners = new Map();

  constructor(props) {
    Object.assign(this, props);
  }

  connect() {}

  disconnet() {}

  on(eventType, data) {
    if (!this.listeners) {
      return;
    }

    this.listeners.forEach((callback, key) => {
      callback(eventType, data);
    });
  }

  send(eventType, data) {}

  register(id, callback) {
    this.listeners.set(id, callback);
  }

  unregister(id) {
    this.listeners.delete(id);
  }
}
