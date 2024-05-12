import { Pup, PupMutation } from '../../../types/types.Pup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { editPup, fetchPups } from '../pupsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import PupForm from './PupForm';
import { selectUser } from '../../users/usersSlice';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  pupItem: Pup;
}

const PupItem: React.FC<Props> = ({ pupItem }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = async (state: PupMutation) => {
    await dispatch(
      editPup({ pupId: pupItem._id, pupMutation: state }),
    ).unwrap();
    await dispatch(fetchPups());
    setOpen(false);
  };

  const pupMutation: PupMutation = {
    region: pupItem.region._id,
    settlement: pupItem.settlement,
    address: pupItem.address,
    phoneNumber: pupItem.phoneNumber.toString(),
  };

  return (
    <Grid m={1}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" component="div">
              {pupItem.name}
            </Typography>
            {user && user?.role === 'super' && (
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={toggleOpen}
              >
                Редактировать
              </Button>
            )}
          </Box>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            <b>Адрес:</b> {pupItem.region.name} {pupItem.settlement}{' '}
            {pupItem.address}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            <b>Тел:</b> +{pupItem.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
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
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          <PupForm
            onSubmit={submitFormHandler}
            initialPupState={pupMutation}
            isEdit
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default PupItem;
