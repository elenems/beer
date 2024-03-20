'use server'
import ProductForm from "@/components/ProductForm/ProductForm";
import ProductsList from "@/components/ProductsList/ProductsList";
import { Box } from "@mui/material";

import { Typography } from "@mui/material";
import { getProducts as getProductsAction } from "../_api/actions/products";
import Modal from "@/components/Modal/Modal";

async function getProducts() {
  try {
    const products = await getProductsAction()
    return products;
  } catch (e) {
    console.log(e)
  }
}

export default async function Admin() {
  const products = await getProducts();

  return (
    <Box>
      <Modal actionText="Додати продукт">
        <ProductForm />
      </Modal>
      <br />
      <Typography variant="h4" sx={{ marginY: '1rem' }}>
        Продукти
      </Typography>
      <ProductsList products={products?.data} />
    </Box>
  );
}
