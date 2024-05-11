import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments, selectShipmentsLoading } from '../shipmentsSlice';
import { fetchShipments } from '../shipmentsThunk';
import ShipmentsCard from '../components/ShipmentsCard';
import { Box, CircularProgress } from '@mui/material';
import { selectUser } from '../../users/usersSlice';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Shipments = () => {
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectShipments);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectShipmentsLoading);
  let filteredShipments = [...shipments];

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  if (user?.role === 'manager' && user.region) {
    filteredShipments = shipments.filter(
      (shipment) => shipment.pupId.region === user.region._id,
    );
  }

  return (
    <>
      {loading ? (
        <Box sx={styleBoxSpinner}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        filteredShipments.map((shipment) => (
          <ShipmentsCard key={shipment._id} shipment={shipment} />
        ))
      )}
    </>
  );
};

export default Shipments;
