import React from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { IStaff } from '../../../types/types';
import AddStaffForm from '../components/AddStaffForm';
import { createStaff } from '../usersThunks';

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
