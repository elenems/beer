'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

async function encryptPassword(password) {
  let password_hash = ''
  if(password) {
    password_hash = await bcrypt.hash(password, 10)
  }
  return password_hash
}

export const getUsers = async () => {
  try {
    const { rows } = await sql`SELECT * from users`;
    return rows
  } catch (e) {
    throw e
  }
}

export const updateUser = async ({ name, password, userId }) => {
  try {
    const password_hash = await encryptPassword(password);
    name && await sql`
      UPDATE users
      SET username = ${name}
      WHERE id = ${userId};
    `;
    password_hash && await sql`
      UPDATE users
      SET password_hash = ${password_hash}
      WHERE id = ${userId};
    `;
    return 'User updated successfully';
  } catch (e) {
    throw e;
  }
};

export const addUser = async ({ name, password }) => {
  try {
    const password_hash = await encryptPassword(password);
    
    await sql`
      INSERT INTO users (username, password_hash, user_role)
      VALUES (${name}, ${password_hash}, 2)
    `;
    
    return 'User added successfully';
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async (id) => {
  try {
    await sql`
      DELETE FROM users
      WHERE id = ${id};
    `;
    return 'User deleted successfully';
  } catch (e) {
    throw e;
  }
};