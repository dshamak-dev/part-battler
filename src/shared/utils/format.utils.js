export const numberToText = (value = 0, minCharsNum = 1) => {
  const valueCharsLength = String(value).length;
  const charsToAdd = minCharsNum - valueCharsLength;

  if (charsToAdd <= 0) {
    return String(value);
  }

  return [...new Array(charsToAdd).fill(0), value].join("");
};