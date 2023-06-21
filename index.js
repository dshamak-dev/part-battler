import { createGame } from "./src/namespaces/game/control/game.control.js";
import Server from "./src/namespaces/server/model/server.model.js";
import {
  getPreviousArrayItem,
  getNextArrayItem,
} from "./src/shared/object/control/array.control.js";

(() => {
  // todo: Add env constants
  window.process = {
    env: "develop",
  };

  const server = new Server();
  server.start();

  const game = createGame();

  window.debug = {};

  const toggleState = (key) => {
    window.debug[key] = !window.debug[key];
    game.render();
  };

  window.addEventListener("keydown", (e) => {
    let key = e.key;

    if (typeof key === 'string') {
      key = key.toLowerCase();
    }

    switch (key) {
      case "1": {
        key = "addPart";
        break;
      }
      case "arrowleft": {
        let screenTypes = game.screens.map((s) => s.type);
        let nextScreenType = getPreviousArrayItem(
          screenTypes,
          game.activeScreenType
        );

        game.toggleScreen(nextScreenType);
        break;
      }
      case "arrowright": {
        let screenTypes = game.screens.map((s) => s.type);
        let nextScreenType = getNextArrayItem(
          screenTypes,
          game.activeScreenType
        );

        game.toggleScreen(nextScreenType);
        break;
      }
    }
  });
})();
