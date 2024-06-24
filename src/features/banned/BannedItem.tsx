import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  ListItem,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Banned } from '../../types/types.Banned';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Edit, Remove } from '@mui/icons-material';
import { deleteBanned, fetchBanned } from './bannedThunks';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  banned: Banned;
  editFn: (value: Banned) => void;
}

const BannedItem: FC<Props> = ({ banned, editFn }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const permit = user?.role === 'admin' || user?.role === 'super';
  const [state, setState] = useState<Banned>(banned);
  const [open, setOpen] = React.useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:400px)');
  const editHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isToggled) {
      return;
    }
    if (state.name.trim() !== '') {
      editFn(state);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const deleteData = async () => {
    setOpen(false);
    await dispatch(deleteBanned(state._id));
    dispatch(fetchBanned());
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, name: e.target.value }));
    setIsToggled(true);
  };

  const form = (
    <Grid component="form" container spacing={1} onSubmit={editHandler}>
      <Grid item xs={12} sm={5}>
        <TextField
          required
          label="Товар"
          type="text"
          fullWidth
          size="small"
          name="name"
          onChange={changeHandler}
          value={state.name}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Stack direction="row" spacing={2} display={permit ? 'flex' : 'none'}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Удалить {state.name}?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button onClick={deleteData} autoFocus>
                Подтвердить
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="contained" startIcon={<Edit />} type="submit">
            Редактировать
          </Button>
          {isToggled ? (
            <Button
              onClick={() => {
                setIsToggled(false);
                setState(banned);
              }}
              color="warning"
              variant="text"
              startIcon={isLargeScreen && <CancelIcon />}
            >
              {isLargeScreen ? 'Отменить' : <CancelIcon />}
            </Button>
          ) : (
            <Button
              onClick={handleOpen}
              variant="contained"
              color="error"
              startIcon={isLargeScreen && <Remove />}
            >
              {isLargeScreen ? 'Удалить' : <Remove />}
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <ListItem sx={{ mb: 3 }} disablePadding>
      {permit ? form : state.name}
    </ListItem>
  );
};

export default BannedItem;
