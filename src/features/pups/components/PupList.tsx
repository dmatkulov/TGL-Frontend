import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPups, selectPupsLoading } from '../pupsSlice';
import { createPup, fetchPups } from '../pupsThunks';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import 'react-phone-input-2/lib/material.css';
import PupItem from './PupItem';
import { PupMutation } from '../../../types/types.Pup';
import { selectUser } from '../../users/usersSlice';
import PupForm from './PupForm';
import CloseIcon from '@mui/icons-material/Close';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
};

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

  let tableContent: React.ReactNode = <CircularProgress />;

  if (!loading) {
    tableContent = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер ПВЗ
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Адрес
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер телефона
              </TableCell>
              {user?.role === 'super' && (
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Изменить
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {pups.map((item) => (
              <PupItem key={item._id} pupItem={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <Stack>
        {user?.role === 'super' && (
          <Grid item sx={{ marginBottom: 3 }}>
            <Button variant="contained" onClick={handleClickOpen}>
              Добавить ПВЗ
            </Button>
          </Grid>
        )}
        {loading ? (
          <Box sx={styleBoxSpinner}>
            <CircularProgress size={100} />
          </Box>
        ) : (
          <Grid mt={2}>{tableContent}</Grid>
        )}
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>
            <Typography>Добавить ПВЗ:</Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: '20px' }}>
            <PupForm onSubmit={submitFormHandler} isCreate />
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};

export default PupList;
