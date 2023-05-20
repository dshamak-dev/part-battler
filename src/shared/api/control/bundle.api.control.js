import API from "../model/api.model.js";

const api = new API({ category: 'bundles' });

export const getAllBundles = async () => {
  const list = await api.get();

  return list || [];
};

export const getBundle = (id) => {
  return api.get(id);
};

export const addBundle = (id, json) => {
  return api.post(id, json);
};

export const updateBundle = (id, json) => {
  return api.update(id, json);
};

export const deleteBundle = (id) => {
  return api.delete(id);
};
