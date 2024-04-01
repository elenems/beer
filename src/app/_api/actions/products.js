'use server'
import { sql } from '@vercel/postgres';

export const deleteProduct = async (productId) => {
  try {
    await sql`
      DELETE FROM products
      WHERE id = ${productId}
    `;
    return 'Product deleted successfuly';
  } catch (e) {
    throw e;
  }
};

export const updateProduct = async ({ id, ...args }) => {
  try {
    await sql`
      UPDATE products
      SET ${sql(args, 'title', 'description', 'price')}
      WHERE id = ${id}
    `;
    return 'Product updated successfully';
  } catch (e) {
    throw e;
  }
};

export const addProduct = async ({ ...args }) => {
  try {
    await sql`
      INSERT INTO products ${sql(args, 'title', 'description', 'price')}
    `;
    return 'Product added successfully';
  } catch (e) {
    throw e;
  }
};

export const getProducts = async () => {
  try {
    const products = await sql`
      SELECT * FROM products
    `;
    return products;
  } catch (e) {
    throw e;
  }
}

export const toggleIsStar = async (id, value) => {
  try {
    await sql`
      UPDATE products
      SET is_star = ${value}
      WHERE id = ${id}
    `;
    return 'Toggle is_star successful';
  } catch (e) {
    throw e;
  }
}