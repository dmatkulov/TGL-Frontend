import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Client } from '../../../types/types.User';

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
}) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">{firstName}</TableCell>
      <TableCell align="left">{lastName}</TableCell>
      <TableCell align="left">{middleName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{region.name}</TableCell>
      <TableCell align="left">{settlement}</TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{pupID.name}</TableCell>
    </TableRow>
  );
};

export default ClientsItem;
