import { waitFor } from "../../../shared/time/control/time.control.js";
import { getRandom } from "../../../shared/utils/data.utils.js";
import SessionClient from "../model/session.client.model.js";
import SessionServer from "../model/session.server.model.js";

export const connectToSession = async (sessionId) => {
  await waitFor(getRandom(500, 1000));
  const data = JSON.parse(localStorage.getItem('sessions')) || [];
  const _s = data.find(it => it.id === sessionId) || null;

  if (_s == null) {
    return null;
  }

  const sessionClient = new SessionClient(_s);

  SessionServer.instance.connect(sessionClient);

  return sessionClient;
};

export const findSession = async (characterId) => {
  await waitFor(getRandom(2000, 4000));

  const sessionClient = new SessionClient({
    characterId
  });

  connectToSession(sessionClient);

  await waitFor(getRandom(1000, 2000));

  return sessionClient;
};