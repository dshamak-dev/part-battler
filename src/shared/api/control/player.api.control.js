import API from "../model/api.model.js";

const api = new API({ category: 'players' });

export const getAllPlayers = async () => {
  const list = await api.get();

  return list || [];
};

export const getPlayer = (id) => {
  return api.get(id);
};

export const addPlayer = (id, json) => {
  return api.post(id, json);
};

export const updatePlayer = (id, json) => {
  return api.update(id, json);
};

export const deletePlayer = (id) => {
  return api.delete(id);
};
