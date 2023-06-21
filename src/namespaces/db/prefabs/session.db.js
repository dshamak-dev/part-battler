import DB from "../model/db.model.js";

export default class SessionDB extends DB {
  static instance;

  constructor(props) {
    super(props);

    SessionDB.instance = this;
  }
}
