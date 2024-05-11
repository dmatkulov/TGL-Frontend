import React from 'react';
import { useSelector } from 'react-redux';
import { selectGetStaffLoading, selectStaff } from '../usersSlice';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import StaffForm from '../components/StaffForm';
import { IStaff } from '../../../types/types.User';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: IStaff) => void;
}

const EditStaff: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const staff = useSelector(selectStaff);
  const isFetching = useSelector(selectGetStaffLoading);

  const onFormSubmit = async (userMutation: IStaff) => {
    if (staff) {
      onSubmit(staff._id, userMutation);
      onClose();
    }
  };

  let form = <CircularProgress />;

  if (!isFetching && staff) {
    const mutation = {
      ...staff,
      region: staff.region._id,
      pupID: staff.pupID._id,
      role: staff.role,
    };

    form = (
      <StaffForm isEdit onSubmit={onFormSubmit} existingStaff={mutation} onClose={onClose}/>
    );
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{}}>{form}</DialogContent>
    </Dialog>
  );
};

export default EditStaff;
