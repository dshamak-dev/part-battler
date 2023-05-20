import API from "../model/api.model.js";

const userApi = new API({ category: 'users' });

export const getCachedUser = async () => {
  const users = await userApi.get();
  const user = Object.values(users).shift();

  return user;
};

export const getUser = (userId) => {
  return userApi.get(userId);
};

export const addUser = (userId, json) => {
  return userApi.post(userId, json);
};

export const updateUser = (userId, json) => {
  return userApi.update(userId, json);
};

export const deleteUser = (userId) => {
  return userApi.delete(userId);
};
