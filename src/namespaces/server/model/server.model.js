import { initDatabases } from "../../db/control/db.control.js";


export default class Server {
  instance;

  constructor() {
    Server.instance = this;
  }

  start() {
    initDatabases();
  }
}
