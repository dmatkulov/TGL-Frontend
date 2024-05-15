import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { LoadingButton } from '@mui/lab';
import { PupMutation } from '../../../types/types.Pup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { regionsState } from '../../regions/regionsSlice';
import { selectPupCreating, selectPupEditing } from '../pupsSlice';
import { fetchRegions } from '../../regions/regionsThunks';
import { selectRegisterError } from '../../users/usersSlice';

const initialState: PupMutation = {
  region: '',
  settlement: '',
  address: '',
  phoneNumber: '',
};

interface Props {
  onSubmit: (pupMutation: PupMutation) => void;
  initialPupState?: PupMutation;
  isEdit?: boolean;
  isCreate?: boolean;
}

const PupForm: React.FC<Props> = ({
  onSubmit,
  initialPupState = initialState,
  isEdit = false,
  isCreate = false,
}) => {
  const dispatch = useAppDispatch();
  const regions = useAppSelector(regionsState);
  const creating = useAppSelector(selectPupCreating);
  const error = useAppSelector(selectRegisterError);
  const editing = useAppSelector(selectPupEditing);
  const [state, setState] = useState<PupMutation>(initialPupState);
  const [disabled, setIsDisabled] = useState(true);
  const [phoneNumberLabel, setPhoneNumberLabel] = useState<string>('');
  // const [phoneNumberIsValid, setPhoneNumberIsValid] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.phoneNumber.length < 12) {
      setPhoneNumberLabel('Пропишите номер полностью');
      // setPhoneNumberIsValid(false);
      return;
    }
    onSubmit(state);
    setState(initialState);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      const updatedState = { ...prevState, [name]: value };
      updateDisabledState();
      return updatedState;
    });
  };
  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  const updateDisabledState = () => {
    const keys = Object.keys(state) as (keyof PupMutation)[];
    const allFieldsFilled = keys.every((key) => {
      return state[key].trim() !== '';
    });

    setIsDisabled(!allFieldsFilled);
  };
  const handlePhoneChange = (value: string) => {
    setState((prevState) => {
      const updateState = { ...prevState, phoneNumber: value };
      if (value.length < 11) {
        // setPhoneNumberIsValid(true);
        setPhoneNumberLabel('Номер должен быть введен полностью');
      } else if (value.length > 11) {
        // setPhoneNumberIsValid(true);
        setPhoneNumberLabel('');
      }

      if (state.phoneNumber.length === 11) {
        updateDisabledState();
      }

      return updateState;
    });
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item container xs gap={'13px'}>
          <Grid item xs={12} sx={{ marginTop: 1 }}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="settlement"
              label="Населенный пункт"
              value={state.settlement}
              onChange={inputChangeHandler}
              name="settlement"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Адрес"
              value={state.address}
              onChange={inputChangeHandler}
              name="address"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput
              country="kg"
              masks={{ kg: '(...) ..-..-..' }}
              onlyCountries={['kg']}
              containerStyle={{ width: '100%' }}
              value={state.phoneNumber}
              countryCodeEditable={false}
              onChange={handlePhoneChange}
              specialLabel="Номер телефона*"
              disableDropdown
              inputStyle={{
                width: '100%',
              }}
              inputProps={{
                name: 'phoneNumber',
                required: true,
              }}
            />
            {getFieldError('phoneNumber') ? (
              <Typography
                sx={{
                  fontSize: '12px',
                  ml: '14px',
                  mt: '4px',
                  color: '#d32f2f',
                }}
              >
                {getFieldError('phoneNumber')}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: '12px',
                  ml: '14px',
                  mt: '4px',
                  color: '#d32f2f',
                }}
              >
                {phoneNumberLabel}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs>
          {isEdit && (
            <LoadingButton
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={editing}
              loading={editing}
            >
              Редактировать
            </LoadingButton>
          )}
          {isCreate && (
            <LoadingButton
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={disabled || creating}
              loading={creating}
            >
              Добавить
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default PupForm;
