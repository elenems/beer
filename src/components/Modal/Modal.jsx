'use client';
import React, { useState, createContext } from 'react';
import { Button, Box, Modal as MUIModal } from '@mui/material';

export const ModalContext = createContext()

const Modal = ({ children, actionText = 'Open' }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <Button sx={{ marginX: '0.5rem' }} variant="contained" onClick={handleOpen}>{actionText}</Button>
      <MUIModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1200,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 8,
            overflow: 'auto',
            maxHeight: '80vh',
          }}
        >
          {children}
        </Box>
      </MUIModal>
    </ModalContext.Provider>
  );
};

export default Modal;
