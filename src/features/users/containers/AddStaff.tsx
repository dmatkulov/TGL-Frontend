import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import StaffForm from '../components/StaffForm';
import { createStaff } from '../usersThunks';
import { IStaff } from '../../../types/types.User';

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddStaff: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const onFormSubmit = async (staffMutation: IStaff) => {
    try {
      await dispatch(createStaff(staffMutation)).unwrap();
    } catch {
      //
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{}}>
        <StaffForm onSubmit={onFormSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddStaff;
