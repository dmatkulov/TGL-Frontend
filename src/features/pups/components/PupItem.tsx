import { Pup, PupMutation } from '../../../types/types.Pup';
import {
  Button,
  Dialog,
  DialogContent,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { deletePup, editPup, fetchPups } from '../pupsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import PupForm from './PupForm';
import { selectUser } from '../../users/usersSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';
import { isDeletePup } from '../pupsSlice';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';
import WarningPupModal from './WarningPupModal';

interface Props {
  pupItem: Pup;
}

const PupItem: React.FC<Props> = ({ pupItem }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isDelete = useAppSelector(isDeletePup);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = async (state: PupMutation) => {
    await dispatch(
      editPup({ pupId: pupItem._id, pupMutation: state }),
    ).unwrap();
    await dispatch(fetchPups());
    setOpen(false);
  };

  const openWarningModalWindow = () => {
    setModalOpen(true);
  };

  const closeWarningModalWindow = () => {
    setModalOpen(false);
  };

  const deleteHandler = async () => {
    await dispatch(deletePup(pupItem?._id));
    await dispatch(fetchPups());
    navigate(appRoutes.pups);
  };

  const pupMutation: PupMutation = {
    region: pupItem.region._id,
    settlement: pupItem.settlement,
    address: pupItem.address,
    phoneNumber: pupItem.phoneNumber.toString(),
  };

  return (
    <>
      <WarningPupModal
        stateModal={modalOpen}
        deleteHandler={deleteHandler}
        closeModal={closeWarningModalWindow}
      />
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left">{pupItem.name}</TableCell>
        <TableCell align="left">{pupItem.address}</TableCell>
        <TableCell align="left">+{pupItem.phoneNumber}</TableCell>
        {user?.role === 'super' ? (
          <TableCell align="left">
            <Button
              variant="contained"
              onClick={toggleOpen}
              sx={{
                fontSize: '11px',
              }}
            >
              Редактировать
            </Button>
            <LoadingButton
              disabled={isDelete}
              loading={isDelete}
              onClick={openWarningModalWindow}
              sx={{
                minWidth: '29px',
                padding: '3px',
                borderRadius: '50%',
              }}
              color="error"
            >
              <CancelIcon />
            </LoadingButton>
          </TableCell>
        ) : (
          <></>
        )}
      </TableRow>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          <PupForm
            onSubmit={submitFormHandler}
            initialPupState={pupMutation}
            isEdit
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PupItem;
