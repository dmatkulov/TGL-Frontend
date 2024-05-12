import { Box, Button, Typography } from '@mui/material';
import { Warehouse } from '../../../../types/types.Warehouses';
import { FC } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../usersSlice';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '../../../../utils/constants';

const WarehousesListItem: FC<Warehouse> = ({
  _id,
  address,
  name,
  phoneNumber,
}) => {
  const user = useAppSelector(selectUser);
  const isSuper = user?.role === 'super';
  return (
    <Box borderBottom="1px solid grey" py={2}>
      <Box mb={2}>
        <Typography>
          <b>Address:</b> {address}
        </Typography>
        <Typography>
          <b>Name:</b> {name}
        </Typography>
        <Typography>
          <b>Phone Number:</b> {phoneNumber}
        </Typography>
      </Box>
      <Button
        component={NavLink}
        to={appRoutes.adminWarehousesEdit.replace(':id', _id)}
        variant="contained"
        disabled={!isSuper}
      >
        Изменить
      </Button>
    </Box>
  );
};

export default WarehousesListItem;
