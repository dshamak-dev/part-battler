const screenStorageKey = "screen";

export const registerScreen = (screen) => {
  const json = screen.json;

  localStorage.setItem(screenStorageKey, JSON.stringify(json));
};

export const getRegistredScreen = () => {
  try {
    return JSON.parse(localStorage.getItem(screenStorageKey));
  } catch (err) {
    return null;
  }
};
