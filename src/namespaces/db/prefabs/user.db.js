import DB from "../model/db.model.js";

export default class UserDB extends DB {
  static instance;

  constructor(props) {
    super(props);

    UserDB.instance = this;
  }
}
