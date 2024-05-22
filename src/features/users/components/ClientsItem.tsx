import React, { FC, useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { Client } from '../../../types/types.User';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { isClientDeleting } from '../usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Confirm from '../../../components/UI/Confirm/Confirm';
const ClientsItem: FC<Client> = ({
  address,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  region,
  settlement,
  pupID,
  email,
  marketId,
}) => {
  const isDeleting = useAppSelector(isClientDeleting);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const deleteHandle = () => {
    setTrigger(true);
  };
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">{marketId}</TableCell>
      <TableCell align="left">{firstName}</TableCell>
      <TableCell align="left">{lastName}</TableCell>
      <TableCell align="left">{middleName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{region.name}</TableCell>
      <TableCell align="left">{settlement}</TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{pupID.name}</TableCell>
      <TableCell align="left">
        <Confirm trigger={trigger} />
        <Button
          onClick={deleteHandle}
          startIcon={<DeleteIcon color="warning" />}
        />
      </TableCell>
    </TableRow>
  );
};

export default ClientsItem;
