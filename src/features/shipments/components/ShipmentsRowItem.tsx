import React, { useEffect, useState } from 'react';
import {
  ShipmentData, ShipmentMutation,
  ShipmentStatusData,
} from '../../../types/types.Shipments';
import {appRoutes, Statuses} from '../../../utils/constants';
import {
  Button,
  Checkbox,
  Collapse, Dialog, DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addShipmentGetLoad, selectShipmentDeleting} from '../shipmentsSlice';
import {deleteShipment, editShipment, fetchShipments} from '../shipmentsThunk';
import {useNavigate} from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import {LoadingButton} from '@mui/lab';
import WarningShipmentModal from './WarningShipmentModal';
import ShipmentsForm from '../containers/ShipmentsForm';

interface Props {
  shipment: ShipmentData;
  createItem: (_id: string, status: string, isPaid: boolean) => void;
  removeItem: (_id: string) => void;
  changeHandler: (_id: string, status: string, isPaid: boolean) => void;
}

const initialState: ShipmentStatusData = {
  _id: '',
  status: '',
  isPaid: false,
};

const ShipmentsRowItem: React.FC<Props> = ({
  shipment,
  createItem,
  removeItem,
  changeHandler,
}) => {
  const [localState, setLocalState] =
    useState<ShipmentStatusData>(initialState);
  const [checked, setChecked] = useState(false);
  const [paidToggle, setPaidToggle] = useState(false);
  const [statusToggle, setStatusToggle] = useState(false);
  const loading = useAppSelector(addShipmentGetLoad);
  const statuses = Statuses;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDelete = useAppSelector(selectShipmentDeleting);

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalState((prevState) => {
      return { ...prevState, [name]: value };
    });
    setStatusToggle(true);
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      removeItem(shipment._id);
      return;
    }
    createItem(shipment._id, shipment.status, shipment.isPaid);
  };

  const paidStatusChangeHandler = () => {
    if (checked) {
      setLocalState((prevState) => {
        return { ...prevState, isPaid: !prevState.isPaid };
      });
      setPaidToggle(true);
    }
  };

  useEffect(() => {
    setLocalState((prevState) => ({
      ...prevState,
      _id: shipment._id,
      status: shipment.status,
      isPaid: shipment.isPaid,
    }));
  }, [shipment._id, shipment.isPaid, shipment.status]);

  useEffect(() => {
    if (checked && paidToggle) {
      changeHandler(localState._id, localState.status, localState.isPaid);
      setPaidToggle(false);
    }
  }, [
    changeHandler,
    checked,
    localState._id,
    localState.isPaid,
    localState.status,
    paidToggle,
  ]);

  useEffect(() => {
    if (statusToggle && checked) {
      changeHandler(localState._id, localState.status, localState.isPaid);
      setStatusToggle(false);
    }
  }, [
    changeHandler,
    checked,
    localState._id,
    localState.isPaid,
    localState.status,
    statusToggle,
  ]);

  const openWarningModalWindow = () => {
    setModalOpen(true);
  };

  const closeWarningModalWindow = () => {
    setModalOpen(false);
  };
  const deleteHandler = async () => {
    await dispatch(deleteShipment(shipment?._id));
    await dispatch(fetchShipments());
    navigate(appRoutes.shipments);
  };

  const toggleOpen = () => {
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setOpenEditModal(false);
  };

  const submitFormHandler = async (state: ShipmentMutation) => {
    await dispatch(
      editShipment({ shipmentId: shipment._id, shipmentMutation: state }),
    ).unwrap();
    await dispatch(fetchShipments());
    setModalOpen(false);
  };

  const shipmentMutation: ShipmentMutation = {
    userMarketId: shipment.userMarketId.toString(),
    trackerNumber: shipment.trackerNumber.toString(),
    weight: shipment.weight.toString(),
    pupId: shipment.pupId._id,
    status: shipment.status,
    dimensions: {
      height: shipment.dimensions.height.toString(),
      width: shipment.dimensions.width.toString(),
      length: shipment.dimensions.length.toString(),
    },
  };

  return (
    <>
      <WarningShipmentModal
        stateModal={modalOpen}
        deleteHandler={deleteHandler}
        closeModal={closeWarningModalWindow}
      />
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {shipment.trackerNumber}
        </TableCell>
        <TableCell>{shipment.userMarketId}</TableCell>
        <TableCell>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
          >
            <Checkbox checked={checked} onChange={onCheck} />
            <TextField
              select
              disabled={loading || !checked}
              size="small"
              variant="standard"
              required
              name="status"
              id="status"
              InputProps={{
                disableUnderline: true,
              }}
              style={{ flexGrow: 1, marginRight: 2 }}
              value={localState.status}
              onChange={inputChangeHandler}
            >
              {statuses.map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                  style={{ fontSize: '14px' }}
                >
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </TableCell>
        <TableCell>
          <Button
            onClick={paidStatusChangeHandler}
            variant="contained"
            color={localState.isPaid ? 'success' : 'error'}
          >
            {localState.isPaid ? 'Оплачено' : 'Не оплачено'}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            onClick={toggleOpen}
            sx={{
              fontSize: '11px',
            }}
          >
            Редактировать
          </Button>
        </TableCell>
        <TableCell>
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
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Информация
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Время
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Габариты
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Цена (сом)
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Создал
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ verticalAlign: 'top' }}
                    >
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        {dayjs(shipment.datetime).format('DD.MM.YYYY HH:mm')}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        Высота: {shipment.dimensions.height} см
                        <br />
                        Ширина: {shipment.dimensions.width} см
                        <br />
                        Длина: {shipment.dimensions.length} см
                        <br />
                        Вес: {shipment.weight} кг
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        USD: {shipment.price.usd} $<br />
                        SOM: {shipment.price.som} сом
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        {shipment.userId.firstName} {shipment.userId.lastName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={openEditModal} onClose={handleClose} maxWidth="lg">
        <DialogContent
          sx={{
            mt: '20px',
          }}
        >
          <ShipmentsForm
            onSubmit={submitFormHandler}
            initialShipmentState={shipmentMutation}
            isEdit
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShipmentsRowItem;
