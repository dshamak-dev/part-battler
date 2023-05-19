export default class Dimension {
  width = 0;
  height = 0;

  constructor(props = { width: 0, height: 0 }) {
    Object.assign(this, props);
  }
}