'use server';

import { authFetch } from "../fetch"

export const getUsers = async () => {
  try {
    const users = await authFetch(`/users`)
    return users.json()
  } catch (e) {
    throw e
  }
}

export const updateUser = async ({ name, password, userId }) => {
  try {
    const response = await authFetch(
      `/users/${userId}`,
      'PUT',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({ name, password }),
    );
    const { message } = await response.json();
    return message;
  } catch (e) {
    throw e;
  }
};

export const addUser = async ({ name, password }) => {
  try {
    const response = await authFetch(
      '/users',
      'POST',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({ name, password }),
    );
    const { message } = await response.json();
    return message
  } catch (e) {
    throw e
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await authFetch(
      `/users/${id}`,
      'DELETE',
    );
    const { message } = await response.json();
    return message
  } catch (e) {
    throw e
  }
};