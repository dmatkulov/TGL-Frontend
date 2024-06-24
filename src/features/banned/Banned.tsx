import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { bannedState, isBannedLoading } from './bannedSlice';
import { Banned as BannedInterface } from '../../types/types.Banned';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  TextField,
  Typography,
} from '@mui/material';
import BannedItem from './BannedItem';
import React, { useEffect, useState } from 'react';
import { fetchBanned, updateBanned, uploadBanned } from './bannedThunks';
import { selectUser } from '../users/usersSlice';

const Banned = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isBannedLoading);
  const state = useAppSelector(bannedState);
  const isEmpty = state.length < 1;
  const user = useAppSelector(selectUser);

  const [inputData, setInputData] = useState<string>('');

  const editFn = async (value: BannedInterface) => {
    await dispatch(updateBanned(value));
    dispatch(fetchBanned());
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchBanned());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let content;

  const dialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          await dispatch(uploadBanned(inputData));
          dispatch(fetchBanned());
          setInputData('');
          handleClose();
        },
      }}
    >
      <DialogTitle>Добавить товар или категорию товаров</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Здесь инструкция для сотрудников если нужна
        </DialogContentText>
        <TextField
          onChange={inputChangeHandler}
          value={inputData}
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Название"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );

  const addBtn = (
    <Button
      variant="contained"
      onClick={handleClickOpen}
      sx={{ marginTop: '8px', marginBottom: '30px' }}
    >
      Добавить
    </Button>
  );
  if (isLoading) {
    content = <CircularProgress />;
  } else if (isEmpty) {
    content = (
      <>
        <Typography>
          Товаров или категорий запрещенных к ввозу не найдено
        </Typography>
        {dialog}
        {user && (user?.role === 'admin' || user?.role === 'super') && addBtn}
      </>
    );
  } else {
    content = (
      <>
        <Alert severity="error" sx={{ marginTop: '8px', marginBottom: '32px' }}>
          Товары и категории товаров частично или полностью запрещенные к ввозу
          на территорию КР
        </Alert>
        <List dense={true}>
          {state.map((item) => (
            <BannedItem key={item._id} banned={item} editFn={editFn} />
          ))}
        </List>
        {dialog}
        {user && (user?.role === 'admin' || user?.role === 'super') && addBtn}
      </>
    );
  }

  return content;
};

export default Banned;
