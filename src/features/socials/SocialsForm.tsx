
import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import FileInput from '../../components/FileInput/FileInput';
import { useAppSelector } from '../../app/hooks';
import {SocialData} from '../../types/types.SocialsNetwork';
import { isPostLoadingSocials } from './socialsSlice';

interface Props {
  onSubmit: (mutation: SocialData) => void;
  isEdit?: boolean;
  initialSocial?: SocialData;
  existingImage?: string | null;
}

const initialState = {
  name: '',
  link: '',
  image: null,
}
const SocialsForm:React.FC<Props> = ({ onSubmit, isEdit = false, initialSocial = initialState, existingImage }) => {
  const loading = useAppSelector(isPostLoadingSocials);
  const [state, setState] = useState<SocialData>(initialSocial);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(state);
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
    if(state.image instanceof File) {
      return state.image.name;
    } else if(state.image === 'delete') {
      return undefined;
    } else if(existingImage) {
      return  existingImage;
    }
  },[state.image, existingImage]);

  const onImageClear = () => {
    setState(prev => ({
      ...prev,
      image:'delete',
    }));
  };


  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" variant="h5" mb={2}>
          {isEdit ? 'Обновить cоциальную сеть' : 'Добавить социальную сеть'}
        </Typography>
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}>
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
                {isEdit ? 'Обновить' : 'Добавить'}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SocialsForm;
