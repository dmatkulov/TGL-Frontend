import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  isSocialUploading,
  singleSocialState,
  socialsState,
} from './socialsSlice';
import React, { useEffect, useState } from 'react';
import { addSocial, fetchSocials } from './socialsThunk';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import SocialsItem from './components/SocialsItem';
import FileInput from '../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { SocialMutation } from '../../types/types.SocialsNetwork';

const historyButtonEffect = {
  marginRight: '30px',
  border: '2px solid white',
  borderRadius: '10px',
  marginBottom: '10px',
};

enum StateStatus {
  edit = 'edit',
  add = 'add',
  initial = 'initial',
}

const initial: SocialMutation = {
  name: '',
  link: '',
  image: null,
};

const Socials = () => {
  const dispatch = useAppDispatch();
  const socials = useAppSelector(socialsState);
  const social = useAppSelector(singleSocialState);
  const isUploading = useAppSelector(isSocialUploading);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SocialMutation>(initial);
  const [toggleState, setToggleState] = useState<StateStatus>(
    StateStatus.initial,
  );
  const isImageEmpty = state.image === null;
  const isAddMode = toggleState === 'add';

  const toggleToAddMode = () => {
    setOpen(true);
    setToggleState((prevState) => {
      prevState = StateStatus.add;
      return prevState;
    });
  };

  const toggleToEditMode = (id: string) => {
    setOpen(true);
    setToggleState((prevState) => {
      prevState = StateStatus.edit;
      return prevState;
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setToggleState((prevState) => {
      prevState = StateStatus.initial;
      return prevState;
    });
    setState((prevState) => {
      prevState = initial;
      return prevState;
    });
  };

  useEffect(() => {
    dispatch(fetchSocials());
  }, [dispatch]);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (isAddMode) {
                await dispatch(addSocial(state));
                dispatch(fetchSocials());
              }
              handleClose();
            },
          }}
        >
          <DialogTitle>{isAddMode ? 'Добавить' : 'Редактировать'}</DialogTitle>
          <DialogContent>
            <DialogContentText mb={2}>Тут будет инструкция.</DialogContentText>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Введите название социальной сети"
                  name="name"
                  autoComplete="new-name"
                  value={state.name}
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  id="link"
                  label="Введите URL адрес"
                  name="link"
                  autoComplete="new-link"
                  value={state.link}
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <FileInput
                  label="Image"
                  name="image"
                  onChange={fileInputChangeHandler}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <LoadingButton
              type="submit"
              color="primary"
              loading={isUploading}
              disabled={isImageEmpty || isUploading}
              variant="contained"
            >
              Подтвердить
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          sx={historyButtonEffect}
          onClick={toggleToAddMode}
        >
          Добавить социальную сеть
        </Button>
        {socials.map((item) => (
          <SocialsItem
            id={item._id}
            key={item._id}
            name={item.name}
            link={item.link}
            image={item.image}
            editHandler={() => toggleToEditMode(item._id)}
          />
        ))}
      </Box>
    </>
  );
};

export default Socials;
