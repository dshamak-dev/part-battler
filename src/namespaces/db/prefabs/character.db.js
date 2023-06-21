import DB from "../model/db.model.js";

export default class CharacterDB extends DB {
  static instance;

  constructor(props) {
    super(props);

    CharacterDB.instance = this;
  }
}