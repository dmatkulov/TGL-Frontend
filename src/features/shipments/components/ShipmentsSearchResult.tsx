import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import ShipmentsTableHead from './ShipmentsTableHead';
import ShipmentsRowItem from './ShipmentsRowItem';
import { ShipmentData } from '../../../types/types.Shipments';

interface Props {
  order: ShipmentData;
  onSubmit: (state: ShipmentData) => void;
}
const ShipmentsSearchResult: React.FC<Props> = ({ order, onSubmit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <ShipmentsTableHead />
        </TableHead>
        <TableBody>
          <ShipmentsRowItem
            onSubmit={onSubmit}
            key={order._id}
            shipment={order}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentsSearchResult;
