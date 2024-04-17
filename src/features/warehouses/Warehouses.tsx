import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isWarehousesLoading, warehousesState } from './warehousesSlice';

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);

  return <Box>Code gonna be here</Box>;
};

export default Warehouses;
