import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  companyAddressState,
  isCompanyAddressesCreating,
  isCompanyAddressesLoading,
} from './companyAddressesSlice';
import CompanyAddressesItem from './components/CompanyAddressesItem';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  fetchCompanyAddresses,
  uploadCompanyAddress,
} from './companyAddressThunks';
import { CompanyAddressMutation } from '../../types/types.CompanyAddress';
import { LoadingButton } from '@mui/lab';

const initialState: CompanyAddressMutation = {
  address: '',
  city: '',
  postCode: '',
  district: '',
};
const CompanyAddresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(companyAddressState);
  const isLoading = useAppSelector(isCompanyAddressesLoading);
  const isCreating = useAppSelector(isCompanyAddressesCreating);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CompanyAddressMutation>(initialState);

  useEffect(() => {
    dispatch(fetchCompanyAddresses());
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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(uploadCompanyAddress(state));
    setState(initialState);
    setOpen(false);
  };

  let content;

  if (addresses.length < 1) {
    content = <Typography>Нет доступных адресов</Typography>;
  } else {
    content = (
      <Box>
        {addresses.map((item) => (
          <CompanyAddressesItem
            key={item._id}
            address={item.address}
            city={item.city}
            _id={item._id}
            district={item.district}
            postCode={item.postCode}
          />
        ))}
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleClickOpen}>
          Добавить адрес
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>Новый адрес:</DialogTitle>
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
                    required
                    name="address"
                    label="Адрес"
                    type="text"
                    value={state.address}
                    onChange={inputChangeHandler}
                  ></TextField>
                  <TextField
                    fullWidth
                    required
                    name="city"
                    label="Город"
                    type="text"
                    value={state.city}
                    onChange={inputChangeHandler}
                  ></TextField>
                  <TextField
                    fullWidth
                    required
                    name="postCode"
                    label="Индекс"
                    type="text"
                    value={state.postCode}
                    onChange={inputChangeHandler}
                  ></TextField>
                  <TextField
                    fullWidth
                    required
                    name="district"
                    label="Район"
                    type="text"
                    value={state.district}
                    onChange={inputChangeHandler}
                  ></TextField>
                </Grid>

                <Grid item xs>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isCreating}
                    loading={isCreating}
                  >
                    Добавить
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Box>

      {isLoading ? <CircularProgress /> : content}
    </>
  );
};

export default CompanyAddresses;
