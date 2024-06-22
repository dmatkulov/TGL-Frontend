import React, {useState} from 'react';
import {ShipmentData, ShipmentMutation} from '../../../types/types.Shipments';
import {appRoutes} from '../../../utils/constants';
import {Button, Checkbox, Chip, Dialog, DialogContent, IconButton, TableCell, TableRow,} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectShipmentDeleting} from '../shipmentsSlice';
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
  isItemSelected?: boolean;
  handleClick: (id: string) => void
}

const ShipmentsRowItem: React.FC<Props> = ({
  shipment,
  createItem,
  removeItem,
  isItemSelected = false,
  handleClick,
}) => {
  
  // const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDelete = useAppSelector(selectShipmentDeleting);
  
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  
  const onCheck = () => {
    handleClick(shipment._id)
    if (isItemSelected) {
      removeItem(shipment._id);
      return;
    }
    createItem(shipment._id, shipment.status, shipment.isPaid);
  };
  
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
      editShipment({shipmentId: shipment._id, shipmentMutation: state}),
    ).unwrap();
    await dispatch(fetchShipments());
    setModalOpen(false);
  };
  
  const shipmentMutation: ShipmentMutation = {
    userMarketId: shipment.userMarketId.toString(),
    trackerNumber: shipment.trackerNumber.toString(),
    weight: shipment.weight.toString(),
    pupId: shipment?.pupId?._id,
    status: shipment.status,
    dimensions: {
      height: shipment.dimensions.height.toString(),
      width: shipment.dimensions.width.toString(),
      length: shipment.dimensions.length.toString(),
    },
  };
  
  const statusColor = {
    bgColor: '#e8f5e9',
    color: '#1b5e20'
  };
  
  if (shipment.status === 'КНР_ПРИБЫЛО' || shipment.status === 'КНР_ОТПРАВЛЕНО') {
    statusColor.bgColor = '#ede7f6';
    statusColor.color = '#311b92';
  } else if (shipment.status === 'ЗАВЕРШЕН') {
    statusColor.bgColor = '#eceff1';
    statusColor.color = '#607d8b';
  } else if (shipment.status === 'ОТКАЗ') {
    statusColor.bgColor = '#fbe9e7';
    statusColor.color = '#bf360c';
  }
  
  return (
    <>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}} role="checkbox" selected={isItemSelected}
                aria-checked={isItemSelected}
                tabIndex={-1}
                onClick={onCheck}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected}/>
        </TableCell>
        <TableCell component="th" scope="row">
          {shipment.trackerNumber}
        </TableCell>
        <TableCell>{shipment.userMarketId}</TableCell>
        <TableCell>
          <Chip
            size="small"
            label={shipment.status}
            style={{backgroundColor: statusColor.bgColor, color: statusColor.color}}
          />
        </TableCell>
        <TableCell>
          <Chip size="small" label={shipment.isPaid ? 'Оплачено' : 'Не оплачено'}
                color={shipment.isPaid ? 'success' : 'warning'} variant="outlined"/>
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
            <CancelIcon/>
          </LoadingButton>
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
      <WarningShipmentModal
        stateModal={modalOpen}
        deleteHandler={deleteHandler}
        closeModal={closeWarningModalWindow}
      />
    </>
  );
};

export default ShipmentsRowItem;