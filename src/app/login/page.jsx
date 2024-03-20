'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { login as loginAction } from '../_api/actions/auth';
import { useRouter } from 'next/navigation'

async function login(e, username, password, callback) {
  e.preventDefault();
  try {
    await loginAction(username, password);
    callback()
  } catch (e) {
    alert(e)
  }
}

export default function Login() {
  const router = useRouter()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box>
      <Typography sx={{ marginBottom: '2rem' }} variant="h2">
        Login
      </Typography>
      <form onSubmit={e => login(e, username, password, () => router.push('/admin'))}>
        <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'stretch' }}>
          <TextField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            sx={{ marginRight: '0.5rem' }}
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            sx={{ marginRight: '0.5rem' }}
          />
          <Button type="submit" variant="contained" color="primary" >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
