const chars =
  "A aB bC cD dE eF fG gH hI iJ jK kL lM mN nO oP pQ qR rS sT tU uV vW wX xY yZ z"
    .replace(/\s/g, "")
    .split("");

export const generateId = (length = 4, useChars = false) => {
  const maxValue = useChars ? chars.length : 10;

  const rand = new Array(length)
    .fill(null)
    .map(() => getRandom(0, maxValue, true));

  if (useChars) {
    return rand.map((it) => chars[it]).join("");
  }

  return Number(rand.join(""));
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

  if (rec == null || !Object.keys(rec).length) {
    return new Map();
  }
  const entries = Object.entries(rec);

  return new Map(entries);
};

export const getFormFields = (form) => {
  const formData = new FormData(form);
  const fields = {};

  for (const pair of formData.entries()) {
    fields[pair[0]] = pair[1];
  }

  return fields;
};
