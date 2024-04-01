import { getUsers as getUsersAction } from '@/app/_api/actions/users';
import React from 'react'
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { USERS_MAP } from './constants';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/components/UserForm/UserForm';
import DeleteUserConfirm from '@/components/DeleteUserConfirm/DeleteUserConfirm';

async function getUsers() {
  try {
    const users = await getUsersAction();
    return users;
  } catch (e) {
    console.log(e)
  }
}

export default async function page() {
  const users = await getUsers();

  return (
    <Box>
      <Modal actionText="Створити">
        <UserForm actionText="Створити" />
      </Modal>
      <List>
        {users?.map((user) => (
          <ListItem
            sx={{
              width: '25%',
              padding: '10px',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            key={user.id}
          >
            <ListItemText primary="Ім'я" secondary={user.username} />
            <ListItemText primary="Роль" secondary={USERS_MAP[user.user_role]} />
            <Box sx={{ display: 'flex' }}>
              {user.user_role !== 1 && (
                <Box sx={{ marginRight: '0.5rem' }}>
                  <Modal actionText="Видалити">
                    <DeleteUserConfirm id={user.id} />
                  </Modal>
                </Box>
              )}
              <Box>
                <Modal actionText="Редагувати">
                  <UserForm actionText="Редагувати" method="PUT" data={user} />
                </Modal>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
