import UserDB from "../prefabs/user.db.js";
import CharacterDB from "../prefabs/character.db.js";
import ItemDB from "../prefabs/item.db.js";
import SessionDB from "../prefabs/session.db.js";

const databases = {};

export const initDatabases = () => {
  databases.user = new UserDB({ key: "users" });
  databases.character = new CharacterDB({ key: "characters" });
  databases.item = new ItemDB({ key: "items" });
  databases.session = new SessionDB({ key: "sessions" });
};
