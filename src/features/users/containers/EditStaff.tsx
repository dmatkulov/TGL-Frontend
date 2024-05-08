import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import { selectGetStaffLoading, selectStaff } from '../usersSlice';
import { updateStaff } from '../usersThunks';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import StaffForm from '../components/StaffForm';
import { IStaff } from '../../../types/types.User';
import { appRoutes } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const EditStaff: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const staff = useSelector(selectStaff);
  const isFetching = useSelector(selectGetStaffLoading);

  if (!staff) {
    navigate(appRoutes.notFound);
  }

  const onFormSubmit = async (userMutation: IStaff) => {
    if (staff) {
      dispatch(
        updateStaff({
          userId: staff._id,
          userMutation,
        }),
      );
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
      <StaffForm
        isEdit
        onSubmit={onFormSubmit}
        existingStaff={mutation}
        onClose={onClose}
      />
    );
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{}}>{form}</DialogContent>
    </Dialog>
  );
};

export default EditStaff;
