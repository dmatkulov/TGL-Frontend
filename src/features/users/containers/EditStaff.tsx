import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import { selectGetStaffLoading, selectStaff } from '../usersSlice';
import { getStaff, updateStaff } from '../usersThunks';
import { IStaff } from '../../../types/types';
import { CircularProgress, Grid } from '@mui/material';
import AddStaffForm from '../components/AddStaffForm';

const EditStaff: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const staff = useSelector(selectStaff);
  const isFetching = useSelector(selectGetStaffLoading);

  const doFetchOne = useCallback(async () => {
    try {
      await dispatch(getStaff(id)).unwrap();
    } catch (e) {
      navigate('/404');
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
      region: staff.region,
      pupID: staff.pupID,
      role: staff.role,
    };

    form = (
      <AddStaffForm isEdit onSubmit={onFormSubmit} existingStaff={mutation} />
    );
  }
  return <Grid container>{form}</Grid>;
};

export default EditStaff;
