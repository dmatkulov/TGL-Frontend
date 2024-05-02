import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { PupMutation } from '../../../types/types.Pup';
import PupForm from './PupForm';

interface Props {
  open: boolean;
  onSubmit: (pupMutation: PupMutation) => void;
  handleClose: React.MouseEventHandler;
}
const AddPup: React.FC<Props> = ({ open = false, onSubmit, handleClose }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Новый склад</DialogTitle>
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          <PupForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPup;
