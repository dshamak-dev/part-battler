import { databaseType } from "../../../namespaces/db/const/db.const.js";
import API from "../model/api.model.js";

const cacheStorageKey = 'last-user';
const userApi = new API({ category: databaseType.user });

// replace with last game cache
export const getCachedUser = async () => {
  const userId = localStorage.getItem(cacheStorageKey);

  if (userId == null) {
    return null;
  }

  return getUser(userId);
};

export const getUser = async (userId) => {
  return userApi.get(userId);
};

export const signInUser = async (userId, json) => {
  let user = await getUser(userId);

  if (user == null) {
    user = await userApi.post(userId, json);
  }

  localStorage.setItem(cacheStorageKey, user.id);

  return user;
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
