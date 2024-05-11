import React, {useState} from 'react';
import { Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';
import FileInput from '../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createSocials } from './socialsThunk';
import { SocialData } from '../../types/types.SocialsNetwork';
import { isPostLoadingSocials } from './socialsSlice';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';

const SocialsForm:React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isPostLoadingSocials);
  const navigate = useNavigate();
  const [state, setState] = useState<SocialData>({
    link: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createSocials(state)).unwrap();
      setState((prevState) => {
        return {
          ...prevState,
          link: '',
        };
      });
      navigate(appRoutes.socials);
    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };
  return (
    <Container maxWidth="sm">
      <Box>
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
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
            <Grid item xs>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained">
                {loading ? <CircularProgress /> : 'Добавить социальную сеть'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SocialsForm;