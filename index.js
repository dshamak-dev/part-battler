import { createGame } from "./src/namespaces/game/control/game.control.js";
import { getPreviousArrayItem, getNextArrayItem } from "./src/shared/object/control/array.control.js";

(() => {
  const game = createGame();
  console.info('initial');

  window.debug = {};

  const toggleState = (key) => {
    window.debug[key] = !window.debug[key];
    game.render();
  };

  window.addEventListener("keydown", (e) => {
    let key = null;

    switch (e.key.toLocaleLowerCase()) {
      case "1": {
        key = 'addPart';
        break;
      }
      case "arrowleft": {
        let screenTypes = game.screens.map(s => s.type);
        let nextScreenType = getPreviousArrayItem(screenTypes, game.activeScreenType);

        game.toggleScreen(nextScreenType);
        break;
      }
      case "arrowright": {
        let screenTypes = game.screens.map(s => s.type);
        let nextScreenType = getNextArrayItem(screenTypes, game.activeScreenType);

        game.toggleScreen(nextScreenType);
        break;
      }
    }

    if (key != null) {
      toggleState(key);
    }
  });
})();
