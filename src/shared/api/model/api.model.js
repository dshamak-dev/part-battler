import { log } from "../../debug/control/debug.control.js";
import { waitFor } from "../../time/control/time.control.js";

const fakeDelay = (min = 2, max = 5) => {
  let startFake = Date.now();
  let ms = Math.max(min, Math.min(max, Math.floor(Math.random() * max))) * 1000;

  return waitFor(ms).then(() => {
    const passed = Date.now() - startFake;

    // log('info',`Fake delay ${passed / 1000}s`);
  });
};

export default class API {
  category;

  constructor({ category }) {
    this.category = category;
  }

  async get(props) {
    await fakeDelay(1, 2);

    return new Promise((res, rej) => {
      let data = JSON.parse(localStorage.getItem(this.category));

      if (data == null) {
        return res(null);
      }

      if (props == null) {
        return res(data);
      }

      res(data[props]);
    });
  }

  async post(props, json) {
    await fakeDelay();

    return new Promise((res, rej) => {
      let data = JSON.parse(localStorage.getItem(this.category)) || {};

      data[props] = json;

      localStorage.setItem(this.category, JSON.stringify(data));

      res(json);
    });
  }

  async update(props, json) {
    return this.put(props, json);
  }

  async put(props, json) {
    await fakeDelay();
    return new Promise((res, rej) => {
      let data = JSON.parse(localStorage.getItem(this.category)) || {};

      data[props] = json;

      localStorage.setItem(this.category, JSON.stringify(data));

      res(json);
    });
  }

  async delete(props) {
    await fakeDelay();
    return new Promise((res, rej) => {
      let data = JSON.parse(localStorage.getItem(this.category)) || {};

      delete data[props];

      localStorage.setItem(this.category, JSON.stringify(data));

      res(json);
    });
  }
}
