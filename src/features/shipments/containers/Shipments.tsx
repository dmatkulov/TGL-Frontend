import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments } from '../shipmentsSlice';
import { fetchShipments } from '../shipmentsThunk';
import ShipmentsCard from '../components/ShipmentsCard';

const Shipments = () => {
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectShipments);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  return (
    <>
      {shipments.map((shipment) => (
        <ShipmentsCard key={shipment._id} shipment={shipment} />
      ))}
    </>
  );
};

export default Shipments;
