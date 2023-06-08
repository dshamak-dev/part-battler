import { screenType } from "../const/screen.cont.js";
import Screen from "../model/screen.model.js";
import BattleScreen from "../prefabs/battle.screen.js";
import CharacterScreen from "../prefabs/character.screen.js";
import LandingScreen from "../prefabs/landing.screen.js";

export const createScreenByType = (type, props) => {
  switch (type) {
    case screenType.landing: {
      return new LandingScreen(props);
    }
    case screenType.battle: {
      return new BattleScreen(props);
    }
    case screenType.character: {
      return new CharacterScreen(props);
    }
    default: {
      return new Screen(props);
    }
  }
};