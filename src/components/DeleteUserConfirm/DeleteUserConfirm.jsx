'use client'
import { deleteUser as deleteUserAction } from '@/app/_api/actions/users';
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { ModalContext } from '../Modal/Modal';
import { useRouter } from 'next/navigation';

async function deleteUser(id, setOpen, router) {
  try {
    const message = await deleteUserAction(id);
    router.refresh()
    alert(message)
    setOpen(false)
  } catch (e) {
    alert(e)
  }
}

export default function DeleteUserConfirm({ id }) {
  const { setOpen } = useContext(ModalContext);
  const router = useRouter();

  return (
    <div>
      <Button onClick={e => deleteUser(id, setOpen, router)}>Підтвердити</Button>
    </div>
  )
}
