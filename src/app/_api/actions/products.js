'use server'
import { API_URL } from "@/config";
import { authFetch } from "../fetch";

export const deleteProduct = async (productId) => {
  try {
    const response = await authFetch(
      `/products/${productId}`,
      'DELETE',
    );
    const { message } = await response.json();
    return message;
  } catch (e) {
    throw e;
  }
};

export const updateProduct = async ({ id, ...args }) => {
  try {
    const response = await authFetch(
      `/products/${id}`,
      'PUT',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({ ...args }),
    );
    const { message } = await response.json();
    return message;
  } catch (e) {
    throw e;
  }
};

export const addProduct = async ({ ...args }) => {
  try {
    const response = await authFetch(
      '/products',
      'POST',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({ ...args }),
    );
    const { message } = await response.json();
    return message
  } catch (e) {
    throw e
  }
};

export const getProducts = async () => {
  try {
    const products = await fetch(`${API_URL}/products`)
    return products.json()
  } catch (e) {
    throw e
  }
}

export const toggleIsStar = async (id, value) => {
  try {
    const response = await authFetch(`/products/star/${id}?value=${value}`, 'POST')
    const { message } = await response.json();
    return message
  } catch (e) {
    throw e
  }
}