import React, { useState } from 'react';
import { ShipmentData, ShipmentMutation } from '../../../types/types.Shipments';
import { appRoutes } from '../../../utils/constants';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipmentDeleting } from '../shipmentsSlice';
import {
  deleteShipment,
  editShipment,
  fetchShipments,
} from '../shipmentsThunk';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';
import WarningShipmentModal from './WarningShipmentModal';
import ShipmentsForm from '../containers/ShipmentsForm';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  shipment: ShipmentData;
  createItem: (_id: string, status: string, isPaid: boolean) => void;
  removeItem: (_id: string) => void;
  isItemSelected?: boolean;
  handleClick: (id: string) => void;
  changeHandler: (_id: string, status: string, isPaid: boolean) => void;
}

const ShipmentsRowItem: React.FC<Props> = ({
  shipment,
  createItem,
  removeItem,
  isItemSelected = false,
  handleClick,
  changeHandler,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDelete = useAppSelector(selectShipmentDeleting);

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const isLarge = useMediaQuery('(min-width:860px)');
  const isMobile = useMediaQuery('(min-width:375px)');
  const isExtraLarge = useMediaQuery('(min-width:1024px)');

  const onCheck = () => {
    handleClick(shipment._id);
    if (isItemSelected) {
      removeItem(shipment._id);
      return;
    }
    createItem(shipment._id, shipment.status, shipment.isPaid);
    if (checked && isItemSelected) {
      changeHandler(shipment._id, shipment.status, shipment.isPaid);
    }
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
      editShipment({ shipmentId: shipment._id, shipmentMutation: state }),
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
      height: shipment.dimensions.height?.toString(),
      width: shipment.dimensions.width?.toString(),
      length: shipment.dimensions.length?.toString(),
    },
  };

  const statusColor = {
    bgColor: '#e8f5e9',
    color: '#1b5e20',
  };

  if (
    shipment.status === 'КНР_ПРИБЫЛО' ||
    shipment.status === 'КНР_ОТПРАВЛЕНО'
  ) {
    statusColor.bgColor = '#ede7f6';
    statusColor.color = '#311b92';
  } else if (shipment.status === 'ЗАВЕРШЕН') {
    statusColor.bgColor = '#eceff1';
    statusColor.color = '#607d8b';
  } else if (shipment.status === 'ОТКАЗ') {
    statusColor.bgColor = '#fbe9e7';
    statusColor.color = '#bf360c';
  }

  let tableContent;

  if (!isLarge) {
    tableContent = (
      <>
        <TableRow
          role="checkbox"
          selected={isItemSelected}
          aria-checked={isItemSelected}
          tabIndex={-1}
        >
          <TableCell scope="row">
            <Stack justifyContent="flex-start" alignItems="flex-start" mb={2}>
              <Checkbox
                style={{ padding: 0 }}
                checked={isItemSelected}
                onClick={onCheck}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setChecked(event.target.checked)
                }
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={1}
            >
              <Typography style={{ fontWeight: 'bold', color: 'gray' }}>
                Трек номер
              </Typography>
              <Typography>{shipment.trackerNumber}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={1}
            >
              <Typography style={{ fontWeight: 'bold', color: 'gray' }}>
                Маркет ID
              </Typography>
              <Typography>{shipment.userMarketId}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={1}
            >
              <Typography style={{ fontWeight: 'bold', color: 'gray' }}>
                Статус
              </Typography>
              <Chip
                size="small"
                label={shipment.status}
                style={{
                  backgroundColor: statusColor.bgColor,
                  color: statusColor.color,
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={1}
            >
              <Typography style={{ fontWeight: 'bold', color: 'gray' }}>
                Оплата
              </Typography>
              <Chip
                size="small"
                label={shipment.isPaid ? 'Оплачено' : 'Не оплачено'}
                color={shipment.isPaid ? 'success' : 'warning'}
                variant="outlined"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
              mb={1}
              mt={3}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Box>
                {isMobile ? (
                  <Button
                    variant="contained"
                    onClick={toggleOpen}
                    disabled={isItemSelected}
                    sx={{
                      fontSize: '11px',
                      mr: 2,
                    }}
                  >
                    Редактировать
                  </Button>
                ) : (
                  <IconButton
                    color="primary"
                    onClick={toggleOpen}
                    disabled={isItemSelected}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  disabled={isDelete || isItemSelected}
                  onClick={openWarningModalWindow}
                  color="error"
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            </Stack>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Grid sx={{ margin: 1 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Информация
                </Typography>
                <Table
                  size="small"
                  sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '14px',
                    margin: '10px 0',
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        scope="row"
                        style={{
                          verticalAlign: 'top',
                          borderBottom: 'none',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                        }}
                      >
                        <Grid
                          container
                          justifyContent="space-between"
                          mb={1}
                          spacing={5}
                        >
                          <Grid item xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize="smaller"
                              width="65px"
                            >
                              Время
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body2"
                              fontSize="smaller"
                              style={{ marginLeft: 0 }}
                            >
                              {dayjs(shipment.datetime).format(
                                'DD.MM.YYYY HH:mm',
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justifyContent="space-between"
                          mb={1}
                          spacing={5}
                        >
                          <Grid item xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize="smaller"
                              width="65px"
                            >
                              Габариты
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body2"
                              fontSize="smaller"
                              style={{ marginLeft: 0 }}
                            >
                              Высота: {shipment.dimensions.height} см
                              <br />
                              Ширина: {shipment.dimensions.width} см
                              <br />
                              Длина: {shipment.dimensions.length} см
                              <br />
                              Вес: {shipment.weight} кг
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justifyContent="space-between"
                          mb={1}
                          spacing={5}
                        >
                          <Grid item xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize="smaller"
                              width="65px"
                            >
                              Цена (сом)
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body2"
                              fontSize="smaller"
                              style={{ marginLeft: 0 }}
                            >
                              USD: {shipment.price.usd} $<br />
                              SOM: {shipment.price.som} сом
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justifyContent="space-between"
                          mb={1}
                          spacing={5}
                        >
                          <Grid item xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize="smaller"
                              width="65px"
                            >
                              Создал
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body2"
                              fontSize="smaller"
                              style={{ marginLeft: 0 }}
                            >
                              {shipment.userId.firstName}{' '}
                              {shipment.userId.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  } else {
    tableContent = (
      <>
        <TableRow
          role="checkbox"
          selected={isItemSelected}
          aria-checked={isItemSelected}
          tabIndex={-1}
        >
          <TableCell style={{ paddingRight: 0, paddingLeft: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            style={{ paddingRight: 0, paddingLeft: 0 }}
            padding="checkbox"
          >
            <Checkbox checked={isItemSelected} onClick={onCheck} />
          </TableCell>
          <TableCell style={{ paddingRight: 0 }} component="th" scope="row">
            {shipment.trackerNumber}
          </TableCell>
          <TableCell style={{ paddingRight: 0 }}>
            {shipment.userMarketId}
          </TableCell>
          <TableCell style={{ paddingRight: 0 }}>
            <Chip
              size="small"
              label={shipment.status}
              style={{
                backgroundColor: statusColor.bgColor,
                color: statusColor.color,
                paddingRight: 0,
              }}
            />
          </TableCell>
          <TableCell style={{ paddingRight: 0 }}>
            <Chip
              size="small"
              label={shipment.isPaid ? 'Оплачено' : 'Не оплачено'}
              color={shipment.isPaid ? 'success' : 'warning'}
              variant="outlined"
            />
          </TableCell>
          <TableCell style={{ paddingRight: 0 }}>
            {!isExtraLarge ? (
              <IconButton
                color="primary"
                onClick={toggleOpen}
                disabled={isItemSelected}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                onClick={toggleOpen}
                disabled={isItemSelected}
                size="small"
                sx={{
                  fontSize: '11px',
                }}
              >
                Редактировать
              </Button>
            )}
          </TableCell>
          <TableCell style={{ paddingLeft: 0 }}>
            <LoadingButton
              disabled={isDelete || isItemSelected}
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Grid sx={{ margin: 1 }}>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Информация
                </Typography>
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
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Время
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Габариты
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Цена (сом)
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Создал
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        scope="row"
                        style={{
                          verticalAlign: 'top',
                          borderBottom: 'none',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                        }}
                      >
                        <Typography variant="body2" fontSize="smaller">
                          {dayjs(shipment.datetime).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          verticalAlign: 'top',
                          borderBottom: 'none',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                        }}
                      >
                        <Typography variant="body2" fontSize="smaller">
                          Высота: {shipment.dimensions.height} см
                          <br />
                          Ширина: {shipment.dimensions.width} см
                          <br />
                          Длина: {shipment.dimensions.length} см
                          <br />
                          Вес: {shipment.weight} кг
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          verticalAlign: 'top',
                          borderBottom: 'none',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                        }}
                      >
                        <Typography variant="body2" fontSize="smaller">
                          USD: {shipment.price.usd} $<br />
                          SOM: {shipment.price.som} сом
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          verticalAlign: 'top',
                          borderBottom: 'none',
                          paddingTop: '15px',
                          paddingBottom: '15px',
                        }}
                      >
                        <Typography variant="body2" fontSize="smaller">
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
      </>
    );
  }

  return (
    <>
      {tableContent}
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
