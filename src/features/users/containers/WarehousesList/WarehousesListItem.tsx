import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../usersSlice';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '../../../../utils/constants';

interface Props {
  deleteWarehouse: (_id: string) => void;
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

const WarehousesListItem: FC<Props> = ({
  deleteWarehouse,
  _id,
  name,
  address,
  phoneNumber,
}) => {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteWarehouse(_id);
    setOpen(false);
  };

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
      {user && user?.role === 'super' && (
        <>
          <Button
            component={NavLink}
            to={appRoutes.adminWarehousesEdit.replace(':id', _id)}
            variant="contained"
          >
            Изменить
          </Button>

          <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleClickOpen}
          >
            Удалить
          </Button>
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот склад? Это действие нельзя будет
            отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WarehousesListItem;
