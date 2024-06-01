import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  TextField,
} from '@mui/material';
import { Banned } from '../../types/types.Banned';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Edit, Remove } from '@mui/icons-material';
import { deleteBanned, fetchBanned } from './bannedThunks';

interface Props {
  banned: Banned;
  editFn: (value: Banned) => void;
}
const BannedItem: FC<Props> = ({ banned, editFn }) => {
  const { _id, name } = banned;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const permit = user?.role === 'admin' || user?.role === 'super';

  const [inputData, setInputData] = useState<string>(name);
  const [open, setOpen] = React.useState(false);

  const editHandler = () => {
    editFn(banned);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const deleteData = async () => {
    setOpen(false);
    await dispatch(deleteBanned(_id));
    dispatch(fetchBanned());
  };

  const buttonGroup = (
    <Box display={permit ? 'block' : 'none'}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Удалить {name}?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={deleteData} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={editHandler}
        variant="contained"
        startIcon={<Edit />}
        sx={{ marginLeft: '8px', marginRight: '8px' }}
      />
      <Button
        onClick={handleOpen}
        variant="contained"
        color="error"
        startIcon={<Remove />}
      />
    </Box>
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const input = <TextField onChange={changeHandler} value={inputData} />;

  return (
    <ListItem>
      {permit ? input : name}
      {buttonGroup}
    </ListItem>
  );
};

export default BannedItem;
