import React from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import AddStaffForm from '../components/AddStaffForm';
import { createStaff } from '../usersThunks';
import { IStaff } from '../../../types/types.User';

const AddStaff: React.FC = () => {
  const dispatch = useAppDispatch();
  const onFormSubmit = async (staffMutation: IStaff) => {
    try {
      await dispatch(createStaff(staffMutation)).unwrap();
    } catch {
      //
    }
  };
  return (
    <Grid component="main">
      <AddStaffForm onSubmit={onFormSubmit} />
    </Grid>
  );
};

export default AddStaff;
