import React, { FC, useState } from 'react';
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Client } from '../../../types/types.User';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, fetchClients } from '../usersThunks';
import { selectUser } from '../usersSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ClientsItem: FC<Client> = ({
  _id,
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const [open, setOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = async () => {
    await dispatch(deleteUser(_id));
    setOpen(false);
    dispatch(fetchClients());
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsCollapse(!isCollapse)}
          >
            {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{marketId}</TableCell>
        <TableCell align="left">{firstName}</TableCell>
        <TableCell align="left">{lastName}</TableCell>
        <TableCell align="left">{middleName}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Подтвердите удаление
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Вы уверены, что хотите удалить пользователя {firstName}{' '}
                {lastName}? Все заказы клиента будут удалены.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                Нет
              </Button>
              <LoadingButton
                variant="contained"
                color="error"
                onClick={handleAgree}
                autoFocus
              >
                Да
              </LoadingButton>
            </DialogActions>
          </Dialog>
          {user && (user.role === 'super' || user.role === 'admin') && (
            <Button
              onClick={handleClickOpen}
              disabled={isAdmin}
              color="warning"
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={12}
        >
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <Table
              size="small"
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '14px',
                margin: '10px 0',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '40px' }} />
                  <TableCell style={{ fontWeight: 'bolder' }}>Адрес</TableCell>
                  <TableCell style={{ fontWeight: 'bolder' }}>ПВЗ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      width: '40px',
                      borderBottom: 'none',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  />
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      borderBottom: 'none',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  >
                    {region.name} обл., г. {settlement}, ул. {address}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: 'none',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  >
                    {`${pupID.name} ${pupID.region.name} обл., ${pupID.address}, ${pupID.settlement}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ClientsItem;
