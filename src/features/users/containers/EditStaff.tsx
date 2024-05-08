import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import { selectGetStaffLoading, selectStaff } from '../usersSlice';
import { getStaff, updateStaff } from '../usersThunks';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import StaffForm from '../components/StaffForm';
import { IStaff } from '../../../types/types.User';
import { appRoutes } from '../../../utils/constants';

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
}

const EditStaff: React.FC<Props> = ({ open, onClose, id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const staff = useSelector(selectStaff);
  const isFetching = useSelector(selectGetStaffLoading);

  const doFetchOne = useCallback(async () => {
    try {
      await dispatch(getStaff(id)).unwrap();
    } catch (e) {
      navigate(appRoutes.notFound);
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

  const onFormSubmit = async (userMutation: IStaff) => {
    dispatch(
      updateStaff({
        userId: id,
        userMutation,
      }),
    );
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
