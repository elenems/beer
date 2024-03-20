'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box } from '@mui/material';
import { addProduct as addProductAction, updateProduct as updateProductAction } from '@/app/_api/actions/products';
import { ModalContext } from '../Modal/Modal';

const actions = {
  'PUT': updateProductAction,
  'POST': addProductAction
}

const addProduct = async (e, method = 'POST', { ...args }, setOpen, router) => {
  e.preventDefault();
  if (Object.values(args).some((arg) => !arg)) {
    alert('Заповніть всі поля!');
    return;
  }

  try {
    const message = await actions[method]({
      ...args,
    });
    router.refresh();
    alert(message);
    setOpen(false)
  } catch (e) {
    alert(e)
    // callback(e)
  }
};

const ProductForm = ({ data, method="POST", actionText="Відправити" }) => {
  const router = useRouter();
  const { setOpen } = useContext(ModalContext);
  const [product, setProduct] = useState({
    name: data?.name || '',
    description: data?.description || '',
    price: data?.price || 0,
    specialPrice: data?.specialPrice || 0,
    packageType: data?.packageType || '',
    alcohol: data?.alcohol || 0,
    ibu: data?.ibu || 0,
    og: data?.og || 0,
    hoppyness: data?.hoppyness || 0,
    bitternes: data?.bitternes || 0,
    sweetness: data?.sweetness || 0,
    sourness: data?.sourness || 0,
    maltiness: data?.maltiness || 0,
    color: data?.color || '',
    ingredients: data?.ingredients || '',
  });
  
  const handleChange = (e) => {
    console.log(e.target.name)
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  

  return (
    <>
      <Box
        component="form"
        onSubmit={(e) =>
          addProduct(
            e,
            method,
            {
              ...product,
              id: data?.id,
            },
            setOpen,
            router,
          )
        }
        gap={4}
        sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}
      >
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          type="number"
          name="price"
          InputProps={{ inputProps: { step: '0.01' } }}
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          label="Special Price"
          type="number"
          name="specialPrice"
          InputProps={{ inputProps: { step: '0.01' } }}
          value={product.specialPrice}
          onChange={handleChange}
        />
        <TextField
          label="Package Type"
          name="packageType"
          value={product.packageType}
          onChange={handleChange}
        />
        <TextField
          label="Alcohol"
          name="alcohol"
          value={product.alcohol}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="IBU"
          name="ibu"
          value={product.ibu}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="OG"
          value={product.og}
          name="og"
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Hoppyness"
          name="hoppyness"
          value={product.hoppyness}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Bitternes"
          name="bitternes"
          value={product.bitternes}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Sweetness"
          name="sweetness"
          value={product.sweetness}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Sourness"
          name="sourness"
          value={product.sourness}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Maltiness"
          name="maltiness"
          value={product.maltiness}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Color"
          name='color'
          value={product.color}
          onChange={handleChange}
        />
        <TextField
          label="Ingredients"
          name="ingredients"
          value={product.ingredients}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          {actionText}
        </Button>
      </Box>
    </>
  );
};

export default ProductForm;
