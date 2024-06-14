import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';
import { useEffect } from 'react';
import { fetchWarehouseData } from './warehousesThunks';
import { selectUser } from '../users/usersSlice';
import { Slide, toast } from 'react-toastify';
import {Warehouse} from '../../types/types.Warehouses';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  const handleCopy = async (warehouse: Warehouse) => {
    if (user?.marketId) {
      const text =
        warehouse.name +
        ' ' +
        warehouse.phoneNumber +
        ' ' +
        warehouse.address +
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
  content = (
    <>
      {state.map((elem) => (
        <Typography key={elem._id} sx={{
          mt: 2,
          pb: 2,
          mb: 1,
          '--Grid-borderWidth': '1px',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        }}>
          <Typography>收货人：{elem.name}</Typography>
          <Typography>电话：{elem.phoneNumber}</Typography>
          <Typography sx={{mb: 3}}>
            {elem.address + user?.marketId}
          </Typography>
          <Button variant="contained" onClick={() => handleCopy(elem)}>
            Скопировать
          </Button>
        </Typography>
      ))}
    </>
  );

  return <Box>{isLoading ? <CircularProgress /> : content}</Box>;
};

export default Warehouses;
