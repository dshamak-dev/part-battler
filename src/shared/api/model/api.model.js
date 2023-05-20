import { log } from "../../debug/control/debug.control.js";
import { waitFor } from "../../time/control/time.control.js";

const fakeDelay = () => {
  let startFake = Date.now();
  let ms = Math.max(2, Math.min(5, Math.floor(Math.random() * 5))) * 1000;

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
    await fakeDelay();

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
