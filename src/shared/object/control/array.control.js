export const getNextArrayItem = (arr = [], targetItem) => {
  if (!Array.isArray(arr)) {
    return null;
  }

  let currentIndex = arr.findIndex(i => i === targetItem);

  if (currentIndex === -1) {
    return arr[0];
  }

  let length = arr.length;

  if (currentIndex >= length - 1) {
    return arr[0];
  }

  return arr[currentIndex + 1];
}

export const getPreviousArrayItem = (arr = [], targetItem) => {
  if (!Array.isArray(arr)) {
    return null;
  }

  let currentIndex = arr.findIndex(i => i === targetItem);

  if (currentIndex === -1) {
    return arr[0];
  }

  let length = arr.length;

  if (currentIndex <= 0) {
    return arr[length - 1];
  }

  return arr[currentIndex - 1];
}