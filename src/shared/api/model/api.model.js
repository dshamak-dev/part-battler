import { getDatabase } from "../../../namespaces/db/control/db.control.js";
import { waitFor } from "../../time/control/time.control.js";

const fakeDelay = (min = 2, max = 5) => {
  let ms = Math.max(min, Math.min(max, Math.floor(Math.random() * max))) * 1000;

  return waitFor(ms);
};

export default class API {
  category;

  constructor({ category }) {
    this.category = category;
    this.db = getDatabase(category);
  }

  async get(id) {
    await fakeDelay(1, 2);

    return new Promise((res, rej) => {
      let data = this.db?.get(id);

      if (data == null) {
        return res(null);
      }

      res(data);
    });
  }

  async post(id, json) {
    await fakeDelay();

    return new Promise((res, rej) => {
      if (this.db == null) {
        return rej('Connection failed');
      }

      this.db.set(id, json);

      res(json);
    });
  }

  async update(props, json) {
    return this.put(props, json);
  }

  async put(id, json) {
    await fakeDelay();
    return new Promise((res, rej) => {
      if (this.db == null) {
        return rej('Connection failed');
      }

      this.db.update(id, json);

      res(json);
    });
  }

  async delete(id) {
    await fakeDelay();
    return new Promise((res, rej) => {
      if (this.db == null) {
        return rej('Connection failed');
      }

      this.db.delete(id);

      res(true);
    });
  }
}
