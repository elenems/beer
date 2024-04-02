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
  const {
    name,
    description,
    price,
    specialprice,
    packagetype,
    alcohol,
    ibu,
    og,
    hoppyness,
    bitterness,
    sweetness,
    sourness,
    maltiness,
    color,
    ingredients
   } = args

  try {
    await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, specialprice = ${specialprice}, packagetype = ${packagetype}, alcohol = ${alcohol}, ibu = ${ibu}, og = ${og}, hoppyness = ${hoppyness}, bitterness = ${bitterness}, sweetness = ${sweetness}, sourness = ${sourness}, maltiness = ${maltiness}, color = ${color}, ingredients = ${ingredients}
      WHERE id = ${id}
    `;
    return 'Product updated successfully';
  } catch (e) {
    throw e;
  }
};

export const addProduct = async ({ ...args }) => {
  const {
    name,
    description,
    price,
    specialprice,
    packagetype,
    alcohol,
    ibu,
    og,
    hoppyness,
    bitterness,
    sweetness,
    sourness,
    maltiness,
    color,
    ingredients
 } = args

  try {
    await sql`
    INSERT INTO products (name, description, price, specialprice, packagetype, alcohol, ibu, og, hoppyness, bitterness, sweetness, sourness, maltiness, color, ingredients)
    VALUES (${name}, ${description}, ${price}, ${specialprice}, ${packagetype}, ${alcohol}, ${ibu}, ${og}, ${hoppyness}, ${bitterness}, ${sweetness}, ${sourness}, ${maltiness}, ${color}, ${ingredients})
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
      ORDER BY id
    `;
    return products.rows;
  } catch (e) {
    throw e;
  }
}

export const toggleIsStar = async (id, value) => {
  try {
    await sql`
      UPDATE products
      SET isstar = ${value}
      WHERE id = ${id}
    `;
    return 'Success';
  } catch (e) {
    throw e;
  }
}