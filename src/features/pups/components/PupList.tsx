import {selectPupCreating, selectPups, selectPupsLoading} from '../pupsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import React, {useEffect, useState} from 'react';
import {createPup, fetchPups} from '../pupsThunks';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import PupItem from './PupItem';
import {PupMutation} from "../../../types/typePup";
import {appRoutes, regions} from '../../../utils/constants';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {LoadingButton} from '@mui/lab';

const initialState: PupMutation = {
  region: '',
  settlement: '',
  address: '',
  phoneNumber: '',
};
const PupList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPupsLoading);
  const pups  = useAppSelector(selectPups);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<PupMutation>(initialState);
  const creating = useAppSelector(selectPupCreating);

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handlePhoneChange = (value: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createPup(state)).unwrap();
    navigate(appRoutes.address);
    setState(initialState);
  };


  return (
    <>
      {loading && <CircularProgress />}
      <Stack>
        {user?.role === 'admin' || user?.role === 'manager' || user?.role === 'super' && (
          <Grid item>
            <Button onClick={handleClickOpen}>Добавить склад</Button>
          </Grid>
        )}
        {pups.map((pup) => (
          <PupItem
            key={pup._id}
            pupItem={pup}
          />
        ))}
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>Новый склад:</DialogTitle>
          <DialogContent
            sx={{
              mt: '20px',
            }}
          >
            <form autoComplete="off" onSubmit={submitFormHandler}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} container gap={'10px'}>
                    <TextField
                      fullWidth
                      select
                      required
                      name="region"
                      label="Регион"
                      type="text"
                      value={state.region}
                      autoComplete="new-region"
                      onChange={inputChangeHandler}
                    >
                      <MenuItem value="" disabled>
                        Выберите регион
                      </MenuItem>
                      {regions.map((region) => (
                        <MenuItem key={region.id} value={region.name}>
                          {region.name}
                        </MenuItem>
                      ))}
                    </TextField>

                  <TextField
                    fullWidth
                    id="settlement"
                    label="Населенный пункт"
                    value={state.settlement}
                    onChange={inputChangeHandler}
                    name="settlement"
                    required
                  />

                  <TextField
                    fullWidth
                    id="address"
                    label="Адрес"
                    value={state.address}
                    onChange={inputChangeHandler}
                    name="address"
                    required
                  />

                  <PhoneInput
                    country="kg"
                    masks={{ kg: '(...) ..-..-..' }}
                    onlyCountries={['kg']}
                    containerStyle={{ width: '100%' }}
                    value={state.phoneNumber}
                    onChange={handlePhoneChange}
                    specialLabel="Номер телефона"
                    disableDropdown
                    inputStyle={{ width: '100%' }}
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={creating}
                    loading={creating}
                  >
                    Добавить
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};

export default PupList;