import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { deleteUser } from '../usersThunks';

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
  onDelete: () => void;
}

const StaffWarning: FC<Props> = ({ open, onClose, id, onDelete }) => {
  const dispatch = useAppDispatch();

  const staffDelete = async (id: string) => {
    await dispatch(deleteUser(id)).unwrap();
    onDelete();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          Вы уверены, что хотите удалить сотрудника?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => staffDelete(id)} variant="contained" color="success">
            Да
          </Button>
          <Button onClick={onClose} variant="contained" color="error" autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffWarning;
