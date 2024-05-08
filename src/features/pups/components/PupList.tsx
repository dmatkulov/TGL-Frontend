import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPups, selectPupsLoading } from '../pupsSlice';
import { createPup, fetchPups } from '../pupsThunks';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Stack,
} from '@mui/material';
import 'react-phone-input-2/lib/material.css';
import PupItem from './PupItem';
import { PupMutation } from '../../../types/types.Pup';
import { selectUser } from '../../users/usersSlice';
import PupForm from './PupForm';

const PupList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPupsLoading);
  const pups = useAppSelector(selectPups);
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = async (state: PupMutation) => {
    await dispatch(createPup(state)).unwrap();
    await dispatch(fetchPups());
    handleClose();
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
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogContent
            sx={{
              mt: '20px',
            }}>
            <PupForm onSubmit={submitFormHandler} isCreate />
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};

export default PupList;
