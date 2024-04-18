import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Container, Grid, TextField, Typography,} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Warehouse} from '../../../types/types.Warehouses';
import {useAppDispatch} from '../../../app/hooks';


const WarehouseForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const [state, setState] = useState<Warehouse>({
    name: '',
    address: '',
    phoneNumber: ''
  });


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };


  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Добавить склад
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{mt: 3, width: '100%'}}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid container item xs={12} sm={6} direction="row" spacing={2} sx={{margin: 'auto'}}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="name"
                  type="text"
                  value={state.name}
                  autoComplete="new-name"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="address"
                  label="address"
                  type="text"
                  value={state.address}
                  autoComplete="new-address"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="phoneNumber"
                  label="phoneNumber"
                  type="text"
                  value={state.phoneNumber}
                  autoComplete="new-phoneNumber"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <LoadingButton
                type={'submit'}
                variant="contained"
                sx={{marginTop: 1, marginLeft: 2, width: 690}}
              >
                Сохранить
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default WarehouseForm;
