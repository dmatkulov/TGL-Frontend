import { Box, Typography } from '@mui/material';
import { Warehouse } from '../../../../types/types.Warehouses';
import { FC } from 'react';

const WarehousesListItem: FC<Warehouse> = ({ address, name, phoneNumber }) => {
  return (
    <Box>
      <Typography>{address}</Typography>
      <Typography>{name}</Typography>
      <Typography>{phoneNumber}</Typography>;
    </Box>
  );
};

export default WarehousesListItem;
