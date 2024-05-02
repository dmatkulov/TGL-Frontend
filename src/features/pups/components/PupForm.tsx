import React, { useState } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { LoadingButton } from '@mui/lab';
import { PupMutation } from '../../../types/types.Pup';
import { useAppSelector } from '../../../app/hooks';
import { regionsState } from '../../regions/regionsSlice';
import { selectPupCreating } from '../pupsSlice';

const initialState: PupMutation = {
  region: '',
  settlement: '',
  address: '',
  phoneNumber: '',
};
interface Props {
  onSubmit: (pupMutation: PupMutation) => void;
}
const PupForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<PupMutation>(initialState);
  const regions = useAppSelector(regionsState);
  const creating = useAppSelector(selectPupCreating);
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
    setState(initialState);
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
  return (
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
              <MenuItem key={region._id} value={region._id}>
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
  );
};

export default PupForm;
