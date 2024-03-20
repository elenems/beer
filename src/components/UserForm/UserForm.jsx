'use client';
import { addUser, updateUser } from '@/app/_api/actions/users';
import { Box, Button, TextField } from '@mui/material';
import React, { useState, useContext } from 'react'
import { ModalContext } from '../Modal/Modal';
import { useRouter } from 'next/navigation';

const actions = {
  'PUT': updateUser,
  'POST': addUser
}

const handleUser = async (e, method = 'POST', { name, password, userId }, setOpen, router) => {
  e.preventDefault();
  if (method === 'POST' && (!name || !password)) {
    alert('Please fill in all fields');
    return;
  }

  if(password && password.length < 8) {
    alert('Пароль має бути не менше 8 символів');
    return;
  }


  try {
    const message = await actions[method]({ name, password, userId });
    router.refresh()
    alert(message);
    setOpen(false);
  } catch (e) {
    alert(e);
  }
};

export default function UserForm({ actionText = 'Створити', method="POST", data }) {
  const [name, setName] = useState(data?.username || '');
  const [password, setPassword] = useState('');

  const { setOpen } = useContext(ModalContext);
  const router = useRouter();

  return (
    <Box
      component="form"
      onSubmit={(e) =>
        handleUser(e, method, { name, password, userId: data?.id }, setOpen, router)
      }
      gap={4}
      sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained">
        {actionText}
      </Button>
    </Box>
  );
}
