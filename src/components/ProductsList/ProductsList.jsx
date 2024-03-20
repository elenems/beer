'use client'
import { Typography, Box, Grid, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from 'react';
import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import DeleteProductConfirm from '../DeleteProductConfirm/DeleteProductConfirm';
import { toggleIsStar } from '@/app/_api/actions/products';
import { useRouter } from 'next/navigation';

async function starProduct(id, value, router) {
  try {
    const message = await toggleIsStar(id, value)
    router.refresh();
    alert(message)
  } catch (e) {
    alert(e)
  }
}

const ProductsList = ({ products }) => {
  const router = useRouter();

  return (
    <Grid container flexDirection="row">
      {products?.map((product) => (
        <Grid
          item
          key={product.id}
          xs={3}
          sx={{
            margin: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ marginBottom: '1rem' }}>
            <Grid
              item
              key={product.id}
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Box gap={2} sx={{ flexDirection: 'row', display: 'flex' }}>
                <Typography variant="body2">Price: {product.price}</Typography>
                <Typography variant="body2">
                  Specail price: {product.specialPrice}
                </Typography>
              </Box>
              <Typography variant="body2">
                Package Type: {product.packageType}
              </Typography>
              <Box gap={2} sx={{ flexDirection: 'row', display: 'flex' }}>
                <Typography variant="body2">
                  Alcohol: {product.alcohol}
                </Typography>
                <Typography variant="body2">IBU: {product.ibu}</Typography>
                <Typography variant="body2">OG: {product.og}</Typography>
              </Box>
              <Box gap={2} sx={{ flexDirection: 'row', display: 'flex' }}>
                <Typography variant="body2">
                  Hoppyness: {product.hoppyness}
                </Typography>
                <Typography variant="body2">
                  Bitterness: {product.vitternes}
                </Typography>
                <Typography variant="body2">
                  Sweetness: {product.sweetness}
                </Typography>
              </Box>
              <Box gap={2} sx={{ flexDirection: 'row', display: 'flex' }}>
                <Typography variant="body2">
                  Sourness: {product.sourness}
                </Typography>
                <Typography variant="body2">
                  Maltiness: {product.maltiness}
                </Typography>
              </Box>
              <Typography variant="body2">Color: {product.color}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="body2">
                Ingredients: {product.ingredients}
              </Typography>
              <Box sx={{ marginTop: '1rem' }}>
                <Modal actionText="Оновити">
                  <ProductForm
                    data={product}
                    method="PUT"
                    actionText="Оновити"
                  />
                </Modal>
                <Modal actionText="Видалити">
                  <DeleteProductConfirm id={product.id} />
                </Modal>
                <Button
                  sx={{ marginX: '0.5rem' }}
                  variant="contained"
                  onClick={() =>
                    starProduct(product.id, +!product.isStar, router)
                  }
                >
                  {Boolean(product.isStar) ? <StarIcon /> : <StarBorderIcon />}
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;

{
  /* <Box>
<Modal actionText="Видалити">
  <DeleteProductConfirm id={product.id} />
</Modal>
<Modal actionText="Оновити">
  <ProductForm data={product} method="PUT" actionText="Оновити" />
</Modal>
</Box> */
}
