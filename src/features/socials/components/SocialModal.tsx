import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { SocialData } from '../../../types/types.SocialsNetwork';
import { isPostLoadingSocials, selectSocial } from '../socialsSlice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { createSocials, fetchOneSocial, fetchSocials } from '../socialsThunk';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  edit: boolean;
  onClose: () => void;
  setEdit: () => void;
  id: string;
  initialSocial?: SocialData;
  existingImage?: string | null;
}

const initialState = {
  name: '',
  link: '',
  image: null,
};

const SocialModal: React.FC<Props> = ({ open, edit, onClose, setEdit, id }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isPostLoadingSocials);
  const social = useAppSelector(selectSocial);
  const [state, setState] = useState<SocialData>(initialState);
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    if (edit) {
      dispatch(fetchOneSocial(id));
    }
  }, [dispatch, edit, id]);

  useEffect(() => {
    if (social) {
      setState(social);
      if (social.image) {
        setExistingImage(social?.image);
      }
    }
  }, [social]);

  useEffect(() => {
    if (!open) {
      setState(initialState);
    }
  }, [open]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClose = () => {
    onClose();
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(createSocials(state)).unwrap();
    setEdit();
    handleClose();
    await dispatch(fetchSocials());
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const selectedFilename = useMemo(() => {
    if (state.image instanceof File) {
      return state.image.name;
    } else if (state.image === 'delete') {
      return undefined;
    } else if (existingImage) {
      return existingImage;
    }
  }, [state.image, existingImage]);

  const onImageClear = () => {
    setState((prev) => ({
      ...prev,
      image: 'delete',
    }));
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        <Typography>
          {edit ? 'Обновить cоциальную сеть' : 'Добавить социальную сеть'}
        </Typography>
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
        <form autoComplete="off" onSubmit={onFormSubmit}>
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
                filename={selectedFilename}
                onClear={onImageClear}
              />
            </Grid>
            <Grid item xs>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                loading={loading}
              >
                {edit ? 'Обновить' : 'Добавить'}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SocialModal;
