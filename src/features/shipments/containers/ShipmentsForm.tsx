import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createShipment } from '../shipmentsThunk';
import React, { useEffect, useState } from 'react';
import { ShipmentMutation } from '../../../types/types.Shipments';
import {
  addShipmentGetError,
  addShipmentGetLoad,
  selectShipmentEditing,
} from '../shipmentsSlice';
import InputAdornment from '@mui/material/InputAdornment';
import { selectPups, selectPupsLoading } from '../../pups/pupsSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { ShipmentStatus } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';

const initialState: ShipmentMutation = {
  userMarketId: '',
  trackerNumber: '',
  weight: '',
  pupId: '',
  status: '',
  dimensions: {
    height: '',
    width: '',
    length: '',
  },
};

interface Props {
  onSubmit?: (shipmentMutation: ShipmentMutation) => void;
  initialShipmentState?: ShipmentMutation;
  isEdit?: boolean;
}

const isInputValid = (marketIdString: string) => {
  const regex = /^\d{5}$/;
  return regex.test(marketIdString);
};

const ShipmentsForm: React.FC<Props> = ({
  onSubmit,
  initialShipmentState = initialState,
  isEdit = false,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ShipmentMutation>(initialShipmentState);
  const [marketIdValid, setMarketIdValid] = useState<boolean>(false);
  const [userMarketIdLabel, setUserMarketIdLabel] = useState<string>('');

  const pups = useAppSelector(selectPups);
  const loadingPups = useAppSelector(selectPupsLoading);
  const loading = useAppSelector(addShipmentGetLoad);
  const error = useAppSelector(addShipmentGetError);
  const editing = useAppSelector(selectShipmentEditing);

  const valueFields: string[] = [
    'userMarketId',
    'trackerNumber',
    'weight',
    'height',
    'width',
    'length',
    'pupId',
    'status',
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (parseFloat(value) <= 0) {
      return;
    }

    if (isInputValid(state.userMarketId)) {
      setMarketIdValid(false);
      setUserMarketIdLabel('');
    }

    if (valueFields.includes(name)) {
      setState((prevState) => {
        if (name === 'userMarketId') {
          if (!isInputValid(value)) {
            setMarketIdValid(true);
            setUserMarketIdLabel('Некорректный номер');
          } else {
            setMarketIdValid(false);
            setUserMarketIdLabel('');
          }
        }

        return {
          ...prevState,
          [name]: value,
          dimensions: {
            ...prevState.dimensions,
            [name]: value,
          },
        };
      });
    }
  };

  const isFormValid = () => {
    const { userMarketId, trackerNumber, weight, dimensions } = state;

    return (
      userMarketId &&
      trackerNumber &&
      weight &&
      dimensions.height &&
      dimensions.length &&
      dimensions.width
    );
  };

  const onFormHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isInputValid(state.userMarketId)) {
      setMarketIdValid(true);
      setUserMarketIdLabel('Некорректный номер');
      return;
    }

    const readyState: ShipmentMutation = {
      ...state,
      status: state.status ? state.status : 'КНР_ОТПРАВЛЕНО',
    };

    if (isEdit && onSubmit) {
      onSubmit(state);
    } else {
      await dispatch(createShipment(readyState));
    }
    setState(initialState);
  };

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 1, width: '100%' }}>
          {'Введенные данные не верны. Попробуйте снова!'}
        </Alert>
      )}
      {loading && (
        <Alert severity="success" sx={{ mt: 3, mb: 1, width: '100%' }}>
          {'Данные успешно отправлены!'}
        </Alert>
      )}
      <Box component="form" onSubmit={onFormHandle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              name="userMarketId"
              label="Маркет"
              onChange={handleChange}
              value={state.userMarketId}
              autoComplete="new-userMarketId"
              error={marketIdValid}
              helperText={userMarketIdLabel}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">№</InputAdornment>
                ),
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              name="trackerNumber"
              label="Номер трека"
              onChange={handleChange}
              value={state.trackerNumber}
              autoComplete="new-trackerNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">№</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              name="height"
              type="number"
              label="Высота"
              onChange={handleChange}
              value={state.dimensions.height}
              autoComplete="new-height"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              name="length"
              type="number"
              label="Длина"
              onChange={handleChange}
              value={state.dimensions.length}
              autoComplete="new-length"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              name="width"
              type="number"
              label="Ширина"
              onChange={handleChange}
              value={state.dimensions.width}
              autoComplete="new-width"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              name="weight"
              type="number"
              label="Килограмм"
              onChange={handleChange}
              value={state.weight}
              autoComplete="new-weight"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">кг</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              name="status"
              label="Статус"
              type="text"
              value={state.status}
              autoComplete="new-status"
              onChange={handleChange}
            >
              {ShipmentStatus.length > 0 && (
                <MenuItem value="" disabled>
                  Выберите статус заказа
                </MenuItem>
              )}
              {ShipmentStatus.length > 0 &&
                ShipmentStatus.map((shipment) => (
                  <MenuItem key={shipment.id} value={shipment.name}>
                    {shipment.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              disabled={loadingPups}
              select
              name="pupId"
              label="ПВЗ"
              type="text"
              value={state.pupId}
              autoComplete="new-pupId"
              onChange={handleChange}
            >
              {pups.length > 0 && (
                <MenuItem value="" disabled>
                  Выберите ближайший ПВЗ
                </MenuItem>
              )}
              {pups.length > 0 &&
                pups.map((pup) => (
                  <MenuItem key={pup._id} value={pup._id}>
                    {`${pup.name} ${pup.region.name} обл., ${pup.address}, ${pup.settlement}`}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
        {isEdit ? (
          <LoadingButton
            sx={{ mt: 3 }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={editing}
            loading={editing}
          >
            Редактировать
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid() || loading}
          >
            {loading ? <CircularProgress /> : 'Добавить отправку'}
          </Button>
        )}
      </Box>
    </>
  );
};

export default ShipmentsForm;
