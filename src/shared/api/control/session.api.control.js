import SessionServer from "../../../namespaces/session/model/session.server.model.js";

const sessionServer = new SessionServer();

export const registerSession = (screen) => {
  const json = screen.json;

  localStorage.setItem(screenStorageKey, JSON.stringify(json));
};

// connect
export const connectToSession = (client) => {
  sessionServer.connect(client);
};

// disconnect
export const disconnectFromSession = (client) => {
  sessionServer.disconnect(client);
};

// send
export const sendToSession = (client, message) => {
  sessionServer.send(client, message);
};