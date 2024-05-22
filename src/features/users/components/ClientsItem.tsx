import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from '@mui/material';
import { Client } from '../../../types/types.User';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, fetchClients } from '../usersThunks';
import { selectUser } from '../usersSlice';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';

const ClientsItem: FC<Client> = ({
  _id,
  address,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  region,
  settlement,
  pupID,
  email,
  marketId,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = async () => {
    await dispatch(deleteUser(_id));
    setOpen(false);
    dispatch(fetchClients());
  };
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">{marketId}</TableCell>
      <TableCell align="left">{firstName}</TableCell>
      <TableCell align="left">{lastName}</TableCell>
      <TableCell align="left">{middleName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{region.name}</TableCell>
      <TableCell align="left">{settlement}</TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{pupID.name}</TableCell>
      <TableCell align="left">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Подтвердите удаление
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены, что хотите удалить пользователя {firstName} {lastName}
              ? Все заказы клиента будут удалены.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Нет</Button>
            <LoadingButton onClick={handleAgree} autoFocus>
              Да
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Button
          onClick={handleClickOpen}
          disabled={isAdmin}
          startIcon={<DeleteIcon color="warning" />}
        />
      </TableCell>
    </TableRow>
  );
};

export default ClientsItem;
