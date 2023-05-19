import { createGame } from "./src/namespaces/game/control/game.control.js";

(() => {
  const game = createGame();

  window.debug = {};

  const toggleState = (key) => {
    window.debug[key] = !window.debug[key];
    game.render();
  };

  window.addEventListener("keydown", (e) => {
    let key = null;

    switch (e.key) {
      case "1": {
        key = 'addPart';
        break;
      }
    }

    if (key != null) {
      toggleState(key);
    }
  });
})();
