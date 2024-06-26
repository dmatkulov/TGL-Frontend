import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import StaffForm from '../components/StaffForm';
import { IStaff } from '../../../types/types.User';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IStaff) => void;
}
const AddStaff: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{}}>
        <StaffForm onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddStaff;
