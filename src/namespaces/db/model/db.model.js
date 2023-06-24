import { mapToObject, objectToMap } from "../../../shared/utils/data.utils.js";

export default class DB {
  table;

  constructor({ key, ...props }) {
    Object.assign(this, { key }, props);

    const record = localStorage.getItem(key);
    let data = !!record ? JSON.parse(record) : null;

    this.table = objectToMap(data);

    if (data == null) {
      this.save();
    }
  }

  set(key, data) {
    this.table.set(key, data);

    this.save();
  }

  update(key, data) {
    const currentData = this.get(key);
    const dataType = typeof data;
    
    switch (dataType) {
      case 'object': {
        if (currentData == null && data == null) {
          this.set(key, data);
          break;
        }

        this.set(key, Object.assign({}, currentData, data));
        break;
      }
      default: {
        this.set(key, data);
      }
    }

    return true;
  }

  get(key) {
    return this.table.get(key);
  }

  delete(key) {
    this.table.delete(key);

    return true;
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(mapToObject(this.table)));
  }
}
