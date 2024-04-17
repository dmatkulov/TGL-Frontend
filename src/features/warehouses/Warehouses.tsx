import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';
import { useEffect, useState } from 'react';
import { fetchWarehouseData } from './warehousesThunks';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);

  const [textToCopy, setTextToCopy] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  return <Box>{isLoading ? <CircularProgress /> : 'test'}</Box>;
};

export default Warehouses;
