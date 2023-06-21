export const generateId = (length = 4) => {
  const rand = new Array(length)
    .fill(null)
    .map(() => getRandom(0, 10, true))
    .join("");

  return Number(rand);
};

// max is NOT included
export const getRandom = (min, max, floor = true) => {
  const rand = Math.max(Math.random() * max + min, min);
  const res = Math.min(max, rand);

  if (floor) {
    return Math.floor(res);
  } else {
    return res;
  }
};

export const mapToObject = (map) => {
  if (map == null) {
    return {};
  }

  const rec = {};

  map.forEach((value, key) => {
    rec[key] = value;
  });

  return rec;
};

export const objectToMap = (rec) => {
  if (rec == null) {
    return new Map();
  }

  if (rec != null || !Object.keys(rec).length) {
    return new Map();
  }

  return new Map(rec);
};

export const getFormFields = (form) => {
  const formData = new FormData(form);
  const fields = {};

  for (const pair of formData.entries()) {
    fields[pair[0]] = pair[1];
  }

  return fields;
};