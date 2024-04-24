import React from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { IStaff } from '../../../types/types';
import AddStaffForm from '../components/AddStaffForm';

const AddStaff: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFormSubmit = async (cocktailMutation: IStaff) => {
    try {
      // await dispatch(createCocktail(cocktailMutation)).unwrap();
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
