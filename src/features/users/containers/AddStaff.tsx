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
  // const dispatch = useAppDispatch();
  // const onFormSubmit = async (staffMutation: IStaff) => {
  //   try {
  //     await dispatch(createStaff(staffMutation)).unwrap();
  //   } catch {
  //     //
  //   }
  // };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{}}>
        <StaffForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddStaff;
