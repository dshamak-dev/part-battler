import API from "../model/api.model.js";

const api = new API({ category: 'players' });

export const getAllPlayers = async () => {
  const list = await api.get();

  return list || [];
};

export const getUser = (id) => {
  return api.get(id);
};

export const addUser = (id, json) => {
  return api.post(id, json);
};

export const updatePlayer = (id, json) => {
  return api.update(id, json);
};

export const deletePlayer = (id) => {
  return api.delete(id);
};
