import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPups, selectPupsLoading } from '../pupsSlice';
import { createPup, fetchPups } from '../pupsThunks';
import { Button, CircularProgress, Grid, Stack } from '@mui/material';
import 'react-phone-input-2/lib/material.css';
import PupItem from './PupItem';
import { PupMutation } from '../../../types/types.Pup';
import { appRoutes } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';
import { fetchRegions } from '../../regions/regionsThunks';
import AddPup from './AddPup';

const PupList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPupsLoading);
  const pups = useAppSelector(selectPups);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPups());
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = async (state: PupMutation) => {
    await dispatch(createPup(state)).unwrap();
    navigate(appRoutes.address);
  };

  return (
    <>
      {loading && <CircularProgress />}
      <Stack>
        {user?.role === 'super' && (
          <Grid item>
            <Button variant="contained" onClick={handleClickOpen}>
              Добавить склад
            </Button>
          </Grid>
        )}
        {pups.map((pup) => (
          <PupItem key={pup._id} pupItem={pup} />
        ))}
        <AddPup
          open={open}
          onSubmit={submitFormHandler}
          handleClose={handleClose}
        />
      </Stack>
    </>
  );
};

export default PupList;
