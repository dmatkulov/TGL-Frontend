import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { IStaff, Staff } from '../../../types/types.User';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import EditStaff from '../containers/EditStaff';
import { getStaff } from '../usersThunks';
import StaffWarning from './StaffWarning';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  user: Staff;
  onSubmit: (id: string, data: IStaff) => void;
  onDelete: () => void;
}

const StaffItem: React.FC<Props> = ({ user, onSubmit, onDelete }) => {
  const userRole = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getStaff(user._id)).unwrap();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickWarningOpen = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {user.email}
        </TableCell>
        <TableCell align="left">{user.firstName}</TableCell>
        <TableCell align="left">{user.lastName}</TableCell>
        <TableCell align="left">{user.address}</TableCell>
        <TableCell align="left">{user.phoneNumber}</TableCell>
        {userRole?.role === 'super' ? (
          <TableCell align="left">
            <Button variant="contained" onClick={handleClickOpen} size="small">
              Изменить
            </Button>
            <Button
              onClick={handleClickWarningOpen}
              size="small"
              startIcon={<DeleteIcon />}
              color="warning"
              sx={{ ml: 3 }}
            >
              Удалить
            </Button>
            <StaffWarning
              onClose={handleCloseWarning}
              open={openWarning}
              id={user._id}
              onDelete={onDelete}
            />
          </TableCell>
        ) : (
          <></>
        )}
      </TableRow>
      <EditStaff onClose={handleClose} open={open} onSubmit={onSubmit} />
    </>
  );
};

export default StaffItem;
