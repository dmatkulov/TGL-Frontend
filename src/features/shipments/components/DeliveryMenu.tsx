import React, { useState } from 'react';
import { ShipmentData } from '../../../types/types.Shipments';
import { Button, Menu, MenuItem, Stack } from '@mui/material';

interface Props {
  shipment: ShipmentData;
}

const DeliveryMenu: React.FC<Props> = ({ shipment }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <Stack direction="row" alignItems="center">
        <Button variant="contained" onClick={handleClick}>
          Доставка
        </Button>
      </Stack>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem key="adress">
          {`Адрес: ${shipment.delivery.address}`}
        </MenuItem>
        <MenuItem key="phoneNumber">
          {`Номер телефона: +${shipment.delivery.phoneNumber}`}
        </MenuItem>
        <MenuItem key="date">{`Дата: ${shipment.delivery.date}`}</MenuItem>
      </Menu>
    </>
  );
};

export default DeliveryMenu;
