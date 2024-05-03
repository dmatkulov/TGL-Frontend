import React from 'react';
import {
  Button,
  TableCell, TableRow,

} from '@mui/material';
import { Staff } from '../../../types/types.User';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';

interface Props {
  user: Staff;
}

const StaffItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const userRole = useAppSelector(selectUser);
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{user.role}</TableCell>
      <TableCell align="left">{user.firstName}</TableCell>
      <TableCell align="left">{user.lastName}</TableCell>
      <TableCell align="left">{user.address}</TableCell>
      <TableCell align="left">{user.phoneNumber}</TableCell>
      {userRole?.role === 'super' ? (
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => navigate('/admin-profile/edit-staff/' + user._id)}
            size="small"
          >
            Изменить
          </Button>
        </TableCell>
        ) : (
          <></>
        )}
    </TableRow>
  );
};

export default StaffItem;
