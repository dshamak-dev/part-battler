import DB from "../model/db.model.js";

export default class ItemDB extends DB {
  static instance;

  constructor(props) {
    super(props);

    ItemDB.instance = this;
  }
}