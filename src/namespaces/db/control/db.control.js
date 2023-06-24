import UserDB from "../prefabs/user.db.js";
import CharacterDB from "../prefabs/character.db.js";
import ItemDB from "../prefabs/item.db.js";
import SessionDB from "../prefabs/session.db.js";
import { databaseType } from "../const/db.const.js";

let databases = null;

export const initDatabases = () => {
  if (databases == null) {
    databases = {};
  }

  databases[databaseType.user] = new UserDB({ key: databaseType.user });
  databases[databaseType.character] = new CharacterDB({ key: databaseType.character });
  databases[databaseType.character] = new ItemDB({ key: databaseType.item });
  databases[databaseType.session] = new SessionDB({ key: databaseType.session });
};

export const getDatabase = (key) => {
  if (databases == null) {
    initDatabases();
  }

  return databases[key];
};