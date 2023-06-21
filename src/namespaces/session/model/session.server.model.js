import { mapToObject } from "../../../shared/utils/data.utils.js";
import DB from "../../db/model/db.model.js";
import Session from "./session.model.js";

const screenStorageKey = "sessions";

export class SessionDB extends DB {
  static instance;

  constructor(props) {
    super(props);

    SessionDB.instance = this;
  }
}
const sessionsDB = new SessionDB({ key: screenStorageKey });

export default class SessionServer {
  static instance;

  sessions;

  constructor(props) {
    Object.assign(this, props);

    this.sessions = new Map();
    this.connections = new Map();
    // todo: try webworkers
    this.clients = new Map();

    SessionServer.instance = this;

    this.onStart();
  }

  onStart() {
    const sessionsData = sessionsDB.getAll() || [];

    const sessions = this.sessions;

    sessionsData.forEach((it) => {
      sessions.set(it.id, new Session(it));
    });
  }

  find(userId, sessionId = null) {
    if (sessionId != null) {
      return this.sessions.get(sessionId);
    }

    const _sessions = [];
    this.sessions.forEach((value, key) => {
      const { participants } = value;

      if (participants.find((it) => it.id === userId) != null) {
        _sessions.push(value);
      }
    });

    return _sessions;
  }

  start(client) {
    const session = new Session();
    session.addParticipant(client.userId, client.characterId);

    SessionDB.instance.set(session.id, session.json);
  }

  send(client, event) {
    const session = this.find(client.userId, client.sessionId);
    
    session.send(client, event);
  }

  connect(client) {
    const session = this.find(client.userId, client.sessionId);
    
    if (session == null) {
      return this.start(client);
    }

    this.clients.set(client.id, client);
    this.send(client, {
      type: 'connect',
      data: {
        userId: client.userId,
        characterId: client.characterId
      }
    });

    return true;
  }

  search(client) {
    const sessions = Object.values(mapToObject(this.sessions)) || [];
    const available = sessions.find(it => it.participants.length < 2);

    if (available == null) {
      return this.start(client);
    }

    return this.connect(client, available.id);
  }

  disconnect(client) {
    const session = this.find(client.userId, client.sessionId);
    
    if (session == null) {
      return false;
    }

    return session.disconnect(client);
  }
}
