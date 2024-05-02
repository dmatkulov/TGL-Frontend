import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments, selectShipmentsLoading } from '../shipmentsSlice';
import { fetchShipments } from '../shipmentsThunk';
import ShipmentsCard from '../components/ShipmentsCard';
import { Box, CircularProgress } from '@mui/material';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};

const Shipments = () => {
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectShipments);
  const loading = useAppSelector(selectShipmentsLoading);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  return (
    <>
      {loading ?
        <Box sx={styleBoxSpinner}>
          <CircularProgress size={100} />
        </Box>
        : shipments.map((shipment) => (
        <ShipmentsCard key={shipment._id} shipment={shipment} />
      ))}
    </>
  );
};

export default Shipments;
