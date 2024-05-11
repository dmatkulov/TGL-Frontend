import {Box, Button, CircularProgress, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';
import { useEffect } from 'react';
import { fetchWarehouseData } from './warehousesThunks';
import { selectUser } from '../users/usersSlice';
import { Slide, toast } from 'react-toastify';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  const handleCopy = async () => {
    if (user?.marketId) {
      const text =
        state[0].name +
        ' ' +
        state[0].phoneNumber +
        ' ' +
        state[0].address +
        user?.marketId;
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Скопировано', {
          autoClose: 500,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          transition: Slide,
        });
      } catch {
        toast.error('Не удалось скопировать', {
          autoClose: 500,
          hideProgressBar: true,
          pauseOnHover: false,
          transition: Slide,
        });
      }
    }
  };

  let content;

  if (state.length < 1 || user?.marketId) {
    content = (
      <Typography>
        В настоящее время нет доступных складов в Китае. Проверьте позже
      </Typography>
    );
  }
  if (state.length > 1) {
    content = (
      <Typography>
        Есть несколько складов. Нужно добавить селект для выбора одного.
      </Typography>
    );
  }
  if (state.length === 1) {
    content = (
      <>
        <Typography>收货人：{state[0].name}</Typography>
        <Typography>电话：{state[0].phoneNumber}</Typography>
        <Typography sx={{ mb: 3 }}>
          {state[0].address + user?.marketId}
        </Typography>
        <Button variant="contained" onClick={handleCopy}>
          Скопировать
        </Button>
      </>
    );
  }
  return <Box>{isLoading ? <CircularProgress /> : content}</Box>;
};

export default Warehouses;
