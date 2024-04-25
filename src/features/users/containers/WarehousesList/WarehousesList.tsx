import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  isWarehousesLoading,
  warehousesState,
} from '../../../warehouses/warehousesSlice';
import { useEffect } from 'react';
import { fetchWarehouseData } from '../../../warehouses/warehousesThunks';
import WarehousesListItem from './WarehousesListItem';
import { Box, CircularProgress, Typography } from '@mui/material';

const WarehousesList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  }

  if (state.length < 1) {
    content = <Typography>В настоящее время складов в Китае нет.</Typography>;
  } else if (!isLoading && state.length > 0) {
    content = state.map((item, index) => (
      <WarehousesListItem
        key={index}
        name={item.name}
        address={item.address}
        phoneNumber={item.phoneNumber}
      />
    ));
  }

  return <Box>{content}</Box>;
};

export default WarehousesList;
