'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRE_TIME = '1d';

async function verifyPassword (password, user) {
  const isValidPassword = user && (await bcrypt.compare(password, user?.password_hash));
  return isValidPassword
}

export const login = async (username, password) => {
  try {
    const results = await sql`SELECT * FROM users WHERE username = ${username}`;
    const user = results.rows[0];
    if(!user) throw 'Incorect credentials'
    const isValidPassword = await verifyPassword(password, user);
    if (!isValidPassword) {
      throw 'Invalid credentials';
    }
    const token = jwt.sign(
      { username, userRole: user.user_role },
        process.env.SECRET_KEY,
      { expiresIn: TOKEN_EXPIRE_TIME },
    );

    cookies().set('token', token)
  } catch (e) {
    throw e;
  }
}