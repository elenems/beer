'use client'
import { deleteProduct as deleteProductAction } from '@/app/_api/actions/products'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { ModalContext } from '../Modal/Modal'
import { useRouter } from 'next/navigation'

const deleteProduct = async (productId, setOpen, router) => {
  try {
    const message = await deleteProductAction(productId);
    router.refresh();
    alert(message);
    setOpen(false)
  } catch (e) {
    alert(e);
  }
}

export default function DeleteProductConfirm({ id }) {
  const { setOpen } = useContext(ModalContext);

  const router = useRouter();

  return (
    <div>
      <Button onClick={e => deleteProduct(id, setOpen, router)}>Підтвердити</Button>
    </div>
  )
}
