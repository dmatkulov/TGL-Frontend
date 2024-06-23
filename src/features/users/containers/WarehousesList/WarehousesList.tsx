import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  isWarehousesLoading,
  warehousesState,
} from '../../../warehouses/warehousesSlice';
import { useEffect } from 'react';
import {
  deleteWarehouse,
  fetchWarehouseData,
} from '../../../warehouses/warehousesThunks';
import WarehousesListItem from './WarehousesListItem';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { selectUser } from '../../usersSlice';
import { appRoutes } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';

const WarehousesList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(warehousesState);
  const isLoading = useAppSelector(isWarehousesLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const deleteWarehouses = async (_id: string) => {
    await dispatch(deleteWarehouse(_id));
    await dispatch(fetchWarehouseData());
  };

  useEffect(() => {
    dispatch(fetchWarehouseData());
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  }

  if (state.length === 0) {
    content = (
      <>
        {user?.role === 'super' && (
          <Button onClick={() => navigate(appRoutes.adminWarehousesAdd)}>
            Добавить склад в Китае
          </Button>
        )}
        <Typography>В настоящее время складов в Китае нет!</Typography>
      </>
    );
  } else if (!isLoading && state.length > 0) {
    content = (
      <>
        {user?.role === 'super' && (
          <Button
            variant="contained"
            onClick={() => navigate(appRoutes.adminWarehousesAdd)}
          >
            Добавить склад в Китае
          </Button>
        )}
        {state.map((item, index) => (
          <WarehousesListItem
            key={index}
            _id={item._id}
            name={item.name}
            address={item.address}
            phoneNumber={item.phoneNumber}
            deleteWarehouse={() => deleteWarehouses(item._id)}
          />
        ))}
      </>
    );
  }

  return <Box>{content}</Box>;
};

export default WarehousesList;
