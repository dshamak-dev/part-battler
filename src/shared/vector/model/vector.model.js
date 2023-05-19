export default class Vector {
  x = 0;
  y = 0;
  z = 0;

  constructor(props = { x: 0, y: 0, z: 0 }) {
    Object.assign(this, props);
  }
}
